import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TintaOtroFormato } from 'app/shared/model/tinta-otro-formato.model';
import { TintaOtroFormatoService } from './tinta-otro-formato.service';
import { TintaOtroFormatoComponent } from './tinta-otro-formato.component';
import { TintaOtroFormatoDetailComponent } from './tinta-otro-formato-detail.component';
import { TintaOtroFormatoUpdateComponent } from './tinta-otro-formato-update.component';
import { TintaOtroFormatoDeletePopupComponent } from './tinta-otro-formato-delete-dialog.component';
import { ITintaOtroFormato } from 'app/shared/model/tinta-otro-formato.model';

@Injectable({ providedIn: 'root' })
export class TintaOtroFormatoResolve implements Resolve<ITintaOtroFormato> {
  constructor(private service: TintaOtroFormatoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITintaOtroFormato> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TintaOtroFormato>) => response.ok),
        map((tintaOtroFormato: HttpResponse<TintaOtroFormato>) => tintaOtroFormato.body)
      );
    }
    return of(new TintaOtroFormato());
  }
}

export const tintaOtroFormatoRoute: Routes = [
  {
    path: '',
    component: TintaOtroFormatoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'TintaOtroFormatoes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TintaOtroFormatoDetailComponent,
    resolve: {
      tintaOtroFormato: TintaOtroFormatoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TintaOtroFormatoes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TintaOtroFormatoUpdateComponent,
    resolve: {
      tintaOtroFormato: TintaOtroFormatoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TintaOtroFormatoes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TintaOtroFormatoUpdateComponent,
    resolve: {
      tintaOtroFormato: TintaOtroFormatoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TintaOtroFormatoes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tintaOtroFormatoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TintaOtroFormatoDeletePopupComponent,
    resolve: {
      tintaOtroFormato: TintaOtroFormatoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TintaOtroFormatoes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
