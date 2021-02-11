export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : ((r & 0x3) | 0x8);
    return v.toString(16);
  });
}

export const shuffle = (arr) => {
  if (Array.isArray(arr)) {
    return arr.sort((a, b) => Math.random() - Math.random());
  }
  return arr;
}
