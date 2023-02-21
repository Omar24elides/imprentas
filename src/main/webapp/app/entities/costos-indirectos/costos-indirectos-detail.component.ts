import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ICostosIndirectos } from 'app/shared/model/costos-indirectos.model';

@Component({
  selector: 'jhi-costos-indirectos-detail',
  templateUrl: './costos-indirectos-detail.component.html'
})
export class CostosIndirectosDetailComponent implements OnInit {
  costosIndirectos: ICostosIndirectos;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ costosIndirectos }) => {
      this.costosIndirectos = costosIndirectos;
    });
  }

  previousState() {
    window.history.back();
  }
}
