import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITintaOtroFormato, TintaOtroFormato } from 'app/shared/model/tinta-otro-formato.model';
import { TintaOtroFormatoService } from './tinta-otro-formato.service';
import { ITinta } from 'app/shared/model/tinta.model';
import { TintaService } from 'app/entities/tinta/tinta.service';
import { IOtroFormato } from 'app/shared/model/otro-formato.model';
import { OtroFormatoService } from 'app/entities/otro-formato/otro-formato.service';

@Component({
  selector: 'jhi-tinta-otro-formato-update',
  templateUrl: './tinta-otro-formato-update.component.html'
})
export class TintaOtroFormatoUpdateComponent implements OnInit {
  isSaving: boolean;

  tintas: ITinta[];

  otroformatos: IOtroFormato[];

  editForm = this.fb.group({
    id: [],
    tinta: [],
    otroFormato: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tintaOtroFormatoService: TintaOtroFormatoService,
    protected tintaService: TintaService,
    protected otroFormatoService: OtroFormatoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tintaOtroFormato }) => {
      this.updateForm(tintaOtroFormato);
    });
    this.tintaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITinta[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITinta[]>) => response.body)
      )
      .subscribe((res: ITinta[]) => (this.tintas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.otroFormatoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IOtroFormato[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOtroFormato[]>) => response.body)
      )
      .subscribe((res: IOtroFormato[]) => (this.otroformatos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tintaOtroFormato: ITintaOtroFormato) {
    this.editForm.patchValue({
      id: tintaOtroFormato.id,
      tinta: tintaOtroFormato.tinta,
      otroFormato: tintaOtroFormato.otroFormato
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tintaOtroFormato = this.createFromForm();
    if (tintaOtroFormato.id !== undefined) {
      this.subscribeToSaveResponse(this.tintaOtroFormatoService.update(tintaOtroFormato));
    } else {
      this.subscribeToSaveResponse(this.tintaOtroFormatoService.create(tintaOtroFormato));
    }
  }

  private createFromForm(): ITintaOtroFormato {
    return {
      ...new TintaOtroFormato(),
      id: this.editForm.get(['id']).value,
      tinta: this.editForm.get(['tinta']).value,
      otroFormato: this.editForm.get(['otroFormato']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITintaOtroFormato>>) {
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

  trackOtroFormatoById(index: number, item: IOtroFormato) {
    return item.id;
  }
}
