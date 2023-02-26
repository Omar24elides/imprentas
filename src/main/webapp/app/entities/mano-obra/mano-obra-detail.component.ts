import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IManoObra } from 'app/shared/model/mano-obra.model';

@Component({
  selector: 'jhi-mano-obra-detail',
  templateUrl: './mano-obra-detail.component.html'
})
export class ManoObraDetailComponent implements OnInit {
  manoObra: IManoObra;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ manoObra }) => {
      this.manoObra = manoObra;
    });
  }

  previousState() {
    window.history.back();
  }
}
