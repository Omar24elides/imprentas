import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TipoPapel } from 'app/shared/model/tipo-papel.model';
import { TipoPapelService } from './tipo-papel.service';
import { TipoPapelComponent } from './tipo-papel.component';
import { TipoPapelDetailComponent } from './tipo-papel-detail.component';
import { TipoPapelUpdateComponent } from './tipo-papel-update.component';
import { TipoPapelDeletePopupComponent } from './tipo-papel-delete-dialog.component';
import { ITipoPapel } from 'app/shared/model/tipo-papel.model';

@Injectable({ providedIn: 'root' })
export class TipoPapelResolve implements Resolve<ITipoPapel> {
  constructor(private service: TipoPapelService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITipoPapel> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TipoPapel>) => response.ok),
        map((tipoPapel: HttpResponse<TipoPapel>) => tipoPapel.body)
      );
    }
    return of(new TipoPapel());
  }
}

export const tipoPapelRoute: Routes = [
  {
    path: '',
    component: TipoPapelComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoPapels'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TipoPapelDetailComponent,
    resolve: {
      tipoPapel: TipoPapelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoPapels'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TipoPapelUpdateComponent,
    resolve: {
      tipoPapel: TipoPapelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoPapels'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TipoPapelUpdateComponent,
    resolve: {
      tipoPapel: TipoPapelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoPapels'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tipoPapelPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TipoPapelDeletePopupComponent,
    resolve: {
      tipoPapel: TipoPapelResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TipoPapels'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
