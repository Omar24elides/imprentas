import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITintaTripaA } from 'app/shared/model/tinta-tripa-a.model';
import { TintaTripaAService } from './tinta-tripa-a.service';

@Component({
  selector: 'jhi-tinta-tripa-a-delete-dialog',
  templateUrl: './tinta-tripa-a-delete-dialog.component.html'
})
export class TintaTripaADeleteDialogComponent {
  tintaTripaA: ITintaTripaA;

  constructor(
    protected tintaTripaAService: TintaTripaAService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tintaTripaAService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tintaTripaAListModification',
        content: 'Deleted an tintaTripaA'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tinta-tripa-a-delete-popup',
  template: ''
})
export class TintaTripaADeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tintaTripaA }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TintaTripaADeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tintaTripaA = tintaTripaA;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tinta-tripa-a', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tinta-tripa-a', { outlets: { popup: null } }]);
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
