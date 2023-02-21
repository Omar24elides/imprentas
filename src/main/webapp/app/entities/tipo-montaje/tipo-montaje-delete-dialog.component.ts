import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoMontaje } from 'app/shared/model/tipo-montaje.model';
import { TipoMontajeService } from './tipo-montaje.service';

@Component({
  selector: 'jhi-tipo-montaje-delete-dialog',
  templateUrl: './tipo-montaje-delete-dialog.component.html'
})
export class TipoMontajeDeleteDialogComponent {
  tipoMontaje: ITipoMontaje;

  constructor(
    protected tipoMontajeService: TipoMontajeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoMontajeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoMontajeListModification',
        content: 'Deleted an tipoMontaje'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-montaje-delete-popup',
  template: ''
})
export class TipoMontajeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoMontaje }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoMontajeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoMontaje = tipoMontaje;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-montaje', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-montaje', { outlets: { popup: null } }]);
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
