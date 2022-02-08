export const randInt = (a, b) => Math.floor(Math.random() * (b - a) + a);

export const randNum = (a, b) => Math.random() * (b - a) + a;

export const randClr = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

export const mixColors = (color_1, color_2, weight) => {
  const d2h = (d) => d.toString(16); // convert a decimal value to hex
  const h2d = (h) => parseInt(h, 16); // convert a hex value to decimal

  let color = "#";
  for (let i = 1; i <= 5; i += 2) {
    let v1 = h2d(color_1.substr(i, 2)),
      v2 = h2d(color_2.substr(i, 2)),
      val = d2h(Math.floor(v2 + (v1 - v2) * weight));

    while (val.length < 2) val += "0";
    color += val;
  }
  return color;
};
