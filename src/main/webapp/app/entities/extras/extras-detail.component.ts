import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IExtras } from 'app/shared/model/extras.model';

@Component({
  selector: 'jhi-extras-detail',
  templateUrl: './extras-detail.component.html'
})
export class ExtrasDetailComponent implements OnInit {
  extras: IExtras;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ extras }) => {
      this.extras = extras;
    });
  }

  previousState() {
    window.history.back();
  }
}
