import { ILibro } from 'app/shared/model/libro.model';
import { IMaquina } from 'app/shared/model/maquina.model';

export interface IManoObra {
  id?: number;
  turno?: number;
  horas?: number;
  dias?: number;
  mes?: number;
  horasExtra?: number;
  libro?: ILibro;
  maquina?: IMaquina;
}

export class ManoObra implements IManoObra {
  constructor(
    public id?: number,
    public turno?: number,
    public horas?: number,
    public dias?: number,
    public mes?: number,
    public horasExtra?: number,
    public libro?: ILibro,
    public maquina?: IMaquina
  ) {}
}
