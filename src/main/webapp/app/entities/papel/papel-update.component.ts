import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPapel, Papel } from 'app/shared/model/papel.model';
import { PapelService } from './papel.service';

@Component({
  selector: 'jhi-papel-update',
  templateUrl: './papel-update.component.html'
})
export class PapelUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombre: []
  });

  constructor(protected papelService: PapelService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ papel }) => {
      this.updateForm(papel);
    });
  }

  updateForm(papel: IPapel) {
    this.editForm.patchValue({
      id: papel.id,
      nombre: papel.nombre
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const papel = this.createFromForm();
    if (papel.id !== undefined) {
      this.subscribeToSaveResponse(this.papelService.update(papel));
    } else {
      this.subscribeToSaveResponse(this.papelService.create(papel));
    }
  }

  private createFromForm(): IPapel {
    return {
      ...new Papel(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPapel>>) {
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
