import { ITinta } from 'app/shared/model/tinta.model';
import { IPortada } from 'app/shared/model/portada.model';

export interface ITintaPortada {
  id?: number;
  tinta?: ITinta;
  portada?: IPortada;
}

export class TintaPortada implements ITintaPortada {
  constructor(public id?: number, public tinta?: ITinta, public portada?: IPortada) {}
}
