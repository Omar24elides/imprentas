import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IManoObra, ManoObra } from 'app/shared/model/mano-obra.model';
import { ManoObraService } from './mano-obra.service';
import { ILibro } from 'app/shared/model/libro.model';
import { LibroService } from 'app/entities/libro/libro.service';
import { IMaquina } from 'app/shared/model/maquina.model';
import { MaquinaService } from 'app/entities/maquina/maquina.service';

@Component({
  selector: 'jhi-mano-obra-update',
  templateUrl: './mano-obra-update.component.html'
})
export class ManoObraUpdateComponent implements OnInit {
  isSaving: boolean;

  libros: ILibro[];

  maquinas: IMaquina[];

  editForm = this.fb.group({
    id: [],
    turno: [],
    horas: [],
    dias: [],
    mes: [],
    horasExtra: [],
    libro: [],
    maquina: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected manoObraService: ManoObraService,
    protected libroService: LibroService,
    protected maquinaService: MaquinaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ manoObra }) => {
      this.updateForm(manoObra);
    });
    this.libroService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILibro[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILibro[]>) => response.body)
      )
      .subscribe((res: ILibro[]) => (this.libros = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.maquinaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMaquina[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMaquina[]>) => response.body)
      )
      .subscribe((res: IMaquina[]) => (this.maquinas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(manoObra: IManoObra) {
    this.editForm.patchValue({
      id: manoObra.id,
      turno: manoObra.turno,
      horas: manoObra.horas,
      dias: manoObra.dias,
      mes: manoObra.mes,
      horasExtra: manoObra.horasExtra,
      libro: manoObra.libro,
      maquina: manoObra.maquina
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const manoObra = this.createFromForm();
    if (manoObra.id !== undefined) {
      this.subscribeToSaveResponse(this.manoObraService.update(manoObra));
    } else {
      this.subscribeToSaveResponse(this.manoObraService.create(manoObra));
    }
  }

  private createFromForm(): IManoObra {
    return {
      ...new ManoObra(),
      id: this.editForm.get(['id']).value,
      turno: this.editForm.get(['turno']).value,
      horas: this.editForm.get(['horas']).value,
      dias: this.editForm.get(['dias']).value,
      mes: this.editForm.get(['mes']).value,
      horasExtra: this.editForm.get(['horasExtra']).value,
      libro: this.editForm.get(['libro']).value,
      maquina: this.editForm.get(['maquina']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IManoObra>>) {
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

  trackLibroById(index: number, item: ILibro) {
    return item.id;
  }

  trackMaquinaById(index: number, item: IMaquina) {
    return item.id;
  }
}
