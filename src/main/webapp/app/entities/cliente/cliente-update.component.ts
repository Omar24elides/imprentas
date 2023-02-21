import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICliente, Cliente } from 'app/shared/model/cliente.model';
import { ClienteService } from './cliente.service';
import { ITipoDocumento } from 'app/shared/model/tipo-documento.model';
import { TipoDocumentoService } from 'app/entities/tipo-documento/tipo-documento.service';
import { TripaA } from 'app/shared/model/tripa-a.model';
import { IPelicula } from 'app/shared/model/pelicula.model';
import { ITipoMontaje } from 'app/shared/model/tipo-montaje.model';
import { IPlancha } from 'app/shared/model/plancha.model';
import { IMaquina } from 'app/shared/model/maquina.model';
import { ITipoPapel } from 'app/shared/model/tipo-papel.model';
import { TripaAService } from '../tripa-a/tripa-a.service';
import { PeliculaService } from '../pelicula/pelicula.service';
import { PlanchaService } from '../plancha/plancha.service';
import { TipoMontajeService } from '../tipo-montaje/tipo-montaje.service';
import { MaquinaService } from '../maquina/maquina.service';
import { TipoPapelService } from '../tipo-papel/tipo-papel.service';
import { TripaB } from 'app/shared/model/tripa-b.model';
import { Portada } from 'app/shared/model/portada.model';
import { OtroFormato } from 'app/shared/model/otro-formato.model';
import { PortadaService } from '../portada/portada.service';
import { OtroFormatoService } from '../otro-formato/otro-formato.service';
import { ITinta } from 'app/shared/model/tinta.model';
import { TintaService } from '../tinta/tinta.service';
import { TintaTripaA } from 'app/shared/model/tinta-tripa-a.model';
import { TintaPortada } from 'app/shared/model/tinta-portada.model';
import { TintaOtroFormato } from 'app/shared/model/tinta-otro-formato.model';
import { TintaTripaB } from 'app/shared/model/tinta-tripa-b.model';
import { TintaTripaAService } from '../tinta-tripa-a/tinta-tripa-a.service';
import { TintaPortadaService } from '../tinta-portada/tinta-portada.service';
import { TintaOtroFormatoService } from '../tinta-otro-formato/tinta-otro-formato.service';
import { TintaTripaBService } from '../tinta-tripa-b/tinta-tripa-b.service';
import { Libro } from 'app/shared/model/libro.model';
import { LibroService } from '../libro/libro.service';
import { ManoObraService } from '../mano-obra/mano-obra.service';
import { ManoObra } from 'app/shared/model/mano-obra.model';
import { TripaBService } from '../tripa-b/tripa-b.service';
import { ExtrasService } from '../extras/extras.service';
import { IExtras } from 'app/shared/model/extras.model';
import { CostosIndirectos } from 'app/shared/model/costos-indirectos.model';
import { CostosIndirectosService } from '../costos-indirectos/costos-indirectos.service';
/* eslint-disable no-console*/

@Component({
  selector: 'jhi-cliente-update',
  templateUrl: './cliente-update.component.html'
})
export class ClienteUpdateComponent implements OnInit {
  isSaving: boolean;
  tabSeleccionada = 1;

  tripaA = new TripaA();
  tripaB = new TripaB();
  portada = new Portada();
  otroFormato = new OtroFormato();

  tipodocumentos: ITipoDocumento[];
  peliculas: IPelicula[];
  planchas: IPlancha[];
  tipomontajes: ITipoMontaje[];
  maquinas: IMaquina[];
  tipopapels: ITipoPapel[];

  tintas: ITinta[];
  tintasTripaA = new Array<TintaTripaA>();
  tintasTripaB = new Array<TintaTripaB>();
  tintasPortada = new Array<TintaPortada>();
  tintasOtroFormato = new Array<TintaOtroFormato>();

  extras: ITinta[];
  costosIndirecto = new Array<CostosIndirectos>();

  totalTripaA = 0;
  totalTripaB = 0;
  totalPortada = 0;
  totalOtroFormato = 0;

  totalTintaTripaA = 0;
  totalTintaTripaB = 0;
  totalTintaPortada = 0;
  totalTintaOtroFormto = 0;

  totalManoObra = 0;
  totalCostosIndirecto = 0;

  libro = new Libro();
  manoObras = new Array<ManoObra>();

