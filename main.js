const canvas = document.getElementById("root-canvas");
canvas.height = window.innerHeight;
canvas.width = 200;

const ctx = canvas.getContext("2d");
const car = new Car({
    x: 100,
    y: 100,
    width: 30,
    height: 50,
});
car.draw(ctx);