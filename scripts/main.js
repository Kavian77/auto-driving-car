const canvas = document.getElementById("root-canvas");

canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");
const ROAD_LANE_COUNT = 4;
const road = new Road({
  x: canvas.width / 2,
  width: canvas.width,
  laneCount: ROAD_LANE_COUNT,
});
const car = new Car({
  x: road.getLaneCenter(0),
  y: 100,
  width: 30,
  height: 50,
});

animate();

function animate() {
  car.update();

  // This is a hack to clear the canvas.
  canvas.height = window.innerHeight;

  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.8);
  road.draw(ctx);
  car.draw(ctx);
  requestAnimationFrame(animate);
}
