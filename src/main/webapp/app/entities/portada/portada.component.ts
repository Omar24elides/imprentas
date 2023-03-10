import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IPortada } from 'app/shared/model/portada.model';
import { AccountService } from 'app/core/auth/account.service';
import { PortadaService } from './portada.service';

@Component({
  selector: 'jhi-portada',
  templateUrl: './portada.component.html'
})
export class PortadaComponent implements OnInit, OnDestroy {
  portadas: IPortada[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected portadaService: PortadaService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.portadaService
      .query()
      .pipe(
        filter((res: HttpResponse<IPortada[]>) => res.ok),
        map((res: HttpResponse<IPortada[]>) => res.body)
      )
      .subscribe((res: IPortada[]) => {
        this.portadas = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInPortadas();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IPortada) {
    return item.id;
  }

  registerChangeInPortadas() {
    this.eventSubscriber = this.eventManager.subscribe('portadaListModification', response => this.loadAll());
  }
}
