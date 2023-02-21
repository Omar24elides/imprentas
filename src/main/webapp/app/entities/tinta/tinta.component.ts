import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ITinta } from 'app/shared/model/tinta.model';
import { AccountService } from 'app/core/auth/account.service';
import { TintaService } from './tinta.service';

@Component({
  selector: 'jhi-tinta',
  templateUrl: './tinta.component.html'
})
export class TintaComponent implements OnInit, OnDestroy {
  tintas: ITinta[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected tintaService: TintaService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.tintaService
      .query()
      .pipe(
        filter((res: HttpResponse<ITinta[]>) => res.ok),
        map((res: HttpResponse<ITinta[]>) => res.body)
      )
      .subscribe((res: ITinta[]) => {
        this.tintas = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTintas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITinta) {
    return item.id;
  }

  registerChangeInTintas() {
    this.eventSubscriber = this.eventManager.subscribe('tintaListModification', response => this.loadAll());
  }
}
