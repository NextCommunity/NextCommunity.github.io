const { Phaser } = require('jiti');

Phaser.defaultConfig.scene.mapLayer = 1;

const game = new Phaser.Game(
  config);

let player;

function preload() {
  game.load.image('player', 'path/to/script.js');
  game.load.atlas.image('player', 'path/to/script.js', 'path/to/script.png');
}

function create() {
  player = game.add.sprite(0, 0, 'player');
}

function update() {
  game.physics.arcade.collide(player, game.world.bounds);
}

game.physics.enable(player, Phaser.Physics.AUTO);

game.physics.startBody(player, Phaser.Physics.AUTO);

game.physics.arcade.collide(player, game.world.bounds);

player.onInputAreaDown = function () {
  game.input.keyboard.downs = true;
}

player.onInputAreaUp = function () {
  game.input.keyboard.downs = false;
}
