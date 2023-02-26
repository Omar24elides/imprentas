import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IOtroFormato } from 'app/shared/model/otro-formato.model';

@Component({
  selector: 'jhi-otro-formato-detail',
  templateUrl: './otro-formato-detail.component.html'
})
export class OtroFormatoDetailComponent implements OnInit {
  otroFormato: IOtroFormato;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ otroFormato }) => {
      this.otroFormato = otroFormato;
    });
  }

  previousState() {
    window.history.back();
  }
}
