export interface IPlancha {
  id?: number;
  nombre?: string;
  precio?: number;
}

export class Plancha implements IPlancha {
  constructor(public id?: number, public nombre?: string, public precio?: number) {}
}
