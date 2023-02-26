import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Papel } from 'app/shared/model/papel.model';
import { PapelService } from './papel.service';
import { PapelComponent } from './papel.component';
import { PapelDetailComponent } from './papel-detail.component';
import { PapelUpdateComponent } from './papel-update.component';
import { PapelDeletePopupComponent } from './papel-delete-dialog.component';
import { IPapel } from 'app/shared/model/papel.model';

@Injectable({ providedIn: 'root' })
export class PapelResolve implements Resolve<IPapel> {
  constructor(private service: PapelService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPapel> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Papel>) => response.ok),
        map((papel: HttpResponse<Papel>) => papel.body)
      );
    }
    return of(new Papel());
  }
}

export const papelRoute: Routes = [
  {
    path: '',
    component: PapelComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Papels'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PapelDetailComponent,
    resolve: {
      papel: PapelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Papels'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PapelUpdateComponent,
    resolve: {
      papel: PapelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Papels'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PapelUpdateComponent,
    resolve: {
      papel: PapelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Papels'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const papelPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PapelDeletePopupComponent,
    resolve: {
      papel: PapelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Papels'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
