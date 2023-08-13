export const accessTokenKey = 'accessToken';
export const refreshTokenKey = 'refreshToken';


export function isNullOrUndefined<T>(value: T | null | undefined): value is Exclude<undefined | null, T> {
  return value === null || value === undefined;
}

export function isStringVaziaNullOrUndefined(value: string | null | undefined): value is Exclude<undefined | null, string> {
  if (typeof value === "string") {
    return value === ''
  }
  return isNullOrUndefined(value);
}
