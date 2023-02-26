import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TintaTripaA } from 'app/shared/model/tinta-tripa-a.model';
import { TintaTripaAService } from './tinta-tripa-a.service';
import { TintaTripaAComponent } from './tinta-tripa-a.component';
import { TintaTripaADetailComponent } from './tinta-tripa-a-detail.component';
import { TintaTripaAUpdateComponent } from './tinta-tripa-a-update.component';
import { TintaTripaADeletePopupComponent } from './tinta-tripa-a-delete-dialog.component';
import { ITintaTripaA } from 'app/shared/model/tinta-tripa-a.model';

@Injectable({ providedIn: 'root' })
export class TintaTripaAResolve implements Resolve<ITintaTripaA> {
  constructor(private service: TintaTripaAService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITintaTripaA> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TintaTripaA>) => response.ok),
        map((tintaTripaA: HttpResponse<TintaTripaA>) => tintaTripaA.body)
      );
    }
    return of(new TintaTripaA());
  }
}

export const tintaTripaARoute: Routes = [
  {
    path: '',
    component: TintaTripaAComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'TintaTripaAS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TintaTripaADetailComponent,
    resolve: {
      tintaTripaA: TintaTripaAResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TintaTripaAS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TintaTripaAUpdateComponent,
    resolve: {
      tintaTripaA: TintaTripaAResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TintaTripaAS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TintaTripaAUpdateComponent,
    resolve: {
      tintaTripaA: TintaTripaAResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TintaTripaAS'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tintaTripaAPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TintaTripaADeletePopupComponent,
    resolve: {
      tintaTripaA: TintaTripaAResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TintaTripaAS'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
