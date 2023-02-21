import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CostosIndirectos } from 'app/shared/model/costos-indirectos.model';
import { CostosIndirectosService } from './costos-indirectos.service';
import { CostosIndirectosComponent } from './costos-indirectos.component';
import { CostosIndirectosDetailComponent } from './costos-indirectos-detail.component';
import { CostosIndirectosUpdateComponent } from './costos-indirectos-update.component';
import { CostosIndirectosDeletePopupComponent } from './costos-indirectos-delete-dialog.component';
import { ICostosIndirectos } from 'app/shared/model/costos-indirectos.model';

@Injectable({ providedIn: 'root' })
export class CostosIndirectosResolve implements Resolve<ICostosIndirectos> {
  constructor(private service: CostosIndirectosService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ICostosIndirectos> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<CostosIndirectos>) => response.ok),
        map((costosIndirectos: HttpResponse<CostosIndirectos>) => costosIndirectos.body)
      );
    }
    return of(new CostosIndirectos());
  }
}

export const costosIndirectosRoute: Routes = [
  {
    path: '',
    component: CostosIndirectosComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostosIndirectos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CostosIndirectosDetailComponent,
    resolve: {
      costosIndirectos: CostosIndirectosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostosIndirectos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CostosIndirectosUpdateComponent,
    resolve: {
      costosIndirectos: CostosIndirectosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostosIndirectos'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CostosIndirectosUpdateComponent,
    resolve: {
      costosIndirectos: CostosIndirectosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostosIndirectos'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const costosIndirectosPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: CostosIndirectosDeletePopupComponent,
    resolve: {
      costosIndirectos: CostosIndirectosResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'CostosIndirectos'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
