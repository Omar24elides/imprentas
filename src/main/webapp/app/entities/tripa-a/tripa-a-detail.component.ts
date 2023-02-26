import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITripaA } from 'app/shared/model/tripa-a.model';

@Component({
  selector: 'jhi-tripa-a-detail',
  templateUrl: './tripa-a-detail.component.html'
})
export class TripaADetailComponent implements OnInit {
  tripaA: ITripaA;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tripaA }) => {
      this.tripaA = tripaA;
    });
  }

  previousState() {
    window.history.back();
  }
}
