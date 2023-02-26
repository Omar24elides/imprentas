import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ILibro, Libro } from 'app/shared/model/libro.model';
import { LibroService } from './libro.service';
import { ITripaA } from 'app/shared/model/tripa-a.model';
import { TripaAService } from 'app/entities/tripa-a/tripa-a.service';
import { ITripaB } from 'app/shared/model/tripa-b.model';
import { TripaBService } from 'app/entities/tripa-b/tripa-b.service';
import { IPortada } from 'app/shared/model/portada.model';
import { PortadaService } from 'app/entities/portada/portada.service';
import { IOtroFormato } from 'app/shared/model/otro-formato.model';
import { OtroFormatoService } from 'app/entities/otro-formato/otro-formato.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';

@Component({
  selector: 'jhi-libro-update',
  templateUrl: './libro-update.component.html'
})
export class LibroUpdateComponent implements OnInit {
  isSaving: boolean;

  tripaas: ITripaA[];

  tripabs: ITripaB[];

  portadas: IPortada[];

  otroformatoes: IOtroFormato[];

  clientes: ICliente[];

  editForm = this.fb.group({
    id: [],
    cantidad: [],
    tripaA: [],
    tripaB: [],
    portada: [],
    otroFormato: [],
    cliente: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected libroService: LibroService,
    protected tripaAService: TripaAService,
    protected tripaBService: TripaBService,
    protected portadaService: PortadaService,
    protected otroFormatoService: OtroFormatoService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ libro }) => {
      this.updateForm(libro);
    });
    this.tripaAService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITripaA[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITripaA[]>) => response.body)
      )
      .subscribe((res: ITripaA[]) => (this.tripaas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tripaBService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITripaB[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITripaB[]>) => response.body)
      )
      .subscribe((res: ITripaB[]) => (this.tripabs = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.portadaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPortada[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPortada[]>) => response.body)
      )
      .subscribe((res: IPortada[]) => (this.portadas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.otroFormatoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IOtroFormato[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOtroFormato[]>) => response.body)
      )
      .subscribe((res: IOtroFormato[]) => (this.otroformatoes = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.clienteService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICliente[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICliente[]>) => response.body)
      )
      .subscribe((res: ICliente[]) => (this.clientes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(libro: ILibro) {
    this.editForm.patchValue({
      id: libro.id,
      cantidad: libro.cantidad,
      tripaA: libro.tripaA,
      tripaB: libro.tripaB,
      portada: libro.portada,
      otroFormato: libro.otroFormato,
      cliente: libro.cliente
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const libro = this.createFromForm();
    if (libro.id !== undefined) {
      this.subscribeToSaveResponse(this.libroService.update(libro));
    } else {
      this.subscribeToSaveResponse(this.libroService.create(libro));
    }
  }

  private createFromForm(): ILibro {
    return {
      ...new Libro(),
      id: this.editForm.get(['id']).value,
      cantidad: this.editForm.get(['cantidad']).value,
      tripaA: this.editForm.get(['tripaA']).value,
      tripaB: this.editForm.get(['tripaB']).value,
      portada: this.editForm.get(['portada']).value,
      otroFormato: this.editForm.get(['otroFormato']).value,
      cliente: this.editForm.get(['cliente']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILibro>>) {
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

  trackTripaAById(index: number, item: ITripaA) {
    return item.id;
  }

  trackTripaBById(index: number, item: ITripaB) {
    return item.id;
  }

  trackPortadaById(index: number, item: IPortada) {
    return item.id;
  }

  trackOtroFormatoById(index: number, item: IOtroFormato) {
    return item.id;
  }

  trackClienteById(index: number, item: ICliente) {
    return item.id;
  }
}
