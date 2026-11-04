import mongoose from "mongoose";
import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";
import Project from "@/models/Project";
import Skill from "@/models/Skill";
import About from "@/models/About";
import { verifyAuth } from "@/lib/auth";
import { revalidatePortfolio } from "@/lib/portfolio";
import { json, fail, handleError } from "@/lib/http";

// Sub-documents of the single Portfolio document that the admin may edit.
const PORTFOLIO_SECTIONS = new Set(["hero", "introduction", "services", "contact"]);

// Fields the client must never be able to set.
const stripMeta = ({ _id, __v, createdAt, updatedAt, ...rest }) => rest;

async function saveAbout(body) {
  return About.findOneAndUpdate({}, stripMeta(body), {
    upsert: true,
    new: true,
    runValidators: true,
    setDefaultsOnInsert: true,
  }).lean();
}

/**
 * Replaces a whole list (projects/skills) without a destructive
 * delete-then-insert: every item is validated first, then upserted by id,
 * and only afterwards are removed items deleted. A failure part-way through
 * never wipes the collection.
 */
async function replaceList(Model, items) {
  if (!Array.isArray(items)) {
    throw Object.assign(new Error("Expected an array of items"), { name: "ValidationError" });
  }

  const docs = await Promise.all(
    items.map(async (item, index) => {
      const { _id, __v, updatedAt, ...fields } = item || {};
      const doc = new Model({
        ...fields,
        order: index,
        _id: mongoose.isValidObjectId(_id) ? _id : new mongoose.Types.ObjectId(),
      });
      await doc.validate(); // throws ValidationError -> 400, before anything is written
      return doc.toObject();
    })
  );

  if (docs.length) {
    await Model.bulkWrite(
      docs.map((doc) => ({
        replaceOne: { filter: { _id: doc._id }, replacement: doc, upsert: true },
      }))
    );
  }
  await Model.deleteMany({ _id: { $nin: docs.map((d) => d._id) } });

  return Model.find().sort({ order: 1 }).lean();
}

async function savePortfolioSection(section, body) {
  const portfolio = (await Portfolio.findOne()) || new Portfolio();
  portfolio.set(section, stripMeta(body || {}));
  await portfolio.save();
  return portfolio.toObject();
}

export async function PUT(req, { params }) {
  try {
    const user = await verifyAuth(req);
    if (!user) return fail("Not authorized", 401);

    const { section } = await params;
    const body = await req.json();
    await connectDB();

    let result;
    if (section === "about") result = await saveAbout(body);
    else if (section === "projects") result = await replaceList(Project, body);
    else if (section === "skills") result = await replaceList(Skill, body);
    else if (PORTFOLIO_SECTIONS.has(section)) result = await savePortfolioSection(section, body);
    else return fail(`Unknown section "${section}"`, 404);

    revalidatePortfolio();
    return json(result);
  } catch (error) {
    return handleError("Update section error", error);
  }
}
