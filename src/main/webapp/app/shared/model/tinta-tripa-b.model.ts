import { ITinta } from 'app/shared/model/tinta.model';
import { ITripaB } from 'app/shared/model/tripa-b.model';

export interface ITintaTripaB {
  id?: number;
  tinta?: ITinta;
  tripaB?: ITripaB;
}

export class TintaTripaB implements ITintaTripaB {
  constructor(public id?: number, public tinta?: ITinta, public tripaB?: ITripaB) {}
}
