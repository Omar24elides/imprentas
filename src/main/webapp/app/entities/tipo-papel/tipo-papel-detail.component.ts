import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoPapel } from 'app/shared/model/tipo-papel.model';

@Component({
  selector: 'jhi-tipo-papel-detail',
  templateUrl: './tipo-papel-detail.component.html'
})
export class TipoPapelDetailComponent implements OnInit {
  tipoPapel: ITipoPapel;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoPapel }) => {
      this.tipoPapel = tipoPapel;
    });
  }

  previousState() {
    window.history.back();
  }
}
