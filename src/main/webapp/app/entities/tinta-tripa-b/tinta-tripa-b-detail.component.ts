import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITintaTripaB } from 'app/shared/model/tinta-tripa-b.model';

@Component({
  selector: 'jhi-tinta-tripa-b-detail',
  templateUrl: './tinta-tripa-b-detail.component.html'
})
export class TintaTripaBDetailComponent implements OnInit {
  tintaTripaB: ITintaTripaB;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tintaTripaB }) => {
      this.tintaTripaB = tintaTripaB;
    });
  }

  previousState() {
    window.history.back();
  }
}
