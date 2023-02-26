import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPortada } from 'app/shared/model/portada.model';
import { PortadaService } from './portada.service';

@Component({
  selector: 'jhi-portada-delete-dialog',
  templateUrl: './portada-delete-dialog.component.html'
})
export class PortadaDeleteDialogComponent {
  portada: IPortada;

  constructor(protected portadaService: PortadaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.portadaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'portadaListModification',
        content: 'Deleted an portada'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-portada-delete-popup',
  template: ''
})
export class PortadaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ portada }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PortadaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.portada = portada;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/portada', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/portada', { outlets: { popup: null } }]);
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
