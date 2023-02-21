import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TripaB } from 'app/shared/model/tripa-b.model';
import { TripaBService } from './tripa-b.service';
import { TripaBComponent } from './tripa-b.component';
import { TripaBDetailComponent } from './tripa-b-detail.component';
import { TripaBUpdateComponent } from './tripa-b-update.component';
import { TripaBDeletePopupComponent } from './tripa-b-delete-dialog.component';
import { ITripaB } from 'app/shared/model/tripa-b.model';

@Injectable({ providedIn: 'root' })
export class TripaBResolve implements Resolve<ITripaB> {
  constructor(private service: TripaBService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITripaB> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TripaB>) => response.ok),
        map((tripaB: HttpResponse<TripaB>) => tripaB.body)
      );
    }
    return of(new TripaB());
  }
}

export const tripaBRoute: Routes = [
  {
    path: '',
    component: TripaBComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TripaBS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TripaBDetailComponent,
    resolve: {
      tripaB: TripaBResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TripaBS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TripaBUpdateComponent,
    resolve: {
      tripaB: TripaBResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TripaBS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TripaBUpdateComponent,
    resolve: {
      tripaB: TripaBResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TripaBS'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tripaBPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TripaBDeletePopupComponent,
    resolve: {
      tripaB: TripaBResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TripaBS'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
