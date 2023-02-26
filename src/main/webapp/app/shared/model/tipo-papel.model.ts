export interface ITipoPapel {
  id?: number;
  nombre?: string;
  precio?: number;
}

export class TipoPapel implements ITipoPapel {
  constructor(public id?: number, public nombre?: string, public precio?: number) {}
}
