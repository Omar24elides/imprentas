import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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

import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as moment from 'moment';

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

  openPDF(): void {
    const PDF = new jsPDF('landscape', 'mm', 'a4');



    const image = "data:image/png;base64,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";
    PDF.addImage(image, 'png', 15, 5, 35, 20);
    PDF.text("Fecha: "+moment().format("DD/MM/YY"), 244, 10);


    PDF.text("FUNDACION IMPRENTA DE LA CULTURA", 95, 10);
    PDF.text("Presupuesto", 135, 15);

    PDF.text("Firma: ", 230, 100);
    
    PDF.setDrawColor(0, 0, 0);
    PDF.line(200, 125, 280, 125);


    PDF.autoTable({
      startX: 30,
      startY: 30,
      head: [
          ['Tripa A', 'Tripa B', 'Portada', 'Otro formato', 'Tinta tripa A', 'Tinta tripa B', 'Tinta portada', 'Tinta otro formato', 'Mano de obra', 'Costos indirectos', 'Total']
      ],
      body: [
          [this.totalTripaA.toFixed(2), this.totalTripaB.toFixed(2), this.totalPortada.toFixed(2), this.totalOtroFormato.toFixed(2), this.totalTintaTripaA.toFixed(2), this.totalTintaTripaB.toFixed(2), this.totalTintaPortada.toFixed(2), this.totalTintaOtroFormto.toFixed(2), this.totalManoObra.toFixed(2), this.totalCostosIndirecto.toFixed(2),
            (this.totalTripaA +
            this.totalTripaB +
            this.totalPortada +
            this.totalOtroFormato +
            this.totalTintaTripaA +
            this.totalTintaTripaB +
            this.totalTintaPortada +
            this.totalTintaOtroFormto +
            this.totalManoObra +
            this.totalCostosIndirecto).toFixed(2)]
      ]
    });


    PDF.text("Presupuesto valido por 5 dias", 15, 50);
    
    PDF.save('resumen.pdf');
  }

  refresh(){
    window.location.reload();
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
