import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITinta, Tinta } from 'app/shared/model/tinta.model';
import { TintaService } from './tinta.service';

@Component({
  selector: 'jhi-tinta-update',
  templateUrl: './tinta-update.component.html'
})
export class TintaUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    precio: []
  });

  constructor(protected tintaService: TintaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tinta }) => {
      this.updateForm(tinta);
    });
  }

  updateForm(tinta: ITinta) {
    this.editForm.patchValue({
      id: tinta.id,
      nombre: tinta.nombre,
      precio: tinta.precio
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tinta = this.createFromForm();
    if (tinta.id !== undefined) {
      this.subscribeToSaveResponse(this.tintaService.update(tinta));
    } else {
      this.subscribeToSaveResponse(this.tintaService.create(tinta));
    }
  }

  private createFromForm(): ITinta {
    return {
      ...new Tinta(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      precio: this.editForm.get(['precio']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITinta>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
