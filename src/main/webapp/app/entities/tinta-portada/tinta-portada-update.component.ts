import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITintaPortada, TintaPortada } from 'app/shared/model/tinta-portada.model';
import { TintaPortadaService } from './tinta-portada.service';
import { ITinta } from 'app/shared/model/tinta.model';
import { TintaService } from 'app/entities/tinta/tinta.service';
import { IPortada } from 'app/shared/model/portada.model';
import { PortadaService } from 'app/entities/portada/portada.service';

@Component({
  selector: 'jhi-tinta-portada-update',
  templateUrl: './tinta-portada-update.component.html'
})
export class TintaPortadaUpdateComponent implements OnInit {
  isSaving: boolean;

  tintas: ITinta[];

  portadas: IPortada[];

  editForm = this.fb.group({
    id: [],
    tinta: [],
    portada: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tintaPortadaService: TintaPortadaService,
    protected tintaService: TintaService,
    protected portadaService: PortadaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tintaPortada }) => {
      this.updateForm(tintaPortada);
    });
    this.tintaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITinta[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITinta[]>) => response.body)
      )
      .subscribe((res: ITinta[]) => (this.tintas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.portadaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPortada[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPortada[]>) => response.body)
      )
      .subscribe((res: IPortada[]) => (this.portadas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tintaPortada: ITintaPortada) {
    this.editForm.patchValue({
      id: tintaPortada.id,
      tinta: tintaPortada.tinta,
      portada: tintaPortada.portada
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tintaPortada = this.createFromForm();
    if (tintaPortada.id !== undefined) {
      this.subscribeToSaveResponse(this.tintaPortadaService.update(tintaPortada));
    } else {
      this.subscribeToSaveResponse(this.tintaPortadaService.create(tintaPortada));
    }
  }

  private createFromForm(): ITintaPortada {
    return {
      ...new TintaPortada(),
      id: this.editForm.get(['id']).value,
      tinta: this.editForm.get(['tinta']).value,
      portada: this.editForm.get(['portada']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITintaPortada>>) {
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

  trackTintaById(index: number, item: ITinta) {
    return item.id;
  }

  trackPortadaById(index: number, item: IPortada) {
    return item.id;
  }
}
