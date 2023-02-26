export interface ITipoDocumento {
  id?: number;
  tipo?: string;
}

export class TipoDocumento implements ITipoDocumento {
  constructor(public id?: number, public tipo?: string) {}
}
