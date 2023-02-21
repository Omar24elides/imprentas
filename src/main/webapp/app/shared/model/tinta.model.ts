export interface ITinta {
  id?: number;
  nombre?: string;
  precio?: number;
}

export class Tinta implements ITinta {
  constructor(public id?: number, public nombre?: string, public precio?: number) {}
}
