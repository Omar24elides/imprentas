import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMaquina, Maquina } from 'app/shared/model/maquina.model';
import { MaquinaService } from './maquina.service';

@Component({
  selector: 'jhi-maquina-update',
  templateUrl: './maquina-update.component.html'
})
export class MaquinaUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    precio: []
  });

  constructor(protected maquinaService: MaquinaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ maquina }) => {
      this.updateForm(maquina);
    });
  }

  updateForm(maquina: IMaquina) {
    this.editForm.patchValue({
      id: maquina.id,
      nombre: maquina.nombre,
      precio: maquina.precio
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const maquina = this.createFromForm();
    if (maquina.id !== undefined) {
      this.subscribeToSaveResponse(this.maquinaService.update(maquina));
    } else {
      this.subscribeToSaveResponse(this.maquinaService.create(maquina));
    }
  }

  private createFromForm(): IMaquina {
    return {
      ...new Maquina(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      precio: this.editForm.get(['precio']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMaquina>>) {
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
