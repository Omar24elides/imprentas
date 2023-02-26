import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPortada, Portada } from 'app/shared/model/portada.model';
import { PortadaService } from './portada.service';
import { IPelicula } from 'app/shared/model/pelicula.model';
import { PeliculaService } from 'app/entities/pelicula/pelicula.service';
import { IPlancha } from 'app/shared/model/plancha.model';
import { PlanchaService } from 'app/entities/plancha/plancha.service';
import { ITipoMontaje } from 'app/shared/model/tipo-montaje.model';
import { TipoMontajeService } from 'app/entities/tipo-montaje/tipo-montaje.service';
import { IMaquina } from 'app/shared/model/maquina.model';
import { MaquinaService } from 'app/entities/maquina/maquina.service';
import { ITipoPapel } from 'app/shared/model/tipo-papel.model';
import { TipoPapelService } from 'app/entities/tipo-papel/tipo-papel.service';

@Component({
  selector: 'jhi-portada-update',
  templateUrl: './portada-update.component.html'
})
export class PortadaUpdateComponent implements OnInit {
  isSaving: boolean;

  peliculas: IPelicula[];

  planchas: IPlancha[];

  tipomontajes: ITipoMontaje[];

  maquinas: IMaquina[];

  tipopapels: ITipoPapel[];

  editForm = this.fb.group({
    id: [],
    ancho: [],
    alto: [],
    colorT: [],
    colorR: [],
    lomo: [],
    solapa: [],
    pelicula: [],
    plancha: [],
    tipoMontaje: [],
    maquina: [],
    tipoPapel: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected portadaService: PortadaService,
    protected peliculaService: PeliculaService,
    protected planchaService: PlanchaService,
    protected tipoMontajeService: TipoMontajeService,
    protected maquinaService: MaquinaService,
    protected tipoPapelService: TipoPapelService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ portada }) => {
      this.updateForm(portada);
    });
    this.peliculaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPelicula[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPelicula[]>) => response.body)
      )
      .subscribe((res: IPelicula[]) => (this.peliculas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.planchaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlancha[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlancha[]>) => response.body)
      )
      .subscribe((res: IPlancha[]) => (this.planchas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoMontajeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoMontaje[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoMontaje[]>) => response.body)
      )
      .subscribe((res: ITipoMontaje[]) => (this.tipomontajes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.maquinaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMaquina[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMaquina[]>) => response.body)
      )
      .subscribe((res: IMaquina[]) => (this.maquinas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoPapelService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoPapel[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoPapel[]>) => response.body)
      )
      .subscribe((res: ITipoPapel[]) => (this.tipopapels = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(portada: IPortada) {
    this.editForm.patchValue({
      id: portada.id,
      ancho: portada.ancho,
      alto: portada.alto,
      colorT: portada.colorT,
      colorR: portada.colorR,
      lomo: portada.lomo,
      solapa: portada.solapa,
      pelicula: portada.pelicula,
      plancha: portada.plancha,
      tipoMontaje: portada.tipoMontaje,
      maquina: portada.maquina,
      tipoPapel: portada.tipoPapel
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const portada = this.createFromForm();
    if (portada.id !== undefined) {
      this.subscribeToSaveResponse(this.portadaService.update(portada));
    } else {
      this.subscribeToSaveResponse(this.portadaService.create(portada));
    }
  }

  private createFromForm(): IPortada {
    return {
      ...new Portada(),
      id: this.editForm.get(['id']).value,
      ancho: this.editForm.get(['ancho']).value,
      alto: this.editForm.get(['alto']).value,
      colorT: this.editForm.get(['colorT']).value,
      colorR: this.editForm.get(['colorR']).value,
      lomo: this.editForm.get(['lomo']).value,
      solapa: this.editForm.get(['solapa']).value,
      pelicula: this.editForm.get(['pelicula']).value,
      plancha: this.editForm.get(['plancha']).value,
      tipoMontaje: this.editForm.get(['tipoMontaje']).value,
      maquina: this.editForm.get(['maquina']).value,
      tipoPapel: this.editForm.get(['tipoPapel']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPortada>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackPeliculaById(index: number, item: IPelicula) {
    return item.id;
  }

  trackPlanchaById(index: number, item: IPlancha) {
    return item.id;
  }

  trackTipoMontajeById(index: number, item: ITipoMontaje) {
    return item.id;
  }

  trackMaquinaById(index: number, item: IMaquina) {
    return item.id;
  }

  trackTipoPapelById(index: number, item: ITipoPapel) {
    return item.id;
  }
}
