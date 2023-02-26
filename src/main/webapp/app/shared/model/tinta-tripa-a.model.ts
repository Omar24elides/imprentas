import { ITinta } from 'app/shared/model/tinta.model';
import { ITripaA } from 'app/shared/model/tripa-a.model';

export interface ITintaTripaA {
  id?: number;
  tinta?: ITinta;
  tripaA?: ITripaA;
}

export class TintaTripaA implements ITintaTripaA {
  constructor(public id?: number, public tinta?: ITinta, public tripaA?: ITripaA) {}
}
