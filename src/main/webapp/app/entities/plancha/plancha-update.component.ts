import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPlancha, Plancha } from 'app/shared/model/plancha.model';
import { PlanchaService } from './plancha.service';

@Component({
  selector: 'jhi-plancha-update',
  templateUrl: './plancha-update.component.html'
})
export class PlanchaUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    precio: []
  });

  constructor(protected planchaService: PlanchaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ plancha }) => {
      this.updateForm(plancha);
    });
  }

  updateForm(plancha: IPlancha) {
    this.editForm.patchValue({
      id: plancha.id,
      nombre: plancha.nombre,
      precio: plancha.precio
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const plancha = this.createFromForm();
    if (plancha.id !== undefined) {
      this.subscribeToSaveResponse(this.planchaService.update(plancha));
    } else {
      this.subscribeToSaveResponse(this.planchaService.create(plancha));
    }
  }

  private createFromForm(): IPlancha {
    return {
      ...new Plancha(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      precio: this.editForm.get(['precio']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPlancha>>) {
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
