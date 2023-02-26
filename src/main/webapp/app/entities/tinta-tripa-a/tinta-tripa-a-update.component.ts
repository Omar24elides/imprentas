import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITintaTripaA, TintaTripaA } from 'app/shared/model/tinta-tripa-a.model';
import { TintaTripaAService } from './tinta-tripa-a.service';
import { ITinta } from 'app/shared/model/tinta.model';
import { TintaService } from 'app/entities/tinta/tinta.service';
import { ITripaA } from 'app/shared/model/tripa-a.model';
import { TripaAService } from 'app/entities/tripa-a/tripa-a.service';

@Component({
  selector: 'jhi-tinta-tripa-a-update',
  templateUrl: './tinta-tripa-a-update.component.html'
})
export class TintaTripaAUpdateComponent implements OnInit {
  isSaving: boolean;

  tintas: ITinta[];

  tripaas: ITripaA[];

  editForm = this.fb.group({
    id: [],
    tinta: [],
    tripaA: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tintaTripaAService: TintaTripaAService,
    protected tintaService: TintaService,
    protected tripaAService: TripaAService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tintaTripaA }) => {
      this.updateForm(tintaTripaA);
    });
    this.tintaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITinta[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITinta[]>) => response.body)
      )
      .subscribe((res: ITinta[]) => (this.tintas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tripaAService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITripaA[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITripaA[]>) => response.body)
      )
      .subscribe((res: ITripaA[]) => (this.tripaas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tintaTripaA: ITintaTripaA) {
    this.editForm.patchValue({
      id: tintaTripaA.id,
      tinta: tintaTripaA.tinta,
      tripaA: tintaTripaA.tripaA
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tintaTripaA = this.createFromForm();
    if (tintaTripaA.id !== undefined) {
      this.subscribeToSaveResponse(this.tintaTripaAService.update(tintaTripaA));
    } else {
      this.subscribeToSaveResponse(this.tintaTripaAService.create(tintaTripaA));
    }
  }

  private createFromForm(): ITintaTripaA {
    return {
      ...new TintaTripaA(),
      id: this.editForm.get(['id']).value,
      tinta: this.editForm.get(['tinta']).value,
      tripaA: this.editForm.get(['tripaA']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITintaTripaA>>) {
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

  trackTripaAById(index: number, item: ITripaA) {
    return item.id;
  }
}
