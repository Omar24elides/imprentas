import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITinta } from 'app/shared/model/tinta.model';
import { TintaService } from './tinta.service';

@Component({
  selector: 'jhi-tinta-delete-dialog',
  templateUrl: './tinta-delete-dialog.component.html'
})
export class TintaDeleteDialogComponent {
  tinta: ITinta;

  constructor(protected tintaService: TintaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tintaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tintaListModification',
        content: 'Deleted an tinta'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tinta-delete-popup',
  template: ''
})
export class TintaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tinta }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TintaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tinta = tinta;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tinta', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tinta', { outlets: { popup: null } }]);
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
