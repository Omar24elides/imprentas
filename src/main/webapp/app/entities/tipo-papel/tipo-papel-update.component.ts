import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoPapel, TipoPapel } from 'app/shared/model/tipo-papel.model';
import { TipoPapelService } from './tipo-papel.service';

@Component({
  selector: 'jhi-tipo-papel-update',
  templateUrl: './tipo-papel-update.component.html'
})
export class TipoPapelUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    precio: []
  });

  constructor(protected tipoPapelService: TipoPapelService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoPapel }) => {
      this.updateForm(tipoPapel);
    });
  }

  updateForm(tipoPapel: ITipoPapel) {
    this.editForm.patchValue({
      id: tipoPapel.id,
      nombre: tipoPapel.nombre,
      precio: tipoPapel.precio
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoPapel = this.createFromForm();
    if (tipoPapel.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoPapelService.update(tipoPapel));
    } else {
      this.subscribeToSaveResponse(this.tipoPapelService.create(tipoPapel));
    }
  }

  private createFromForm(): ITipoPapel {
    return {
      ...new TipoPapel(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      precio: this.editForm.get(['precio']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoPapel>>) {
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
