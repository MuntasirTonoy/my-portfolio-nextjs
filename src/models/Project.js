import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  order: { type: Number, default: 0, index: true },
  image: String,
  title: String,
  description: String,
  tech: {
    frontend: [String],
    backend: [String],
    other: [String]
  },
  tags: [String],
  status: String,
  featured: Boolean,
  started: String,
  end: String,
  keyFeature: [String],
  challenges: String,
  improvements: String,
  links: {
    liveDemo: String,
    clientSide: String,
    serverSide: String
  }
}, {
  timestamps: true,
});

export default mongoose.models.Project || mongoose.model('Project', projectSchema);
