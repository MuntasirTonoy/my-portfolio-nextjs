import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
  order: { type: Number, default: 0, index: true },
  category: {
    type: String,
    required: true
  },
  items: [{
    name: String,
    icon: String,
  }]
}, {
  timestamps: true,
});

export default mongoose.models.Skill || mongoose.model('Skill', skillSchema);
