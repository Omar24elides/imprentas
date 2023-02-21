import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IExtras } from 'app/shared/model/extras.model';
import { ExtrasService } from './extras.service';

@Component({
  selector: 'jhi-extras-delete-dialog',
  templateUrl: './extras-delete-dialog.component.html'
})
export class ExtrasDeleteDialogComponent {
  extras: IExtras;

  constructor(protected extrasService: ExtrasService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.extrasService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'extrasListModification',
        content: 'Deleted an extras'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-extras-delete-popup',
  template: ''
})
export class ExtrasDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ extras }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ExtrasDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.extras = extras;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/extras', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/extras', { outlets: { popup: null } }]);
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
