const MOUSE_OFFSET = 6;

export function getBoundingSize(e) {
  const { width, height } = e.target.getBoundingClientRect();
  return { width, height };
}

export function getCoordFromClick(e) {
  const rect = e.target.getBoundingClientRect();
  const x = e.clientX - rect.left - MOUSE_OFFSET;
  const y = e.clientY - rect.top - MOUSE_OFFSET;
  return {x, y};
}