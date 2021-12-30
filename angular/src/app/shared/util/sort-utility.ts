export function compare(a: number | string | null, b: number | string | null, isAsc: boolean) {
  const directionMultiplier = (isAsc ? 1 : -1);
  if (!a) {
    return -1 * directionMultiplier;
  }
  if (!b) {
    return 1 * directionMultiplier;
  }
  return (a < b ? -1 : 1) * directionMultiplier;
}

export function dateCompare(a: Date | undefined, b: Date | undefined, isAsc: boolean) {
  const directionMultiplier = (isAsc ? 1 : -1);
  if (!a) {
    return -1 * directionMultiplier;
  }
  if (!b) {
    return 1 * directionMultiplier;
  }
  return (Number(a) - Number(b)) * directionMultiplier;
}

export function booleanCompare(a: boolean, b: boolean, isAsc: boolean) {
  return (Number(a) - Number(b)) * (isAsc ? -1 : 1);
}
