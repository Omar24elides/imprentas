import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoDocumento, TipoDocumento } from 'app/shared/model/tipo-documento.model';
import { TipoDocumentoService } from './tipo-documento.service';

@Component({
  selector: 'jhi-tipo-documento-update',
  templateUrl: './tipo-documento-update.component.html'
})
export class TipoDocumentoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    tipo: []
  });

  constructor(protected tipoDocumentoService: TipoDocumentoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoDocumento }) => {
      this.updateForm(tipoDocumento);
    });
  }

  updateForm(tipoDocumento: ITipoDocumento) {
    this.editForm.patchValue({
      id: tipoDocumento.id,
      tipo: tipoDocumento.tipo
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoDocumento = this.createFromForm();
    if (tipoDocumento.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoDocumentoService.update(tipoDocumento));
    } else {
      this.subscribeToSaveResponse(this.tipoDocumentoService.create(tipoDocumento));
    }
  }

  private createFromForm(): ITipoDocumento {
    return {
      ...new TipoDocumento(),
      id: this.editForm.get(['id']).value,
      tipo: this.editForm.get(['tipo']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoDocumento>>) {
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
