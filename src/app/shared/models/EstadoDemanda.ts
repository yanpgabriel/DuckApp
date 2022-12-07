import {Demanda} from './Demanda';

export interface EstadoDemanda {
  id: number;
  desc: string;
  ordem: number;
  dtCriacao: string;
  demandas?: Demanda[];
}
