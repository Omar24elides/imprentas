export interface ITipoMontaje {
  id?: number;
  nombre?: string;
}

export class TipoMontaje implements ITipoMontaje {
  constructor(public id?: number, public nombre?: string) {}
}
