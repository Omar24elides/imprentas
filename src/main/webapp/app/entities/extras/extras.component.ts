import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IExtras } from 'app/shared/model/extras.model';
import { AccountService } from 'app/core/auth/account.service';
import { ExtrasService } from './extras.service';

@Component({
  selector: 'jhi-extras',
  templateUrl: './extras.component.html'
})
export class ExtrasComponent implements OnInit, OnDestroy {
  extras: IExtras[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected extrasService: ExtrasService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.extrasService
      .query()
      .pipe(
        filter((res: HttpResponse<IExtras[]>) => res.ok),
        map((res: HttpResponse<IExtras[]>) => res.body)
      )
      .subscribe((res: IExtras[]) => {
        this.extras = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInExtras();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IExtras) {
    return item.id;
  }

  registerChangeInExtras() {
    this.eventSubscriber = this.eventManager.subscribe('extrasListModification', response => this.loadAll());
  }
}
