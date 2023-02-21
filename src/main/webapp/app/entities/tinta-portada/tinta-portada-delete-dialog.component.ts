import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITintaPortada } from 'app/shared/model/tinta-portada.model';
import { TintaPortadaService } from './tinta-portada.service';

@Component({
  selector: 'jhi-tinta-portada-delete-dialog',
  templateUrl: './tinta-portada-delete-dialog.component.html'
})
export class TintaPortadaDeleteDialogComponent {
  tintaPortada: ITintaPortada;

  constructor(
    protected tintaPortadaService: TintaPortadaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tintaPortadaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tintaPortadaListModification',
        content: 'Deleted an tintaPortada'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tinta-portada-delete-popup',
  template: ''
})
export class TintaPortadaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tintaPortada }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TintaPortadaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tintaPortada = tintaPortada;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tinta-portada', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tinta-portada', { outlets: { popup: null } }]);
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
