export interface BaseResponse {
  type: TypeResponse;
  status: number;
  entity: any | any[];
  extras: string;
}

enum TypeResponse {

  SUCCESS, ERROR, SERVER_ERRO

}
