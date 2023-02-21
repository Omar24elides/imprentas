export interface IPapel {
  id?: number;
  nombre?: string;
}

export class Papel implements IPapel {
  constructor(public id?: number, public nombre?: string) {}
}
