import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMaquina } from 'app/shared/model/maquina.model';
import { MaquinaService } from './maquina.service';

@Component({
  selector: 'jhi-maquina-delete-dialog',
  templateUrl: './maquina-delete-dialog.component.html'
})
export class MaquinaDeleteDialogComponent {
  maquina: IMaquina;

  constructor(protected maquinaService: MaquinaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.maquinaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'maquinaListModification',
        content: 'Deleted an maquina'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-maquina-delete-popup',
  template: ''
})
export class MaquinaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ maquina }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(MaquinaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.maquina = maquina;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/maquina', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/maquina', { outlets: { popup: null } }]);
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
