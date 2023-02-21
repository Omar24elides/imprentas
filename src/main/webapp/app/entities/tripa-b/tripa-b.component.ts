import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ITripaB } from 'app/shared/model/tripa-b.model';
import { AccountService } from 'app/core/auth/account.service';
import { TripaBService } from './tripa-b.service';

@Component({
  selector: 'jhi-tripa-b',
  templateUrl: './tripa-b.component.html'
})
export class TripaBComponent implements OnInit, OnDestroy {
  tripaBS: ITripaB[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected tripaBService: TripaBService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.tripaBService
      .query()
      .pipe(
        filter((res: HttpResponse<ITripaB[]>) => res.ok),
        map((res: HttpResponse<ITripaB[]>) => res.body)
      )
      .subscribe((res: ITripaB[]) => {
        this.tripaBS = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTripaBS();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITripaB) {
    return item.id;
  }

  registerChangeInTripaBS() {
    this.eventSubscriber = this.eventManager.subscribe('tripaBListModification', response => this.loadAll());
  }
}
