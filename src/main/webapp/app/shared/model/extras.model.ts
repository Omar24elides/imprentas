export interface IExtras {
  id?: number;
  nombre?: string;
  precio?: number;
}

export class Extras implements IExtras {
  constructor(public id?: number, public nombre?: string, public precio?: number) {}
}
