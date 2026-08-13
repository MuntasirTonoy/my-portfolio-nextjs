import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Portfolio from '@/models/Portfolio';
import Project from '@/models/Project';
import Skill from '@/models/Skill';
import About from '@/models/About';

export async function GET() {
  try {
    await connectDB();

    const portfolio = await Portfolio.findOne().lean();
    const projects = await Project.find().lean();
    const skills = await Skill.find().lean();
    const about = await About.findOne().lean();

    return NextResponse.json({
      ...(portfolio || {}),
      projects: projects || [],
      skills: skills || [],
      about: about || {}
    });
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    return NextResponse.json({ message: 'Server Error', error: error.message }, { status: 500 });
  }
}
