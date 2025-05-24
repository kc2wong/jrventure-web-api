export function safeParseInt(value: string): number | undefined;
export function safeParseInt(value: number): number;
export function safeParseInt(value: string | number): number | undefined {
  if (typeof value === 'number') {
    return Number.isInteger(value) ? value : undefined;
  }

  const rtn = parseInt(value);
  return isNaN(rtn) ? undefined : rtn;
}
