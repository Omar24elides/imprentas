import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { OtroFormato } from 'app/shared/model/otro-formato.model';
import { OtroFormatoService } from './otro-formato.service';
import { OtroFormatoComponent } from './otro-formato.component';
import { OtroFormatoDetailComponent } from './otro-formato-detail.component';
import { OtroFormatoUpdateComponent } from './otro-formato-update.component';
import { OtroFormatoDeletePopupComponent } from './otro-formato-delete-dialog.component';
import { IOtroFormato } from 'app/shared/model/otro-formato.model';

@Injectable({ providedIn: 'root' })
export class OtroFormatoResolve implements Resolve<IOtroFormato> {
  constructor(private service: OtroFormatoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IOtroFormato> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<OtroFormato>) => response.ok),
        map((otroFormato: HttpResponse<OtroFormato>) => otroFormato.body)
      );
    }
    return of(new OtroFormato());
  }
}

export const otroFormatoRoute: Routes = [
  {
    path: '',
    component: OtroFormatoComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OtroFormatoes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: OtroFormatoDetailComponent,
    resolve: {
      otroFormato: OtroFormatoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OtroFormatoes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: OtroFormatoUpdateComponent,
    resolve: {
      otroFormato: OtroFormatoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OtroFormatoes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: OtroFormatoUpdateComponent,
    resolve: {
      otroFormato: OtroFormatoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OtroFormatoes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const otroFormatoPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: OtroFormatoDeletePopupComponent,
    resolve: {
      otroFormato: OtroFormatoResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'OtroFormatoes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
