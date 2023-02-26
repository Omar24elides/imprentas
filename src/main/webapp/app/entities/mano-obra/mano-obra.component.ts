import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IManoObra } from 'app/shared/model/mano-obra.model';
import { AccountService } from 'app/core/auth/account.service';
import { ManoObraService } from './mano-obra.service';

@Component({
  selector: 'jhi-mano-obra',
  templateUrl: './mano-obra.component.html'
})
export class ManoObraComponent implements OnInit, OnDestroy {
  manoObras: IManoObra[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected manoObraService: ManoObraService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.manoObraService
      .query()
      .pipe(
        filter((res: HttpResponse<IManoObra[]>) => res.ok),
        map((res: HttpResponse<IManoObra[]>) => res.body)
      )
      .subscribe((res: IManoObra[]) => {
        this.manoObras = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInManoObras();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IManoObra) {
    return item.id;
  }

  registerChangeInManoObras() {
    this.eventSubscriber = this.eventManager.subscribe('manoObraListModification', response => this.loadAll());
  }
}
