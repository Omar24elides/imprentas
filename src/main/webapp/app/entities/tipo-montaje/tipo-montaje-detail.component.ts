import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoMontaje } from 'app/shared/model/tipo-montaje.model';

@Component({
  selector: 'jhi-tipo-montaje-detail',
  templateUrl: './tipo-montaje-detail.component.html'
})
export class TipoMontajeDetailComponent implements OnInit {
  tipoMontaje: ITipoMontaje;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoMontaje }) => {
      this.tipoMontaje = tipoMontaje;
    });
  }

  previousState() {
    window.history.back();
  }
}
