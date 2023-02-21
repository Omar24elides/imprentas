import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Tinta } from 'app/shared/model/tinta.model';
import { TintaService } from './tinta.service';
import { TintaComponent } from './tinta.component';
import { TintaDetailComponent } from './tinta-detail.component';
import { TintaUpdateComponent } from './tinta-update.component';
import { TintaDeletePopupComponent } from './tinta-delete-dialog.component';
import { ITinta } from 'app/shared/model/tinta.model';

@Injectable({ providedIn: 'root' })
export class TintaResolve implements Resolve<ITinta> {
  constructor(private service: TintaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITinta> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Tinta>) => response.ok),
        map((tinta: HttpResponse<Tinta>) => tinta.body)
      );
    }
    return of(new Tinta());
  }
}

export const tintaRoute: Routes = [
  {
    path: '',
    component: TintaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tintas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TintaDetailComponent,
    resolve: {
      tinta: TintaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tintas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TintaUpdateComponent,
    resolve: {
      tinta: TintaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tintas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TintaUpdateComponent,
    resolve: {
      tinta: TintaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tintas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tintaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TintaDeletePopupComponent,
    resolve: {
      tinta: TintaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Tintas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
