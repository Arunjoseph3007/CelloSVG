//Good Random Numbers
export const randInt = (a, b, c = "e") => {
  let x = Math.random();
  switch (c) {
    case "u":
      return Math.floor(x * (b - a) + a);
    case "l":
      return Math.floor(x * x * (b - a) + a);
    case "r":
      return Math.floor((1 - x * x) * (b - a) + a);
    case "c":
      return Math.floor(4 * (0.5 - x) * (0.5 - x) * (b - a) + a);
    case "e":
      return Math.floor((1 - 4 * (0.5 - x) * (0.5 - x)) * (b - a) + a);
  }
};

//Returns a random array
export const getRandomArray = (count, median, contrast = 0) => {
  const array = [];
  for (let i = 0; i < count; i++)
    array.push(randInt(median * (1 - contrast), median * (+contrast + 1)));
  return array;
};

//Randon Random Numbers
export const randNum = (a, b) => Math.random() * (b - a) + a;

//Random Color
export const randClr = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

// convert a decimal value to hex
export const d2h = (d) => d.toString(16);

// convert a hex value to decimal
export const h2d = (h) => parseInt(h, 16);

//Blends given colors
export const mixColors = (color_1, color_2, weight) => {
  let color = "#";
  for (let i = 1; i <= 5; i += 2) {
    let v1 = h2d(color_1.substr(i, 2));
    let v2 = h2d(color_2.substr(i, 2));
    let val = d2h(Math.floor(v2 + (v1 - v2) * weight));

    while (val.length < 2) val += "0";
    color += val;
  }
  return color;
};

//Converts degree to radian
export const angleToRadian = (angle) => (Math.PI * angle) / 180;

//Returns Array of Random Points with x, y cordinate and radius (eg, {x: 50, y: 180, r: 40})
export const getPositionsAndRadius = (count, size = 200, contrast = 0.3) => {
  const newCircles = [];
  const sq = (0.025 * size * size) / count;
  for (let y = 0; y < 500; y += sq * 1.3) {
    for (let x = 0; x < 700; x += sq * 1.3) {
      newCircles.push({
        x: randInt(x, x + sq / 2),
        y: randInt(y, y + sq / 2),
        r: randInt(
          (sq / 3) * (1 - contrast),
          (sq / 3) * (1 + parseFloat(contrast))
        ),
      });
    }
  }
  return newCircles;
};

//Return a single wave
export const getWave = (complexity, contrast) => {
  let stepSize = 700 / complexity;
  let posY = randInt(500 - contrast, 500 + parseInt(contrast), "c");
  let posX = stepSize;
  const newPath = `M 710 1410 L -10 1410 L -10 500 Q ${
    posX / 2
  } ${posY} ${posX} 500`;
  while (posX <= 710) {
    posX += randInt(stepSize * 1, stepSize * 1.2, "c");
    posY = randInt(500 - contrast, 500 + parseInt(contrast), "c");
    newPath += `T ${posX} ${posY} `;
  }
  return (newPath += "Z");
};

//Returns path of a polygon of given sides
export const getPolygonPath = (n, r) => {
  const path = `M ${r} 0 `;
  const angle = 360 / n;
  for (let i = 0; i < 360; i += angle)
    path += ` L ${r * Math.cos(angleToRadian(i))} ${
      r * Math.sin(angleToRadian(i))
    } `;
  return path + " Z";
};

export const getArrayOfRandomPoints = (complexity = 10, contrast = 25) => {
  const stepWidth = 700 / complexity;
  const newArray = [];
  newArray.push([-10, 1500]);
  newArray.push([-5, 0]);
  for (let i = -10; i <= 750; ) {
    newArray.push([i, randInt(-contrast, +contrast)]);
    let incrementX = randInt(stepWidth - 5, +stepWidth + 5);
    i += incrementX;
  }
  newArray.push([710, 0]);
  newArray.push([750, 1500]);
  return newArray;
};

export const getBlob = () => {
  const blob = [];
  for (let i = 0; i < 360; ) {
    blob.push([Math.sin(i), Math.cos(i)]);
    const incrementAngle = randInt(10, 20);
    i += incrementAngle;
  }
  return blob;
};
