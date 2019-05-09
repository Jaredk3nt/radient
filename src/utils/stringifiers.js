import { ARTBOARD_WIDTH, ARTBOARD_HEIGHT } from "../config/values";

export function parseRGB(str) {
  const [id, colors] = str.split("(");
  if (id !== "rgb" && id !== "rgba") {
    return {};
  }
  const [r, g, b, a] = colors.split(",").map(c => {
    let result = c.trim();
    if (result.includes(")")) return result.slice(0, -1);
    return result;
  });
  return {
    r: r ? parseInt(r) : 0,
    g: g ? parseInt(g) : 0,
    b: b ? parseInt(b) : 0,
    ...(a && { a: parseFloat(a) })
  };
}

export function stringifyRGB(rgb) {
  if (rgb.a) {
    return `rgba(${rgb.r},${rgb.g},${rgb.b},${rgb.a})`;
  }
  return `rgb(${rgb.r},${rgb.g},${rgb.b})`;
}

export function stringifyGradient(g) {
  return `radial-gradient(
    circle at ${(g.location.x / ARTBOARD_WIDTH) * 100}% ${(g.location.y /
    ARTBOARD_HEIGHT) *
    100}%,
    ${g.colors.map(color => `${color.color} ${color.width}%`).join(",")}
  )`;
}

export function generateCSS(gradients, background) {
  return `
  .background-container {
    background-color: ${background};
  }
  
  .gradient {
    background: ${gradients
      .map(stringifyGradient)
      .join(",")};
  }`
}
