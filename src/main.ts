import p5 from "p5";
import angryImg from "../img/angry.png";
import cryImg from "../img/cry.png";
import laughImg from "../img/laugh.png";
import suyaImg from "../img/suya.png";

const sketch = (p: p5) => {
  let canvas;
  let w = window.innerWidth;
  let h = window.innerHeight;

  const images = [
    p.loadImage(angryImg),
    p.loadImage(cryImg),
    p.loadImage(laughImg),
    p.loadImage(suyaImg),
  ];
  let t = 0;

  const drawImage = (i: number) => {
    const imSize = w * 0.3;

    const x = (w * (2 * i + 1)) / 8;

    const amp = h / 2;
    const offsetTime = i * 100;
    const waveY = Math.sin(t * 0.05 + offsetTime) * amp;
    const originY = h + imSize / 2;
    const y = waveY > 0 ? originY : waveY + originY;

    p.push();
    p.translate(x, y);
    p.rotate(Math.sin(t * 0.1) * 0.2);
    p.image(images[i], 0, 0, imSize, imSize);
    p.pop();
  };

  const drawBackground = () => {
    const circleSize = 60;
    const gridSize = 100;

    const gridNum = p.createVector(
      Math.floor(w / gridSize),
      Math.floor(h / gridSize)
    );

    p.background(247, 251, 255);

    const gridOffset = t % gridSize;
    let x, y;
    for (let i = -1; i < gridNum.y + 1; i++) {
      for (let j = -1; j < gridNum.x + 1; j++) {
        if (i % 2) {
          x = j * gridSize + gridOffset;
          y = i * gridSize;
        } else {
          x = j * gridSize + gridSize / 2 + gridOffset;
          y = i * gridSize;
        }
        p.circle(x, y, circleSize);
        p.stroke(0, 0, 0, 0);
        p.fill(227, 240, 255);
      }
    }
  };

  p.setup = () => {
    p.imageMode(p.CENTER);
    canvas = p.createCanvas(w, h);
  };

  p.draw = () => {
    t++;
    drawBackground();
    for (let i = 0; i < images.length; i++) {
      drawImage(i);
    }
  };

  window.onresize = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.size(w, h);
  };
};

new p5(sketch);
