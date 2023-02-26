import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IManoObra } from 'app/shared/model/mano-obra.model';
import { ManoObraService } from './mano-obra.service';

@Component({
  selector: 'jhi-mano-obra-delete-dialog',
  templateUrl: './mano-obra-delete-dialog.component.html'
})
export class ManoObraDeleteDialogComponent {
  manoObra: IManoObra;

  constructor(protected manoObraService: ManoObraService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.manoObraService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'manoObraListModification',
        content: 'Deleted an manoObra'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-mano-obra-delete-popup',
  template: ''
})
export class ManoObraDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ manoObra }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ManoObraDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.manoObra = manoObra;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/mano-obra', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/mano-obra', { outlets: { popup: null } }]);
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
