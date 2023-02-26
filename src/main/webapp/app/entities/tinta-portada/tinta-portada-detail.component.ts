import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITintaPortada } from 'app/shared/model/tinta-portada.model';

@Component({
  selector: 'jhi-tinta-portada-detail',
  templateUrl: './tinta-portada-detail.component.html'
})
export class TintaPortadaDetailComponent implements OnInit {
  tintaPortada: ITintaPortada;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tintaPortada }) => {
      this.tintaPortada = tintaPortada;
    });
  }

  previousState() {
    window.history.back();
  }
}
