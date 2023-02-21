import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITintaOtroFormato } from 'app/shared/model/tinta-otro-formato.model';
import { TintaOtroFormatoService } from './tinta-otro-formato.service';

@Component({
  selector: 'jhi-tinta-otro-formato-delete-dialog',
  templateUrl: './tinta-otro-formato-delete-dialog.component.html'
})
export class TintaOtroFormatoDeleteDialogComponent {
  tintaOtroFormato: ITintaOtroFormato;

  constructor(
    protected tintaOtroFormatoService: TintaOtroFormatoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tintaOtroFormatoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tintaOtroFormatoListModification',
        content: 'Deleted an tintaOtroFormato'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tinta-otro-formato-delete-popup',
  template: ''
})
export class TintaOtroFormatoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tintaOtroFormato }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TintaOtroFormatoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tintaOtroFormato = tintaOtroFormato;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tinta-otro-formato', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tinta-otro-formato', { outlets: { popup: null } }]);
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
