import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  hero: {
    greeting: String,
    name: String,
    badge: String,
    description: String,
    cvLink: String,
    whatsappLink: String,
    ctaBtn1Text: String,
    ctaBtn2Text: String,
    roleTags: [String],
  },
  introduction: {
    heading: String,
    description: String,
  },
  services: {
    sectionTitle: String,
    heading: String,
    description: String,
    items: [{
      title: String,
      description: String,
    }]
  },
  contact: {
    heading: String,
    subheading: String,
    description: String,
    email: String,
    phone: String,
    location: String,
    socialLinks: {
      github: String,
      linkedin: String,
    },
  }
}, {
  timestamps: true,
});

export default mongoose.models.Portfolio || mongoose.model('Portfolio', portfolioSchema);
