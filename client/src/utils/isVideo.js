export default function (url) {
  const pattern = /\.\w{3,4}($|\?)/;
  const result = url.match(pattern);
  if (result[0] === ".mp4") return true;
  return false;
}
