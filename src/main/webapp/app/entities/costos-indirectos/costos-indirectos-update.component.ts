import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICostosIndirectos, CostosIndirectos } from 'app/shared/model/costos-indirectos.model';
import { CostosIndirectosService } from './costos-indirectos.service';
import { ILibro } from 'app/shared/model/libro.model';
import { LibroService } from 'app/entities/libro/libro.service';
import { IExtras } from 'app/shared/model/extras.model';
import { ExtrasService } from 'app/entities/extras/extras.service';

@Component({
  selector: 'jhi-costos-indirectos-update',
  templateUrl: './costos-indirectos-update.component.html'
})
export class CostosIndirectosUpdateComponent implements OnInit {
  isSaving: boolean;

  libros: ILibro[];

  extras: IExtras[];

  editForm = this.fb.group({
    id: [],
    cantidad: [],
    libro: [],
    extra: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected costosIndirectosService: CostosIndirectosService,
    protected libroService: LibroService,
    protected extraService: ExtrasService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ costosIndirectos }) => {
      this.updateForm(costosIndirectos);
    });
    this.libroService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILibro[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILibro[]>) => response.body)
      )
      .subscribe((res: ILibro[]) => (this.libros = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.extraService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IExtras[]>) => mayBeOk.ok),
        map((response: HttpResponse<IExtras[]>) => response.body)
      )
      .subscribe((res: IExtras[]) => (this.extras = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(costosIndirectos: ICostosIndirectos) {
    this.editForm.patchValue({
      id: costosIndirectos.id,
      cantidad: costosIndirectos.cantidad,
      libro: costosIndirectos.libro,
      extra: costosIndirectos.extra
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const costosIndirectos = this.createFromForm();
    if (costosIndirectos.id !== undefined) {
      this.subscribeToSaveResponse(this.costosIndirectosService.update(costosIndirectos));
    } else {
      this.subscribeToSaveResponse(this.costosIndirectosService.create(costosIndirectos));
    }
  }

  private createFromForm(): ICostosIndirectos {
    return {
      ...new CostosIndirectos(),
      id: this.editForm.get(['id']).value,
      cantidad: this.editForm.get(['cantidad']).value,
      libro: this.editForm.get(['libro']).value,
      extra: this.editForm.get(['extra']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICostosIndirectos>>) {
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

  trackExtraById(index: number, item: IExtras) {
    return item.id;
  }
}
