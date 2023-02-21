import { IPelicula } from 'app/shared/model/pelicula.model';
import { IPlancha } from 'app/shared/model/plancha.model';
import { ITipoMontaje } from 'app/shared/model/tipo-montaje.model';
import { IMaquina } from 'app/shared/model/maquina.model';
import { ITipoPapel } from 'app/shared/model/tipo-papel.model';

export interface IPortada {
  id?: number;
  ancho?: number;
  alto?: number;
  colorT?: number;
  colorR?: number;
  lomo?: number;
  solapa?: number;
  pelicula?: IPelicula;
  plancha?: IPlancha;
  tipoMontaje?: ITipoMontaje;
  maquina?: IMaquina;
  tipoPapel?: ITipoPapel;
}

export class Portada implements IPortada {
  constructor(
    public id?: number,
    public ancho?: number,
    public alto?: number,
    public colorT?: number,
    public colorR?: number,
    public lomo?: number,
    public solapa?: number,
    public pelicula?: IPelicula,
    public plancha?: IPlancha,
    public tipoMontaje?: ITipoMontaje,
    public maquina?: IMaquina,
    public tipoPapel?: ITipoPapel
  ) {}
}
