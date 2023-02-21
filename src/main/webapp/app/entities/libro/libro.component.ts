import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { filter, map } from 'rxjs/operators';
import { JhiEventManager } from 'ng-jhipster';

import { ILibro } from 'app/shared/model/libro.model';
import { AccountService } from 'app/core/auth/account.service';
import { LibroService } from './libro.service';

@Component({
  selector: 'jhi-libro',
  templateUrl: './libro.component.html'
})
export class LibroComponent implements OnInit, OnDestroy {
  libros: ILibro[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(protected libroService: LibroService, protected eventManager: JhiEventManager, protected accountService: AccountService) {}

  loadAll() {
    this.libroService
      .query()
      .pipe(
        filter((res: HttpResponse<ILibro[]>) => res.ok),
        map((res: HttpResponse<ILibro[]>) => res.body)
      )
      .subscribe((res: ILibro[]) => {
        this.libros = res;
      });
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().subscribe(account => {
      this.currentAccount = account;
    });
    this.registerChangeInLibros();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: ILibro) {
    return item.id;
  }

  registerChangeInLibros() {
    this.eventSubscriber = this.eventManager.subscribe('libroListModification', response => this.loadAll());
  }
}
