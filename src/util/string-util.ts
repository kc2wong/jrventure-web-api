export const safeParseInt = (value: string): number | undefined => {
  const rtn = parseInt(value);
  return isNaN(rtn) ? undefined : rtn;
};
