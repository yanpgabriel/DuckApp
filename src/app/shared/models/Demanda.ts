export interface Demanda {
  id: number;
  idUser: number;
  idEstado: number;
  titulo: string;
  desc: string;
  estimativa: number;
  dtCriacao: string;
  datasDemanda: any[];
}
