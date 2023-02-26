import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IMaquina } from 'app/shared/model/maquina.model';
import { AccountService } from 'app/core/auth/account.service';
import { MaquinaService } from './maquina.service';

@Component({
  selector: 'jhi-maquina',
  templateUrl: './maquina.component.html'
})
export class MaquinaComponent implements OnInit, OnDestroy {
  maquinas: IMaquina[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected maquinaService: MaquinaService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.maquinaService
      .query()
      .pipe(
        filter((res: HttpResponse<IMaquina[]>) => res.ok),
        map((res: HttpResponse<IMaquina[]>) => res.body)
      )
      .subscribe((res: IMaquina[]) => {
        this.maquinas = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInMaquinas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IMaquina) {
    return item.id;
  }

  registerChangeInMaquinas() {
    this.eventSubscriber = this.eventManager.subscribe('maquinaListModification', response => this.loadAll());
  }
}
