debugger;
const canvas = document.getElementById('mousecanvas'); // Replace 'yourCanvasId' with the actual ID of your canvas element
const ctx = canvas.getContext('2d');
const params = { spring: 0.4, pointsNumber: 40, friction: .5, baseWidth: .9 };

setupCanvas();
window.addEventListener("resize", setupCanvas);

function setupCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const pointer = {
    x: 0.5 * window.innerWidth,
    y: 0.5 * window.innerHeight,
};

window.addEventListener("click", e => {
    updateMousePosition(e.clientX, e.clientY);
});

window.addEventListener("mousemove", e => {
    updateMousePosition(e.clientX, e.clientY);
});

window.addEventListener("touchmove", e => {
    updateMousePosition(e.targetTouches[0].clientX, e.targetTouches[0].clientY);
});

function updateMousePosition(eX, eY) {
    pointer.x = eX;
    pointer.y = eY;
}

const p = { x: 0, y: 0 }; // coordinate to draw

const trail = new Array(params.pointsNumber);
for (let i = 0; i < params.pointsNumber; i++) {
    trail[i] = {
        x: pointer.x,
        y: pointer.y,
        dx: 0,
        dy: 0,
    };
}

update(0);

function update(t) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  trail.forEach((point, pIdx) => {
      const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
      const spring = pIdx === 0 ? 0.4 * params.spring : params.spring;

      point.dx += (prev.x - point.x) * spring;
      point.dy += (prev.y - point.y) * spring;
      point.dx *= params.friction;
      point.dy *= params.friction;

      point.x += point.dx;
      point.y += point.dy;

      if (pIdx === 0) {
          // start the line on the first point
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
      } else {
          // continue with a new line segment to the following one
          ctx.lineTo(point.x, point.y);
      }
  });

  // set line style
  ctx.lineWidth = 5;
  ctx.strokeStyle = 'rgba(0, 0, 0, 1)';

  // draw the lines
  ctx.stroke();

  window.requestAnimationFrame(update);
}
