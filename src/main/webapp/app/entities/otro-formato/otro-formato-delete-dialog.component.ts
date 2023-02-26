import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IOtroFormato } from 'app/shared/model/otro-formato.model';
import { OtroFormatoService } from './otro-formato.service';

@Component({
  selector: 'jhi-otro-formato-delete-dialog',
  templateUrl: './otro-formato-delete-dialog.component.html'
})
export class OtroFormatoDeleteDialogComponent {
  otroFormato: IOtroFormato;

  constructor(
    protected otroFormatoService: OtroFormatoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.otroFormatoService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'otroFormatoListModification',
        content: 'Deleted an otroFormato'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-otro-formato-delete-popup',
  template: ''
})
export class OtroFormatoDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ otroFormato }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(OtroFormatoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.otroFormato = otroFormato;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/otro-formato', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/otro-formato', { outlets: { popup: null } }]);
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
