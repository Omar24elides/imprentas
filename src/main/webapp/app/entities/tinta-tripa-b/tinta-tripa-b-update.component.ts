import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITintaTripaB, TintaTripaB } from 'app/shared/model/tinta-tripa-b.model';
import { TintaTripaBService } from './tinta-tripa-b.service';
import { ITinta } from 'app/shared/model/tinta.model';
import { TintaService } from 'app/entities/tinta/tinta.service';
import { ITripaB } from 'app/shared/model/tripa-b.model';
import { TripaBService } from 'app/entities/tripa-b/tripa-b.service';

@Component({
  selector: 'jhi-tinta-tripa-b-update',
  templateUrl: './tinta-tripa-b-update.component.html'
})
export class TintaTripaBUpdateComponent implements OnInit {
  isSaving: boolean;

  tintas: ITinta[];

  tripabs: ITripaB[];

  editForm = this.fb.group({
    id: [],
    tinta: [],
    tripaB: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tintaTripaBService: TintaTripaBService,
    protected tintaService: TintaService,
    protected tripaBService: TripaBService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tintaTripaB }) => {
      this.updateForm(tintaTripaB);
    });
    this.tintaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITinta[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITinta[]>) => response.body)
      )
      .subscribe((res: ITinta[]) => (this.tintas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tripaBService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITripaB[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITripaB[]>) => response.body)
      )
      .subscribe((res: ITripaB[]) => (this.tripabs = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tintaTripaB: ITintaTripaB) {
    this.editForm.patchValue({
      id: tintaTripaB.id,
      tinta: tintaTripaB.tinta,
      tripaB: tintaTripaB.tripaB
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tintaTripaB = this.createFromForm();
    if (tintaTripaB.id !== undefined) {
      this.subscribeToSaveResponse(this.tintaTripaBService.update(tintaTripaB));
    } else {
      this.subscribeToSaveResponse(this.tintaTripaBService.create(tintaTripaB));
    }
  }

  private createFromForm(): ITintaTripaB {
    return {
      ...new TintaTripaB(),
      id: this.editForm.get(['id']).value,
      tinta: this.editForm.get(['tinta']).value,
      tripaB: this.editForm.get(['tripaB']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITintaTripaB>>) {
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

  trackTripaBById(index: number, item: ITripaB) {
    return item.id;
  }
}
