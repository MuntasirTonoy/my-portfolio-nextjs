import { v2 as cloudinary } from "cloudinary";
import { verifyAuth } from "@/lib/auth";
import { json, fail, handleError, clientIp } from "@/lib/http";
import { rateLimit, HOUR } from "@/lib/rateLimit";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MB = 1024 * 1024;

// The admin uploads project/profile images; anonymous visitors may only
// upload a small avatar with their review, and are rate limited.
// CLOUDINARY_FOLDER (optional) groups everything under one parent folder.
const BASE = process.env.CLOUDINARY_FOLDER?.trim().replace(/^\/+|\/+$/g, "");
const inBase = (name) => (BASE ? `${BASE}/${name}` : name);

const ADMIN_POLICY = { maxBytes: 5 * MB, folder: inBase("portfolio_projects") };
const PUBLIC_POLICY = { maxBytes: 2 * MB, folder: inBase("review_avatars") };

function uploadBuffer(buffer, folder) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: "image",
          allowed_formats: ["jpg", "jpeg", "png", "webp", "gif"],
        },
        (error, result) => (error ? reject(error) : resolve(result))
      )
      .end(buffer);
  });
}

export async function POST(req) {
  try {
    const isAdmin = Boolean(await verifyAuth(req));
    const policy = isAdmin ? ADMIN_POLICY : PUBLIC_POLICY;

    if (!isAdmin) {
      const limited = rateLimit(`upload:${clientIp(req)}`, { limit: 5, windowMs: HOUR });
      if (!limited.ok) return fail("Too many uploads. Try again later.", 429);
    }

    const file = (await req.formData()).get("image");
    if (!file || typeof file === "string") return fail("No image uploaded");
    if (!ALLOWED_TYPES.has(file.type)) return fail("Only JPG, PNG, WebP or GIF images are allowed");
    if (file.size > policy.maxBytes) {
      return fail(`Image must be smaller than ${policy.maxBytes / MB} MB`, 413);
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await uploadBuffer(buffer, policy.folder);
    return json({ url: result.secure_url });
  } catch (error) {
    return handleError("Cloudinary upload error", error);
  }
}
