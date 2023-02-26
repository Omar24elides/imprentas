import { ITipoDocumento } from 'app/shared/model/tipo-documento.model';

export interface ICliente {
  id?: number;
  email?: string;
  dni?: string;
  tipoDocumento?: ITipoDocumento;
}

export class Cliente implements ICliente {
  constructor(public id?: number, public email?: string, public dni?: string, public tipoDocumento?: ITipoDocumento) {}
}
