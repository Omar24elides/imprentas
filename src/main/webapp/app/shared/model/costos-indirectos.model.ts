import { ILibro } from 'app/shared/model/libro.model';
import { IExtras } from 'app/shared/model/extras.model';

export interface ICostosIndirectos {
  id?: number;
  cantidad?: number;
  libro?: ILibro;
  extra?: IExtras;
}

export class CostosIndirectos implements ICostosIndirectos {
  constructor(public id?: number, public cantidad?: number, public libro?: ILibro, public extra?: IExtras) {}
}
