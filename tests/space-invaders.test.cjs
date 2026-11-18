const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const game = () => {
  let config = null;
  const rewards = [];
  const scores = [];
  const context = vm.createContext({
    window: { innerWidth: 1000, innerHeight: 800 },
    document: { createElement: () => ({ style: {} }), body: { appendChild() { /* Unused renderer hook in this scene test double. */ } } },
    Phaser: { CANVAS: 1 }, XP_SPACE_INVADERS_WIN: 100,
    GameManager: {
      loadPhaser: fn => fn(), create: (_, c) => { config = c; },
      awardXP: xp => rewards.push(xp), incrementStat: () => 1,
      grantAchievement() { /* Unused renderer hook in this scene test double. */ }, setHighScore: (_, score) => scores.push(score), destroy() { /* Unused renderer hook in this scene test double. */ },
    },
  });
  vm.runInContext(`${fs.readFileSync('src/assets/js/games/space-invaders.js', 'utf8')}\nSpaceInvaders.launch();`, context);
  const handlers = {};
  const group = () => ({ children: [], add(x) { this.children.push(x); }, getChildren() { return this.children.filter(x => x.active); }, countActive() { return this.getChildren().length; } });
  const scene = {
    scale: { width: 1000, height: 800 },
    add: { text(x,y,text) { return { x,y,text,width:24,active:true, setOrigin() { return this; },setText(t) { this.text=t; },getBounds() { return {top:this.y,bottom:this.y+24}; },destroy() { this.active=false; } }; } },
    physics: { pause() { scene.paused=true; }, add: {
      existing(x) { x.body={setCollideWorldBounds(){ /* Unused physics hook in this scene test double. */ },setAllowGravity(){ /* Unused physics hook in this scene test double. */ },setSize(){ /* Unused physics hook in this scene test double. */ },setVelocityX(v){this.vx=v;},setVelocityY(){ /* Unused physics hook in this scene test double. */ }}; },
      group, overlap(a,b,fn) { scene.hit=fn; },
    } },
    time: { now:1000,addEvent(c) { scene.move=c.callback; return {remove() { scene.timerRemoved=true; }}; } },
    input: { once() { /* Unused renderer hook in this scene test double. */ },keyboard: {createCursorKeys:()=>({left:{},right:{},space:{}}),once(k,fn){handlers[k]=fn;} } },
    scene: { restart() { config.scene.create.call(scene); } },
  };
  config.scene.create.call(scene);
  return { scene, handlers, rewards, scores, update:()=>config.scene.update.call(scene) };
};

test('hits update HUD; duplicate collision cannot score twice',()=>{
  const {scene}=game(); const bullet={active:true,destroy(){this.active=false;}};
  const alien=scene.si_aliens.getChildren()[0];
  scene.hit(bullet,alien); scene.hit(bullet,alien);
  assert.equal(scene.si_score,10);assert.equal(scene.si_scoreText.text,'SCORE 10');
});

test('invasion ends round, freezes input, awards no XP; restart resets round',()=>{
  const {scene,update,handlers,rewards,scores}=game();
  scene.si_aliens.getChildren()[0].y=scene.si_player.y;
  update(); update();
  assert.equal(scene.si_finished,true);assert.equal(scene.timerRemoved,true);
  assert.equal(scene.paused,true);assert.deepEqual(rewards,[]);assert.deepEqual(scores,[0]);
  scene.si_cursors.space.isDown=true; update();assert.equal(scene.si_bullets.countActive(),0);
  handlers['keydown-R']();assert.equal(scene.si_finished,false);assert.equal(scene.si_score,0);
  assert.equal(scene.si_aliens.countActive(),50);
});

test('victory awards once, stores round score, and supports restart',()=>{
  const {scene,rewards,scores,handlers}=game();
  for(const alien of [...scene.si_aliens.getChildren()]) scene.hit({active:true,destroy(){this.active=false;}},alien);
  assert.equal(scene.si_finished,true);assert.equal(scene.si_score,500);
  assert.deepEqual(rewards,[100]);assert.deepEqual(scores,[500]);
  scene.hit({active:true},{active:true});assert.deepEqual(rewards,[100]);
  handlers['keydown-R']();assert.equal(scene.si_scoreText.text,'SCORE 0');
});
