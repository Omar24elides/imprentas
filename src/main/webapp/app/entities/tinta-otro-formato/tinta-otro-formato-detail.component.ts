import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITintaOtroFormato } from 'app/shared/model/tinta-otro-formato.model';

@Component({
  selector: 'jhi-tinta-otro-formato-detail',
  templateUrl: './tinta-otro-formato-detail.component.html'
})
export class TintaOtroFormatoDetailComponent implements OnInit {
  tintaOtroFormato: ITintaOtroFormato;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tintaOtroFormato }) => {
      this.tintaOtroFormato = tintaOtroFormato;
    });
  }

  previousState() {
    window.history.back();
  }
}
