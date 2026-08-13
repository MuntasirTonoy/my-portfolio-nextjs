import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Portfolio from '@/models/Portfolio';
import Project from '@/models/Project';
import Skill from '@/models/Skill';
import About from '@/models/About';
import { verifyAuth } from '@/lib/auth';

export async function PUT(req, { params }) {
  try {
    const user = await verifyAuth(req);
    if (!user) {
      return NextResponse.json({ message: 'Not authorized' }, { status: 401 });
    }

    await connectDB();
    const { section } = await params;
    const body = await req.json();

    if (section === 'about') {
      let about = await About.findOne();
      if (about) {
        Object.assign(about, body);
        await about.save();
      } else {
        about = await About.create(body);
      }
      return NextResponse.json(about);
    }

    if (section === 'projects') {
      await Project.deleteMany({});
      const projects = await Project.insertMany(body);
      return NextResponse.json(projects);
    }

    if (section === 'skills') {
      await Skill.deleteMany({});
      const skills = await Skill.insertMany(body);
      return NextResponse.json(skills);
    }

    let portfolio = await Portfolio.findOne();
    if (portfolio) {
      portfolio[section] = body;
      await portfolio.save();
    } else {
      portfolio = await Portfolio.create({ [section]: body });
    }
    return NextResponse.json(portfolio);

  } catch (error) {
    console.error('Update section error:', error);
    return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
  }
}
