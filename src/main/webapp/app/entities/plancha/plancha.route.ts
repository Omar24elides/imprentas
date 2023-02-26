import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Plancha } from 'app/shared/model/plancha.model';
import { PlanchaService } from './plancha.service';
import { PlanchaComponent } from './plancha.component';
import { PlanchaDetailComponent } from './plancha-detail.component';
import { PlanchaUpdateComponent } from './plancha-update.component';
import { PlanchaDeletePopupComponent } from './plancha-delete-dialog.component';
import { IPlancha } from 'app/shared/model/plancha.model';

@Injectable({ providedIn: 'root' })
export class PlanchaResolve implements Resolve<IPlancha> {
  constructor(private service: PlanchaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IPlancha> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Plancha>) => response.ok),
        map((plancha: HttpResponse<Plancha>) => plancha.body)
      );
    }
    return of(new Plancha());
  }
}

export const planchaRoute: Routes = [
  {
    path: '',
    component: PlanchaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'Planchas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PlanchaDetailComponent,
    resolve: {
      plancha: PlanchaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Planchas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PlanchaUpdateComponent,
    resolve: {
      plancha: PlanchaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Planchas'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PlanchaUpdateComponent,
    resolve: {
      plancha: PlanchaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Planchas'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const planchaPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: PlanchaDeletePopupComponent,
    resolve: {
      plancha: PlanchaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Planchas'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
