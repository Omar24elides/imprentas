import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPlancha } from 'app/shared/model/plancha.model';
import { PlanchaService } from './plancha.service';

@Component({
  selector: 'jhi-plancha-delete-dialog',
  templateUrl: './plancha-delete-dialog.component.html'
})
export class PlanchaDeleteDialogComponent {
  plancha: IPlancha;

  constructor(protected planchaService: PlanchaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.planchaService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'planchaListModification',
        content: 'Deleted an plancha'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-plancha-delete-popup',
  template: ''
})
export class PlanchaDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ plancha }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PlanchaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.plancha = plancha;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/plancha', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/plancha', { outlets: { popup: null } }]);
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
