import { ITinta } from 'app/shared/model/tinta.model';
import { IOtroFormato } from 'app/shared/model/otro-formato.model';

export interface ITintaOtroFormato {
  id?: number;
  tinta?: ITinta;
  otroFormato?: IOtroFormato;
}

export class TintaOtroFormato implements ITintaOtroFormato {
  constructor(public id?: number, public tinta?: ITinta, public otroFormato?: IOtroFormato) {}
}
