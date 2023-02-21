export interface IMaquina {
  id?: number;
  nombre?: string;
  precio?: number;
}

export class Maquina implements IMaquina {
  constructor(public id?: number, public nombre?: string, public precio?: number) {}
}
