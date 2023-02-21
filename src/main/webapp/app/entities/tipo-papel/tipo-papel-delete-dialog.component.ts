import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoPapel } from 'app/shared/model/tipo-papel.model';
import { TipoPapelService } from './tipo-papel.service';

@Component({
  selector: 'jhi-tipo-papel-delete-dialog',
  templateUrl: './tipo-papel-delete-dialog.component.html'
})
export class TipoPapelDeleteDialogComponent {
  tipoPapel: ITipoPapel;

  constructor(protected tipoPapelService: TipoPapelService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.tipoPapelService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'tipoPapelListModification',
        content: 'Deleted an tipoPapel'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-tipo-papel-delete-popup',
  template: ''
})
export class TipoPapelDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ tipoPapel }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(TipoPapelDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.tipoPapel = tipoPapel;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/tipo-papel', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/tipo-papel', { outlets: { popup: null } }]);
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
