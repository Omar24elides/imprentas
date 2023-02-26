import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TripaA } from 'app/shared/model/tripa-a.model';
import { TripaAService } from './tripa-a.service';
import { TripaAComponent } from './tripa-a.component';
import { TripaADetailComponent } from './tripa-a-detail.component';
import { TripaAUpdateComponent } from './tripa-a-update.component';
import { TripaADeletePopupComponent } from './tripa-a-delete-dialog.component';
import { ITripaA } from 'app/shared/model/tripa-a.model';

@Injectable({ providedIn: 'root' })
export class TripaAResolve implements Resolve<ITripaA> {
  constructor(private service: TripaAService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITripaA> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<TripaA>) => response.ok),
        map((tripaA: HttpResponse<TripaA>) => tripaA.body)
      );
    }
    return of(new TripaA());
  }
}

export const tripaARoute: Routes = [
  {
    path: '',
    component: TripaAComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TripaAS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: TripaADetailComponent,
    resolve: {
      tripaA: TripaAResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TripaAS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: TripaAUpdateComponent,
    resolve: {
      tripaA: TripaAResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TripaAS'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: TripaAUpdateComponent,
    resolve: {
      tripaA: TripaAResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TripaAS'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const tripaAPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: TripaADeletePopupComponent,
    resolve: {
      tripaA: TripaAResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'TripaAS'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
