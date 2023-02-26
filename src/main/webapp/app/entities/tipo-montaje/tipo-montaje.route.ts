import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoMontaje } from 'app/shared/model/tipo-montaje.model';
import { TipoMontajeService } from './tipo-montaje.service';
import { TipoMontajeComponent } from './tipo-montaje.component';
import { TipoMontajeDetailComponent } from './tipo-montaje-detail.component';
import { TipoMontajeUpdateComponent } from './tipo-montaje-update.component';
import { TipoMontajeDeletePopupComponent } from './tipo-montaje-delete-dialog.component';
import { ITipoMontaje } from 'app/shared/model/tipo-montaje.model';

@Injectable({ providedIn: 'root' })
export class TipoMontajeResolve implements Resolve<ITipoMontaje> {
  constructor(private service: TipoMontajeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoMontaje> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoMontaje>) => response.ok),
        map((tipoMontaje: HttpResponse<TipoMontaje>) => tipoMontaje.body)
      );
    }
    return of(new TipoMontaje());
  }
}

export const tipoMontajeRoute: Routes = [
  {
    path: '',
    component: TipoMontajeComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoMontajes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoMontajeDetailComponent,
    resolve: {
      tipoMontaje: TipoMontajeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoMontajes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoMontajeUpdateComponent,
    resolve: {
      tipoMontaje: TipoMontajeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoMontajes'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoMontajeUpdateComponent,
    resolve: {
      tipoMontaje: TipoMontajeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoMontajes'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoMontajePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoMontajeDeletePopupComponent,
    resolve: {
      tipoMontaje: TipoMontajeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoMontajes'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
