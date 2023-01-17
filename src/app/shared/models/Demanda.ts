export interface Demanda {
  id: number | string | null;
  idUser: number;
  idEstado: number;
  titulo: string;
  desc: string;
  estimativa: number;
  dtCriacao: string;
  datasDemanda: any[];
}
