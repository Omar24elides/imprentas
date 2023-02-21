import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ICostosIndirectos } from 'app/shared/model/costos-indirectos.model';
import { AccountService } from 'app/core/auth/account.service';
import { CostosIndirectosService } from './costos-indirectos.service';

@Component({
  selector: 'jhi-costos-indirectos',
  templateUrl: './costos-indirectos.component.html'
})
export class CostosIndirectosComponent implements OnInit, OnDestroy {
  costosIndirectos: ICostosIndirectos[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected costosIndirectosService: CostosIndirectosService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.costosIndirectosService
      .query()
      .pipe(
        filter((res: HttpResponse<ICostosIndirectos[]>) => res.ok),
        map((res: HttpResponse<ICostosIndirectos[]>) => res.body)
      )
      .subscribe((res: ICostosIndirectos[]) => {
        this.costosIndirectos = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInCostosIndirectos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICostosIndirectos) {
    return item.id;
  }

  registerChangeInCostosIndirectos() {
    this.eventSubscriber = this.eventManager.subscribe('costosIndirectosListModification', response => this.loadAll());
  }
}
