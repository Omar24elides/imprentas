import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ITripaA } from 'app/shared/model/tripa-a.model';
import { AccountService } from 'app/core/auth/account.service';
import { TripaAService } from './tripa-a.service';

@Component({
  selector: 'jhi-tripa-a',
  templateUrl: './tripa-a.component.html'
})
export class TripaAComponent implements OnInit, OnDestroy {
  tripaAS: ITripaA[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected tripaAService: TripaAService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.tripaAService
      .query()
      .pipe(
        filter((res: HttpResponse<ITripaA[]>) => res.ok),
        map((res: HttpResponse<ITripaA[]>) => res.body)
      )
      .subscribe((res: ITripaA[]) => {
        this.tripaAS = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTripaAS();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITripaA) {
    return item.id;
  }

  registerChangeInTripaAS() {
    this.eventSubscriber = this.eventManager.subscribe('tripaAListModification', response => this.loadAll());
  }
}
