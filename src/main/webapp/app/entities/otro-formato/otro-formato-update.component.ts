import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IOtroFormato, OtroFormato } from 'app/shared/model/otro-formato.model';
import { OtroFormatoService } from './otro-formato.service';
import { IPelicula } from 'app/shared/model/pelicula.model';
import { PeliculaService } from 'app/entities/pelicula/pelicula.service';
import { ITipoMontaje } from 'app/shared/model/tipo-montaje.model';
import { TipoMontajeService } from 'app/entities/tipo-montaje/tipo-montaje.service';
import { IMaquina } from 'app/shared/model/maquina.model';
import { MaquinaService } from 'app/entities/maquina/maquina.service';
import { ITipoPapel } from 'app/shared/model/tipo-papel.model';
import { TipoPapelService } from 'app/entities/tipo-papel/tipo-papel.service';
import { IPlancha } from 'app/shared/model/plancha.model';
import { PlanchaService } from 'app/entities/plancha/plancha.service';

@Component({
  selector: 'jhi-otro-formato-update',
  templateUrl: './otro-formato-update.component.html'
})
export class OtroFormatoUpdateComponent implements OnInit {
  isSaving: boolean;

  peliculas: IPelicula[];

  tipomontajes: ITipoMontaje[];

  maquinas: IMaquina[];

  tipopapels: ITipoPapel[];

  planchas: IPlancha[];

  editForm = this.fb.group({
    id: [],
    ancho: [],
    alto: [],
    colorT: [],
    colorR: [],
    pelicula: [],
    tipoMontaje: [],
    maquina: [],
    tipoPapel: [],
    plancha: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected otroFormatoService: OtroFormatoService,
    protected peliculaService: PeliculaService,
    protected tipoMontajeService: TipoMontajeService,
    protected maquinaService: MaquinaService,
    protected tipoPapelService: TipoPapelService,
    protected planchaService: PlanchaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ otroFormato }) => {
      this.updateForm(otroFormato);
    });
    this.peliculaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPelicula[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPelicula[]>) => response.body)
      )
      .subscribe((res: IPelicula[]) => (this.peliculas = res), (res: HttpErrorResponse) => this.onError(res.message));
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
    this.planchaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPlancha[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPlancha[]>) => response.body)
      )
      .subscribe((res: IPlancha[]) => (this.planchas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(otroFormato: IOtroFormato) {
    this.editForm.patchValue({
      id: otroFormato.id,
      ancho: otroFormato.ancho,
      alto: otroFormato.alto,
      colorT: otroFormato.colorT,
      colorR: otroFormato.colorR,
      pelicula: otroFormato.pelicula,
      tipoMontaje: otroFormato.tipoMontaje,
      maquina: otroFormato.maquina,
      tipoPapel: otroFormato.tipoPapel,
      plancha: otroFormato.plancha
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const otroFormato = this.createFromForm();
    if (otroFormato.id !== undefined) {
      this.subscribeToSaveResponse(this.otroFormatoService.update(otroFormato));
    } else {
      this.subscribeToSaveResponse(this.otroFormatoService.create(otroFormato));
    }
  }

  private createFromForm(): IOtroFormato {
    return {
      ...new OtroFormato(),
      id: this.editForm.get(['id']).value,
      ancho: this.editForm.get(['ancho']).value,
      alto: this.editForm.get(['alto']).value,
      colorT: this.editForm.get(['colorT']).value,
      colorR: this.editForm.get(['colorR']).value,
      pelicula: this.editForm.get(['pelicula']).value,
      tipoMontaje: this.editForm.get(['tipoMontaje']).value,
      maquina: this.editForm.get(['maquina']).value,
      tipoPapel: this.editForm.get(['tipoPapel']).value,
      plancha: this.editForm.get(['plancha']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOtroFormato>>) {
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

  trackTipoMontajeById(index: number, item: ITipoMontaje) {
    return item.id;
  }

  trackMaquinaById(index: number, item: IMaquina) {
    return item.id;
  }

  trackTipoPapelById(index: number, item: ITipoPapel) {
    return item.id;
  }

  trackPlanchaById(index: number, item: IPlancha) {
    return item.id;
  }
}
