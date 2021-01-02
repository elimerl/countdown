export function timestampToDatetimeInputString(timestamp) {
  const date = new Date(timestamp + getTimeZoneOffsetInMs());
  return date.toISOString().slice(0, 16);
}
function getTimeZoneOffsetInMs() {
  return new Date().getTimezoneOffset() * -60 * 1e3;
}