  editForm = this.fb.group({
    id: [],
    email: [],
    dni: [],
    tipoDocumento: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected clienteService: ClienteService,
    protected tipoDocumentoService: TipoDocumentoService,
    protected activatedRoute: ActivatedRoute,
    protected tripaAService: TripaAService,
    protected tripaBService: TripaBService,
    protected peliculaService: PeliculaService,
    protected planchaService: PlanchaService,
    protected tipoMontajeService: TipoMontajeService,
    protected portadaService: PortadaService,
    protected otroFormatoService: OtroFormatoService,
    protected tintaService: TintaService,
    protected tintasTripaAService: TintaTripaAService,
    protected tintasTripaBService: TintaTripaBService,
    protected tintasPortadaService: TintaPortadaService,
    protected tintasOtroFormatoService: TintaOtroFormatoService,
    protected libroService: LibroService,
    protected manoObraService: ManoObraService,
    protected maquinaService: MaquinaService,
    protected tipoPapelService: TipoPapelService,
    protected extrasService: ExtrasService,
    protected costosIndirectosService: CostosIndirectosService,

    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cliente }) => {
      this.updateForm(cliente);
    });

    this.peliculaService.query({ size: 5000 }).subscribe((res: HttpResponse<IPelicula[]>) => {
      this.peliculas = res.body;
    });

    this.planchaService.query({ size: 5000 }).subscribe((res: HttpResponse<IPlancha[]>) => {
      this.planchas = res.body;
    });

    this.tipoMontajeService.query({ size: 5000 }).subscribe((res: HttpResponse<ITipoMontaje[]>) => {
      this.tipomontajes = res.body;
    });

    this.maquinaService.query({ size: 5000 }).subscribe((res: HttpResponse<IMaquina[]>) => {
      this.maquinas = res.body;
    });

    this.tipoPapelService.query({ size: 5000 }).subscribe((res: HttpResponse<ITipoPapel[]>) => {
      this.tipopapels = res.body;
    });

    this.tintaService.query({ size: 5000 }).subscribe((res: HttpResponse<ITinta[]>) => {
      this.tintas = res.body;
    });

    this.extrasService.query({ size: 5000 }).subscribe((res: HttpResponse<IExtras[]>) => {
      this.extras = res.body;
      this.inicializarCostesExtras();
    });

    this.tipoDocumentoService.query({ size: 5000 }).subscribe((res: HttpResponse<ITipoDocumento[]>) => {
      this.tipodocumentos = res.body;
    });
  }

  inicializarCostesExtras() {
    for (let i = 0; i < this.extras.length; i++) {
      const costoIndirectoTemporal = new CostosIndirectos();

      costoIndirectoTemporal.extra = this.extras[i];
      this.costosIndirecto.push(costoIndirectoTemporal);
    }
  }

  agregarTintaTripaA(tinta) {
    let band = false;

    for (let i = 0; i < this.tintasTripaA.length; i++) {
      if (tinta.id === this.tintasTripaA[i].tinta.id) {
        band = true;
      }
    }

    if (!band) {
      const tintaTripaATemporal = new TintaTripaA();
      tintaTripaATemporal.tinta = tinta;
      // tintaTripaATemporal.tripaA = this.tripaA;
      this.tintasTripaA.push(tintaTripaATemporal);
    }
  }

  agregarTintaTripaB(tinta) {
    let band = false;

    for (let i = 0; i < this.tintasTripaB.length; i++) {
      if (tinta.id === this.tintasTripaB[i].tinta.id) {
        band = true;
      }
    }

    if (!band) {
      const tintaTripaBTemporal = new TintaTripaB();
      tintaTripaBTemporal.tinta = tinta;
      // tintaTripaBTemporal.tripaB = this.tripaB;
      this.tintasTripaB.push(tintaTripaBTemporal);
    }
  }

  agregarTintaPortada(tinta) {
    let band = false;

    for (let i = 0; i < this.tintasPortada.length; i++) {
      if (tinta.id === this.tintasPortada[i].tinta.id) {
        band = true;
      }
    }

    if (!band) {
      const tintaPortadaTemporal = new TintaPortada();
      tintaPortadaTemporal.tinta = tinta;
      // tintaPortadaTemporal.portada = this.portada;
      this.tintasPortada.push(tintaPortadaTemporal);
    }
  }

  agregarTintaOtroFormato(tinta) {
    let band = false;

    for (let i = 0; i < this.tintasOtroFormato.length; i++) {
      if (tinta.id === this.tintasOtroFormato[i].tinta.id) {
        band = true;
      }
    }

    if (!band) {
      const tintaOtroFormatoTemporal = new TintaOtroFormato();
      tintaOtroFormatoTemporal.tinta = tinta;
      // tintaOtroFormatoTemporal.otroFormato = this.otroFormato;
      this.tintasOtroFormato.push(tintaOtroFormatoTemporal);
    }
  }

  updateForm(cliente: ICliente) {
    this.editForm.patchValue({
      id: cliente.id,
      email: cliente.email,
      dni: cliente.dni,
      tipoDocumento: cliente.tipoDocumento
    });
  }

  previousState() {
    window.history.back();
  }

  guardarCliente() {
    this.isSaving = true;
    const cliente = this.createFromForm();
    if (cliente.id !== undefined) {
      this.subscribeToSaveResponse(this.clienteService.update(cliente));
    } else {
      this.subscribeToSaveResponse(this.clienteService.create(cliente));
    }
  }

  guardarTripas() {
    this.tabSeleccionada = 3;
    this.tripaAService.create(this.tripaA).subscribe(res => {
      this.tripaA = res.body;
    });

    this.tripaBService.create(this.tripaB).subscribe(res => {
      this.tripaB = res.body;
    });
  }

  guardarPortadaYOtroFormto() {
    this.tabSeleccionada = 4;
    this.portadaService.create(this.portada).subscribe(res => {
      this.portada = res.body;
    });

    this.otroFormatoService.create(this.otroFormato).subscribe(res => {
      this.otroFormato = res.body;
    });
  }

  guardarTintas() {
    this.tabSeleccionada = 5;
    this.crearLibro(); // PARA LA SIGUIENTE PESTAÑA NECESITAMOS EL LIBRO ASI QUE LO CREAMOS PARA TENERLO LISTO

    for (let i = 0; i < this.tintasTripaA.length; i++) {
      this.tintasTripaA[i].tripaA = this.tripaA;

      console.log('this.tintasTripaA[i] AG ===> ', this.tintasTripaA[i]);

      this.tintasTripaAService.create(this.tintasTripaA[i]).subscribe(res => {
        this.tintasTripaA[i] = res.body;
        console.log('this.tintasTripaA[i] G ===> ', this.tintasTripaA[i]);
      });
    }

    for (let j = 0; j < this.tintasTripaB.length; j++) {
      this.tintasTripaB[j].tripaB = this.tripaB;

      console.log('this.tintasTripaB[j] AG ===> ', this.tintasTripaB[j]);
      this.tintasTripaBService.create(this.tintasTripaB[j]).subscribe(res => {
        this.tintasTripaB[j] = res.body;
        console.log('this.tintasTripaB[j] G ===> ', this.tintasTripaB[j]);
      });
    }

    for (let k = 0; k < this.tintasPortada.length; k++) {
      this.tintasPortada[k].portada = this.portada;

      console.log('this.tintasPortada[k] AG ===> ', this.tintasPortada[k]);

      this.tintasPortadaService.create(this.tintasPortada[k]).subscribe(res => {
        this.tintasPortada[k] = res.body;
        console.log('this.tintasPortada[k] G ===> ', this.tintasPortada[k]);
      });
    }

    for (let x = 0; x < this.tintasOtroFormato.length; x++) {
      this.tintasOtroFormato[x].otroFormato = this.otroFormato;

      console.log('this.tintasOtroFormato[x] AG ===> ', this.tintasOtroFormato[x]);
      this.tintasOtroFormatoService.create(this.tintasOtroFormato[x]).subscribe(res => {
        this.tintasOtroFormato[x] = res.body;
        console.log('this.tintasOtroFormato[x] G ===> ', this.tintasOtroFormato[x]);
      });
    }
  }

  crearLibro() {
    this.libro.otroFormato = this.otroFormato;
    this.libro.portada = this.portada;
    this.libro.tripaA = this.tripaA;
    this.libro.tripaB = this.tripaB;
    // this.libro.cantidad = 1;

    const cliente = this.createFromForm();
    this.libro.cliente = cliente;

    console.log('LIBRO AG ===> ', this.libro);

    this.libroService.create(this.libro).subscribe(res => {
      this.libro = res.body;
      console.log('LIBRO G ===> ', this.libro);

      this.inicializarManoObra();
    });
  }

  guardarManoObra() {
    this.tabSeleccionada = 6;

    for (let i = 0; i < this.manoObras.length; i++) {
      this.manoObraService.create(this.manoObras[i]).subscribe(res => {
        this.manoObras[i] = res.body;
      });
    }
  }

  guardarCostosIndrectos() {
    this.procesarResumen();
    this.tabSeleccionada = 7;

    for (let i = 0; i < this.costosIndirecto.length; i++) {
      this.costosIndirecto[i].libro = this.libro;

      if (this.costosIndirecto[i].cantidad > 0) {
        this.costosIndirectosService.create(this.costosIndirecto[i]).subscribe(res => {
          this.costosIndirecto[i] = res.body;
        });
      }
    }
  }

  procesarResumen() {
    this.totalTripaA = this.tripaA.plancha.precio + this.tripaA.tipoPapel.precio;
    this.totalTripaB = this.tripaB.plancha.precio + this.tripaB.tipoPapel.precio;
    this.totalPortada = this.portada.plancha.precio + this.portada.tipoPapel.precio;
    this.totalOtroFormato = this.otroFormato.plancha.precio + this.otroFormato.tipoPapel.precio;

    this.totalTripaA = this.totalTripaA * this.libro.cantidad;
    this.totalTripaB = this.totalTripaB * this.libro.cantidad;
    this.totalPortada = this.totalPortada * this.libro.cantidad;
    this.totalOtroFormato = this.totalOtroFormato * this.libro.cantidad;

    for (let i = 0; i < this.tintasTripaA.length; i++) {
      this.totalTintaTripaA += this.tintasTripaA[i].tinta.precio;
    }

    this.totalTintaTripaA = this.totalTintaTripaA * this.libro.cantidad;

    for (let i = 0; i < this.tintasTripaB.length; i++) {
      this.totalTintaTripaB += this.tintasTripaB[i].tinta.precio;
    }

    this.totalTintaTripaB = this.totalTintaTripaB * this.libro.cantidad;

    for (let i = 0; i < this.tintasPortada.length; i++) {
      this.totalTintaPortada += this.tintasPortada[i].tinta.precio;
    }

    this.totalTintaPortada = this.totalTintaPortada * this.libro.cantidad;

    for (let i = 0; i < this.tintasOtroFormato.length; i++) {
      this.totalTintaOtroFormto += this.tintasOtroFormato[i].tinta.precio;
    }

    this.totalTintaOtroFormto = this.totalTintaOtroFormto * this.libro.cantidad;

    console.log('this.totalTripaA ======> ', this.totalTripaA);
    console.log('this.totalTripaB ======> ', this.totalTripaB);
    console.log('this.totalPortada ======> ', this.totalPortada);
    console.log('this.totalOtroFormato ======> ', this.totalOtroFormato);

    console.log('this.totalTintaTripaA ======> ', this.totalTintaTripaA);
    console.log('this.totalTintaTripaB ======> ', this.totalTintaTripaB);
    console.log('this.totalTintaPortada ======> ', this.totalTintaPortada);
    console.log('this.totalTintaOtroFormto ======> ', this.totalTintaOtroFormto);

    for (let i = 0; i < this.manoObras.length; i++) {
      const numHoraXTurno = this.manoObras[i].turno * this.manoObras[i].horas;
      const numHoraXDias = numHoraXTurno * this.manoObras[i].dias;
      const numHoraXMes = numHoraXDias * this.manoObras[i].mes;

      this.totalManoObra +=
        numHoraXMes * this.manoObras[i].maquina.precio + this.manoObras[i].horasExtra * this.manoObras[i].maquina.precio;
    }
    console.log('this.totalManoObra ======> ', this.totalManoObra);

    for (let i = 0; i < this.costosIndirecto.length; i++) {
      if (this.costosIndirecto[i].cantidad > 0) {
        const totalPorExtra = this.costosIndirecto[i].cantidad * this.costosIndirecto[i].extra.precio;
        this.totalCostosIndirecto += totalPorExtra;
      }
    }

    console.log('this.totalCostosIndirecto ======> ', this.totalCostosIndirecto);
  }

  inicializarManoObra() {
    if (this.tripaA.maquina) {
      const manoObra = new ManoObra();
      manoObra.libro = this.libro;
      manoObra.maquina = this.tripaA.maquina;
      this.manoObras.push(manoObra);
    }

    if (this.tripaB.maquina) {
      const manoObra = new ManoObra();
      manoObra.libro = this.libro;
      manoObra.maquina = this.tripaB.maquina;
      this.manoObras.push(manoObra);
    }

    if (this.portada.maquina) {
      const manoObra = new ManoObra();
      manoObra.libro = this.libro;
      manoObra.maquina = this.portada.maquina;
      this.manoObras.push(manoObra);
    }

    if (this.otroFormato.maquina) {
      const manoObra = new ManoObra();
      manoObra.libro = this.libro;
      manoObra.maquina = this.otroFormato.maquina;
      this.manoObras.push(manoObra);
    }
  }

  private createFromForm(): ICliente {
    return {
      ...new Cliente(),
      id: this.editForm.get(['id']).value,
      email: this.editForm.get(['email']).value,
      dni: this.editForm.get(['dni']).value,
      tipoDocumento: this.editForm.get(['tipoDocumento']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICliente>>) {
    result.subscribe((res: HttpResponse<ICliente>) => this.onSaveSuccess(res.body), () => this.onSaveError());
  }

  protected onSaveSuccess(clienteGuardado: Cliente) {
    this.isSaving = false;
    this.tabSeleccionada = 2;
    this.updateForm(clienteGuardado);
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackTipoDocumentoById(index: number, item: ITipoDocumento) {
    return item.id;
  }

  validarTabSeleccionada(tabEnCuestion): Boolean {
    if (tabEnCuestion === this.tabSeleccionada) {
      return true;
    } else {
      return false;
    }
  }
}
