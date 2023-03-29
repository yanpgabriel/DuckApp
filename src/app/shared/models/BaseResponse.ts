export interface BaseResponse {
  type: TypeResponse;
  status: number;
  entity: any | any[];
  extras: string[];
  headers: {[key: string]: any};
}

enum TypeResponse {

  SUCCESS, ERROR, SERVER_ERRO

}
