import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITripaB, TripaB } from 'app/shared/model/tripa-b.model';
import { TripaBService } from './tripa-b.service';
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
  selector: 'jhi-tripa-b-update',
  templateUrl: './tripa-b-update.component.html'
})
export class TripaBUpdateComponent implements OnInit {
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
    numeroPag: [],
    pelicula: [],
    plancha: [],
    tipoMontaje: [],
    maquina: [],
    tipoPapel: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tripaBService: TripaBService,
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
    this.activatedRoute.data.subscribe(({ tripaB }) => {
      this.updateForm(tripaB);
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

  updateForm(tripaB: ITripaB) {
    this.editForm.patchValue({
      id: tripaB.id,
      ancho: tripaB.ancho,
      alto: tripaB.alto,
      colorT: tripaB.colorT,
      colorR: tripaB.colorR,
      numeroPag: tripaB.numeroPag,
      pelicula: tripaB.pelicula,
      plancha: tripaB.plancha,
      tipoMontaje: tripaB.tipoMontaje,
      maquina: tripaB.maquina,
      tipoPapel: tripaB.tipoPapel
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tripaB = this.createFromForm();
    if (tripaB.id !== undefined) {
      this.subscribeToSaveResponse(this.tripaBService.update(tripaB));
    } else {
      this.subscribeToSaveResponse(this.tripaBService.create(tripaB));
    }
  }

  private createFromForm(): ITripaB {
    return {
      ...new TripaB(),
      id: this.editForm.get(['id']).value,
      ancho: this.editForm.get(['ancho']).value,
      alto: this.editForm.get(['alto']).value,
      colorT: this.editForm.get(['colorT']).value,
      colorR: this.editForm.get(['colorR']).value,
      numeroPag: this.editForm.get(['numeroPag']).value,
      pelicula: this.editForm.get(['pelicula']).value,
      plancha: this.editForm.get(['plancha']).value,
      tipoMontaje: this.editForm.get(['tipoMontaje']).value,
      maquina: this.editForm.get(['maquina']).value,
      tipoPapel: this.editForm.get(['tipoPapel']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITripaB>>) {
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
