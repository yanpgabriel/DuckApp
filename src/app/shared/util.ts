export const accessTokenKey = 'accessToken';
export const refreshTokenKey = 'refreshToken';


export function isNullOrUndefined(value: any): boolean {
  return value === null || value === undefined;
}

export function isStringVaziaNullOrUndefined(value: any): boolean {
  if (typeof value === "string") {
    return value === ''
  }
  return isNullOrUndefined(value);
}
