import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITripaA } from 'app/shared/model/tripa-a.model';
import { TripaAService } from './tripa-a.service';

@Component({
  selector: 'jhi-tripa-a-delete-dialog',
  templateUrl: './tripa-a-delete-dialog.component.html'
})
export class TripaADeleteDialogComponent {
  tripaA: ITripaA;

  constructor(protected tripaAService: TripaAService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tripaAService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tripaAListModification',
        content: 'Deleted an tripaA'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tripa-a-delete-popup',
  template: ''
})
export class TripaADeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tripaA }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TripaADeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tripaA = tripaA;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tripa-a', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tripa-a', { outlets: { popup: null } }]);
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
