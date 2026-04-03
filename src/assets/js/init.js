// Initialize Phaser from npm package
import('../../node_modules/phaser/dist/phaser.js').then((module) => {
  window.Phaser = module.default || module.Phaser;
  console.log('Phaser loaded from npm package (v' + window.Phaser.VERSION + ')');
}).catch((error) => {
  console.error('Failed to load Phaser:', error);
});
