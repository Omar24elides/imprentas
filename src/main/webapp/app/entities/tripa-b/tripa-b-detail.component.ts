import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITripaB } from 'app/shared/model/tripa-b.model';

@Component({
  selector: 'jhi-tripa-b-detail',
  templateUrl: './tripa-b-detail.component.html'
})
export class TripaBDetailComponent implements OnInit {
  tripaB: ITripaB;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tripaB }) => {
      this.tripaB = tripaB;
    });
  }

  previousState() {
    window.history.back();
  }
}
