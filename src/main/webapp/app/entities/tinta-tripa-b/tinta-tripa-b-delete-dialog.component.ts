import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITintaTripaB } from 'app/shared/model/tinta-tripa-b.model';
import { TintaTripaBService } from './tinta-tripa-b.service';

@Component({
  selector: 'jhi-tinta-tripa-b-delete-dialog',
  templateUrl: './tinta-tripa-b-delete-dialog.component.html'
})
export class TintaTripaBDeleteDialogComponent {
  tintaTripaB: ITintaTripaB;

  constructor(
    protected tintaTripaBService: TintaTripaBService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tintaTripaBService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tintaTripaBListModification',
        content: 'Deleted an tintaTripaB'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tinta-tripa-b-delete-popup',
  template: ''
})
export class TintaTripaBDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tintaTripaB }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TintaTripaBDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tintaTripaB = tintaTripaB;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tinta-tripa-b', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tinta-tripa-b', { outlets: { popup: null } }]);
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
