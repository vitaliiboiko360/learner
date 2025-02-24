
export function toFixed(number, fixed) {
  var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
  return parseFloat(number.toString().match(re)[0]);
}

export function formatDuration(value: number) {
  const minute = Math.floor(value / 60);
  const secondLeft = value - minute * 60;
  return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft} `;
}

export function makeUrlToResource(resource) {
  return `/${resource}`;
}

export function makeUrlToArtwork(artwork) {
  return `/data/${artwork}.png`;
}