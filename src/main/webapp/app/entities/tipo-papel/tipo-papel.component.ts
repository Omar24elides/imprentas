import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoPapel } from 'app/shared/model/tipo-papel.model';
import { AccountService } from 'app/core/auth/account.service';
import { TipoPapelService } from './tipo-papel.service';

@Component({
  selector: 'jhi-tipo-papel',
  templateUrl: './tipo-papel.component.html'
})
export class TipoPapelComponent implements OnInit, OnDestroy {
  tipoPapels: ITipoPapel[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoPapelService: TipoPapelService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoPapelService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoPapel[]>) => res.ok),
        map((res: HttpResponse<ITipoPapel[]>) => res.body)
      )
      .subscribe((res: ITipoPapel[]) => {
        this.tipoPapels = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoPapels();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoPapel) {
    return item.id;
  }

  registerChangeInTipoPapels() {
    this.eventSubscriber = this.eventManager.subscribe('tipoPapelListModification', response => this.loadAll());
  }
}
