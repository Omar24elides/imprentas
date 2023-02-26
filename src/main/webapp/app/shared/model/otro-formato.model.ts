import { IPelicula } from 'app/shared/model/pelicula.model';
import { ITipoMontaje } from 'app/shared/model/tipo-montaje.model';
import { IMaquina } from 'app/shared/model/maquina.model';
import { ITipoPapel } from 'app/shared/model/tipo-papel.model';
import { IPlancha } from 'app/shared/model/plancha.model';

export interface IOtroFormato {
  id?: number;
  ancho?: number;
  alto?: number;
  colorT?: number;
  colorR?: number;
  pelicula?: IPelicula;
  tipoMontaje?: ITipoMontaje;
  maquina?: IMaquina;
  tipoPapel?: ITipoPapel;
  plancha?: IPlancha;
}

export class OtroFormato implements IOtroFormato {
  constructor(
    public id?: number,
    public ancho?: number,
    public alto?: number,
    public colorT?: number,
    public colorR?: number,
    public pelicula?: IPelicula,
    public tipoMontaje?: ITipoMontaje,
    public maquina?: IMaquina,
    public tipoPapel?: ITipoPapel,
    public plancha?: IPlancha
  ) {}
}
