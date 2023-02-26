import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITinta } from 'app/shared/model/tinta.model';

@Component({
  selector: 'jhi-tinta-detail',
  templateUrl: './tinta-detail.component.html'
})
export class TintaDetailComponent implements OnInit {
  tinta: ITinta;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tinta }) => {
      this.tinta = tinta;
    });
  }

  previousState() {
    window.history.back();
  }
}
