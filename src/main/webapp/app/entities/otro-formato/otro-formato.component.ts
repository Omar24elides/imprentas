import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { IOtroFormato } from 'app/shared/model/otro-formato.model';
import { AccountService } from 'app/core/auth/account.service';
import { OtroFormatoService } from './otro-formato.service';

@Component({
  selector: 'jhi-otro-formato',
  templateUrl: './otro-formato.component.html'
})
export class OtroFormatoComponent implements OnInit, OnDestroy {
  otroFormatoes: IOtroFormato[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected otroFormatoService: OtroFormatoService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.otroFormatoService
      .query()
      .pipe(
        filter((res: HttpResponse<IOtroFormato[]>) => res.ok),
        map((res: HttpResponse<IOtroFormato[]>) => res.body)
      )
      .subscribe((res: IOtroFormato[]) => {
        this.otroFormatoes = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInOtroFormatoes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IOtroFormato) {
    return item.id;
  }

  registerChangeInOtroFormatoes() {
    this.eventSubscriber = this.eventManager.subscribe('otroFormatoListModification', response => this.loadAll());
  }
}
