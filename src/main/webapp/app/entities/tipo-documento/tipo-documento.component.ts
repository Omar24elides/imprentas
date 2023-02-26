import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ITipoDocumento } from 'app/shared/model/tipo-documento.model';
import { AccountService } from 'app/core/auth/account.service';
import { TipoDocumentoService } from './tipo-documento.service';

@Component({
  selector: 'jhi-tipo-documento',
  templateUrl: './tipo-documento.component.html'
})
export class TipoDocumentoComponent implements OnInit, OnDestroy {
  tipoDocumentos: ITipoDocumento[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected tipoDocumentoService: TipoDocumentoService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.tipoDocumentoService
      .query()
      .pipe(
        filter((res: HttpResponse<ITipoDocumento[]>) => res.ok),
        map((res: HttpResponse<ITipoDocumento[]>) => res.body)
      )
      .subscribe((res: ITipoDocumento[]) => {
        this.tipoDocumentos = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInTipoDocumentos();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ITipoDocumento) {
    return item.id;
  }

  registerChangeInTipoDocumentos() {
    this.eventSubscriber = this.eventManager.subscribe('tipoDocumentoListModification', response => this.loadAll());
  }
}
