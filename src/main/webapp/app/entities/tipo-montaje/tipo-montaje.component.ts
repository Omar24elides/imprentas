import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoMontaje } from 'app/shared/model/tipo-montaje.model';
import { AccountService } from 'app/core/auth/account.service';
import { TipoMontajeService } from './tipo-montaje.service';

@Component({
  selector: 'jhi-tipo-montaje',
  templateUrl: './tipo-montaje.component.html'
})
export class TipoMontajeComponent implements OnInit, OnDestroy {
  tipoMontajes: ITipoMontaje[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoMontajeService: TipoMontajeService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoMontajeService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoMontaje[]>) => res.ok),
        map((res: HttpResponse<ITipoMontaje[]>) => res.body)
      )
      .subscribe((res: ITipoMontaje[]) => {
        this.tipoMontajes = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoMontajes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoMontaje) {
    return item.id;
  }

  registerChangeInTipoMontajes() {
    this.eventSubscriber = this.eventManager.subscribe('tipoMontajeListModification', response => this.loadAll());
  }
}
