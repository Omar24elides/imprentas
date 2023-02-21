import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoMontaje, TipoMontaje } from 'app/shared/model/tipo-montaje.model';
import { TipoMontajeService } from './tipo-montaje.service';

@Component({
  selector: 'jhi-tipo-montaje-update',
  templateUrl: './tipo-montaje-update.component.html'
})
export class TipoMontajeUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombre: []
  });

  constructor(protected tipoMontajeService: TipoMontajeService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoMontaje }) => {
      this.updateForm(tipoMontaje);
    });
  }

  updateForm(tipoMontaje: ITipoMontaje) {
    this.editForm.patchValue({
      id: tipoMontaje.id,
      nombre: tipoMontaje.nombre
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoMontaje = this.createFromForm();
    if (tipoMontaje.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoMontajeService.update(tipoMontaje));
    } else {
      this.subscribeToSaveResponse(this.tipoMontajeService.create(tipoMontaje));
    }
  }

  private createFromForm(): ITipoMontaje {
    return {
      ...new TipoMontaje(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoMontaje>>) {
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
