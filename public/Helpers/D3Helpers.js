import * as d3 from 'd3'

const line=d3.line()

export const getSmoothPath=(arr)=>line.curve(d3.curveBasisClosed)(arr)

export const getWaveFromPoints = (wave, shape) => {
    switch (shape) {
      case "step":
        return line.curve(d3.curveStep)(wave);
      case "wave":
        return line.curve(d3.curveCardinal)(wave);
      case "line":
        return line(wave);
      default:
        return line(wave);
    }
  };