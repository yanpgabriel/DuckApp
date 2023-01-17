export function isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}

export function isStringVaziaNullOrUndefined(value: any){
  if (typeof value === "string") {
    return value === ''
  }
  return isNullOrUndefined(value);
}
