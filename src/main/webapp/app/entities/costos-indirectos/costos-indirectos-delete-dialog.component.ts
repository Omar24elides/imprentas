import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICostosIndirectos } from 'app/shared/model/costos-indirectos.model';
import { CostosIndirectosService } from './costos-indirectos.service';

@Component({
  selector: 'jhi-costos-indirectos-delete-dialog',
  templateUrl: './costos-indirectos-delete-dialog.component.html'
})
export class CostosIndirectosDeleteDialogComponent {
  costosIndirectos: ICostosIndirectos;

  constructor(
    protected costosIndirectosService: CostosIndirectosService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.costosIndirectosService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'costosIndirectosListModification',
        content: 'Deleted an costosIndirectos'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-costos-indirectos-delete-popup',
  template: ''
})
export class CostosIndirectosDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ costosIndirectos }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(CostosIndirectosDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.costosIndirectos = costosIndirectos;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/costos-indirectos', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/costos-indirectos', { outlets: { popup: null } }]);
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
