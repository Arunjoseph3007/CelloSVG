import * as d3 from 'd3'

const line=d3.line()

export const getSmoothPath=(arr)=>line.curve(d3.curveCardinal)(arr)