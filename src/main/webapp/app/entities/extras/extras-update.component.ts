import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IExtras, Extras } from 'app/shared/model/extras.model';
import { ExtrasService } from './extras.service';

@Component({
  selector: 'jhi-extras-update',
  templateUrl: './extras-update.component.html'
})
export class ExtrasUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    precio: []
  });

  constructor(protected extrasService: ExtrasService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ extras }) => {
      this.updateForm(extras);
    });
  }

  updateForm(extras: IExtras) {
    this.editForm.patchValue({
      id: extras.id,
      nombre: extras.nombre,
      precio: extras.precio
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const extras = this.createFromForm();
    if (extras.id !== undefined) {
      this.subscribeToSaveResponse(this.extrasService.update(extras));
    } else {
      this.subscribeToSaveResponse(this.extrasService.create(extras));
    }
  }

  private createFromForm(): IExtras {
    return {
      ...new Extras(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      precio: this.editForm.get(['precio']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IExtras>>) {
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
