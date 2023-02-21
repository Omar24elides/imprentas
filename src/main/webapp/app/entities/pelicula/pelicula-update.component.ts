import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IPelicula, Pelicula } from 'app/shared/model/pelicula.model';
import { PeliculaService } from './pelicula.service';

@Component({
  selector: 'jhi-pelicula-update',
  templateUrl: './pelicula-update.component.html'
})
export class PeliculaUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombre: [],
    precio: []
  });

  constructor(protected peliculaService: PeliculaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pelicula }) => {
      this.updateForm(pelicula);
    });
  }

  updateForm(pelicula: IPelicula) {
    this.editForm.patchValue({
      id: pelicula.id,
      nombre: pelicula.nombre,
      precio: pelicula.precio
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pelicula = this.createFromForm();
    if (pelicula.id !== undefined) {
      this.subscribeToSaveResponse(this.peliculaService.update(pelicula));
    } else {
      this.subscribeToSaveResponse(this.peliculaService.create(pelicula));
    }
  }

  private createFromForm(): IPelicula {
    return {
      ...new Pelicula(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      precio: this.editForm.get(['precio']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPelicula>>) {
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
