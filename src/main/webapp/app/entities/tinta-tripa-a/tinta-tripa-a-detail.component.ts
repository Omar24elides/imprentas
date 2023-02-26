import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITintaTripaA } from 'app/shared/model/tinta-tripa-a.model';

@Component({
  selector: 'jhi-tinta-tripa-a-detail',
  templateUrl: './tinta-tripa-a-detail.component.html'
})
export class TintaTripaADetailComponent implements OnInit {
  tintaTripaA: ITintaTripaA;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tintaTripaA }) => {
      this.tintaTripaA = tintaTripaA;
    });
  }

  previousState() {
    window.history.back();
  }
}
