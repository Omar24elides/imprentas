import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TintaTripaB } from 'app/shared/model/tinta-tripa-b.model';
import { TintaTripaBService } from './tinta-tripa-b.service';
import { TintaTripaBComponent } from './tinta-tripa-b.component';
import { TintaTripaBDetailComponent } from './tinta-tripa-b-detail.component';
import { TintaTripaBUpdateComponent } from './tinta-tripa-b-update.component';
import { TintaTripaBDeletePopupComponent } from './tinta-tripa-b-delete-dialog.component';
import { ITintaTripaB } from 'app/shared/model/tinta-tripa-b.model';

@Injectable({ providedIn: 'root' })
export class TintaTripaBResolve implements Resolve<ITintaTripaB> {
  constructor(private service: TintaTripaBService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITintaTripaB> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TintaTripaB>) => response.ok),
        map((tintaTripaB: HttpResponse<TintaTripaB>) => tintaTripaB.body)
      );
    }
    return of(new TintaTripaB());
  }
}

export const tintaTripaBRoute: Routes = [
  {
    path: '',
    component: TintaTripaBComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'TintaTripaBS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TintaTripaBDetailComponent,
    resolve: {
      tintaTripaB: TintaTripaBResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TintaTripaBS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TintaTripaBUpdateComponent,
    resolve: {
      tintaTripaB: TintaTripaBResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TintaTripaBS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TintaTripaBUpdateComponent,
    resolve: {
      tintaTripaB: TintaTripaBResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TintaTripaBS'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tintaTripaBPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TintaTripaBDeletePopupComponent,
    resolve: {
      tintaTripaB: TintaTripaBResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TintaTripaBS'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
