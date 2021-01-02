export function timestampToDatetimeInputString(timestamp: number) {
  const date = new Date(timestamp + getTimeZoneOffsetInMs());
  // slice(0, 19) includes seconds
  return date.toISOString().slice(0, 16);
}

function getTimeZoneOffsetInMs() {
  return new Date().getTimezoneOffset() * -60 * 1000;
}
