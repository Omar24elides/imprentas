export interface IPelicula {
  id?: number;
  nombre?: string;
  precio?: number;
}

export class Pelicula implements IPelicula {
  constructor(public id?: number, public nombre?: string, public precio?: number) {}
}
