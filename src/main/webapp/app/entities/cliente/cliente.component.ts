import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ICliente } from 'app/shared/model/cliente.model';
import { AccountService } from 'app/core/auth/account.service';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'jhi-cliente',
  templateUrl: './cliente.component.html'
})
export class ClienteComponent implements OnInit, OnDestroy {
  clientes: ICliente[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected clienteService: ClienteService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.clienteService
      .query()
      .pipe(
        filter((res: HttpResponse<ICliente[]>) => res.ok),
        map((res: HttpResponse<ICliente[]>) => res.body)
      )
      .subscribe((res: ICliente[]) => {
        this.clientes = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInClientes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ICliente) {
    return item.id;
  }

  registerChangeInClientes() {
    this.eventSubscriber = this.eventManager.subscribe('clienteListModification', response => this.loadAll());
  }
}
