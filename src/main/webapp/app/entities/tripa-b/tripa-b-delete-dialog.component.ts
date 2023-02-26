import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITripaB } from 'app/shared/model/tripa-b.model';
import { TripaBService } from './tripa-b.service';

@Component({
  selector: 'jhi-tripa-b-delete-dialog',
  templateUrl: './tripa-b-delete-dialog.component.html'
})
export class TripaBDeleteDialogComponent {
  tripaB: ITripaB;

  constructor(protected tripaBService: TripaBService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tripaBService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tripaBListModification',
        content: 'Deleted an tripaB'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tripa-b-delete-popup',
  template: ''
})
export class TripaBDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tripaB }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TripaBDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tripaB = tripaB;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tripa-b', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tripa-b', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
