import p5 from "p5";
import angryImg from "../assets/images/angry.png";
import cryImg from "../assets/images/cry.png";
import laughImg from "../assets/images/laugh.png";
import suyaImg from "../assets/images/suya.png";
import "./styles/fonts.css";

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
  let charas: Chara[] = [...Array(4)].map((_, i) => ({
    out: false,
    image: i,
    clickedTime: -1,
  }));
  let target: number = 0; //imagesの中のどの顔をクリックすると得点が入るか
  let t = 0;

  let score = 0;

  const drawImage = (i: number) => {
    const imSize = w * 0.25;

    const x = (w * (2 * i + 1)) / 8;

    const amp = (h * 3) / 5;
    const offsetTime = i * 100;
    const waveY = Math.sin(t * 0.05 + offsetTime) * amp;

    const originY = h + imSize / 2;
    const y = waveY + originY;

    if (y > originY) {
      charas[i].image = Math.floor(Math.random() * 4);
      charas[i].clickedTime = -1;
      charas[i].out = true;
    } else {
      charas[i].out = false;
    }

    p.push();
    p.translate(x, y);
    p.rotate(Math.sin(t * 0.1) * 0.2);
    if (charas[i].clickedTime != -1) {
      const scaleAnimateSpeed = 30;
      const animatedImSize =
        imSize + (t - charas[i].clickedTime) * scaleAnimateSpeed;

      const alphaAnimateSpeed = 20;
      const alpha = 255 - (t - charas[i].clickedTime) * alphaAnimateSpeed;
      p.tint(255, alpha);
      p.image(images[charas[i].image], 0, 0, animatedImSize, animatedImSize);
    } else {
      p.image(images[charas[i].image], 0, 0, imSize, imSize);
    }
    p.pop();
  };

  const drawBackground = () => {
    p.background(247, 251, 255);

    const circleSize = 60;
    const gridSize = 100;

    const gridNum = p.createVector(
      Math.floor(w / gridSize),
      Math.floor(h / gridSize)
    );

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

  const drawScore = () => {
    p.textSize(100);
    p.textFont("montserrat");
    p.textAlign(p.CENTER);
    p.fill(42, 119, 209);
    p.text(score, w / 2, 100);
  };

  const drawTarget = () => {
    const amp = 10;
    const imSize = 150 + Math.sin(t * 0.025) * amp;
    p.image(images[target], w / 2, 200, imSize, imSize);
  };

  p.mousePressed = () => {
    const clickedCharaIdx = Math.floor((p.mouseX * 4) / w); //左から何番目の顔をクリックしたか
    const clickedTime = charas[clickedCharaIdx].clickedTime;

    // clickedTime === -1...まだクリックされていない時
    if (clickedTime === -1) {
      charas[clickedCharaIdx].clickedTime = t;
    }

    if (
      clickedTime === -1 &&
      !charas[clickedCharaIdx].out &&
      charas[clickedCharaIdx].image == target
    ) {
      score++;
      target = Math.floor(Math.random() * 4);
    } else if (
      clickedTime === -1 &&
      !charas[clickedCharaIdx].out &&
      charas[clickedCharaIdx].image != target
    ) {
      score--;
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
    drawScore();
    drawTarget();
  };

  window.onresize = () => {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.size(w, h);
  };
};

new p5(sketch);
