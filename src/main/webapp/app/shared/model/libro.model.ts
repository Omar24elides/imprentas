import { ITripaA } from 'app/shared/model/tripa-a.model';
import { ITripaB } from 'app/shared/model/tripa-b.model';
import { IPortada } from 'app/shared/model/portada.model';
import { IOtroFormato } from 'app/shared/model/otro-formato.model';
import { ICliente } from 'app/shared/model/cliente.model';

export interface ILibro {
  id?: number;
  cantidad?: number;
  tripaA?: ITripaA;
  tripaB?: ITripaB;
  portada?: IPortada;
  otroFormato?: IOtroFormato;
  cliente?: ICliente;
}

export class Libro implements ILibro {
  constructor(
    public id?: number,
    public cantidad?: number,
    public tripaA?: ITripaA,
    public tripaB?: ITripaB,
    public portada?: IPortada,
    public otroFormato?: IOtroFormato,
    public cliente?: ICliente
  ) {}
}
