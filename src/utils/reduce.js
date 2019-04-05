export function updateList(list, index, item) {
  return [...list.slice(0, index), item, ...list.slice(index + 1)];
}

export function removeFromList(list, index) {
  return [...list.slice(0, index), ...list.slice(index + 1)];
}
