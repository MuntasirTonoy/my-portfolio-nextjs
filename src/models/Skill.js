import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema({
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
