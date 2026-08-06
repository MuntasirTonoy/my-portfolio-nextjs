const fs = require('fs');
const path = require('path');

const renameImages = () => {
  const dir = path.join(__dirname, 'src', 'assets', 'images');
  const mapping = {
    'img1.jpg': 'muntasir-mahmud-web-developer.jpg',
    'img2.jpg': 'muntasir-mahmud-full-stack.jpg',
    'img3.jpg': 'muntasir-mahmud-coding.jpg',
    'img4.jpg': 'muntasir-mahmud-workspace.jpg',
  };

  console.log('Starting image rename operation...');
  let successCount = 0;
  
  for (const [oldName, newName] of Object.entries(mapping)) {
    const oldPath = path.join(dir, oldName);
    const newPath = path.join(dir, newName);
    
    if (fs.existsSync(oldPath)) {
      try {
        fs.renameSync(oldPath, newPath);
        console.log(`✓ Renamed: ${oldName} -> ${newName}`);
        successCount++;
      } catch (err) {
        console.error(`✗ Failed to rename ${oldName}:`, err.message);
      }
    } else {
      console.log(`ℹ Already renamed or missing: ${oldName}`);
    }
  }

  console.log(`Finished! Successfully renamed ${successCount} files.`);
};

renameImages();
