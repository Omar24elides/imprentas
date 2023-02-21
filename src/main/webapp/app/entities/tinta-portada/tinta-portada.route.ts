import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TintaPortada } from 'app/shared/model/tinta-portada.model';
import { TintaPortadaService } from './tinta-portada.service';
import { TintaPortadaComponent } from './tinta-portada.component';
import { TintaPortadaDetailComponent } from './tinta-portada-detail.component';
import { TintaPortadaUpdateComponent } from './tinta-portada-update.component';
import { TintaPortadaDeletePopupComponent } from './tinta-portada-delete-dialog.component';
import { ITintaPortada } from 'app/shared/model/tinta-portada.model';

@Injectable({ providedIn: 'root' })
export class TintaPortadaResolve implements Resolve<ITintaPortada> {
  constructor(private service: TintaPortadaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITintaPortada> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TintaPortada>) => response.ok),
        map((tintaPortada: HttpResponse<TintaPortada>) => tintaPortada.body)
      );
    }
    return of(new TintaPortada());
  }
}

export const tintaPortadaRoute: Routes = [
  {
    path: '',
    component: TintaPortadaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'TintaPortadas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TintaPortadaDetailComponent,
    resolve: {
      tintaPortada: TintaPortadaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TintaPortadas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TintaPortadaUpdateComponent,
    resolve: {
      tintaPortada: TintaPortadaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TintaPortadas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TintaPortadaUpdateComponent,
    resolve: {
      tintaPortada: TintaPortadaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TintaPortadas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tintaPortadaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TintaPortadaDeletePopupComponent,
    resolve: {
      tintaPortada: TintaPortadaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TintaPortadas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
