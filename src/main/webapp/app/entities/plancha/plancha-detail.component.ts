import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPlancha } from 'app/shared/model/plancha.model';

@Component({
  selector: 'jhi-plancha-detail',
  templateUrl: './plancha-detail.component.html'
})
export class PlanchaDetailComponent implements OnInit {
  plancha: IPlancha;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ plancha }) => {
      this.plancha = plancha;
    });
  }

  previousState() {
    window.history.back();
  }
}
