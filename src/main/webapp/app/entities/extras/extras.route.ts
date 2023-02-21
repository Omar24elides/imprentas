import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Extras } from 'app/shared/model/extras.model';
import { ExtrasService } from './extras.service';
import { ExtrasComponent } from './extras.component';
import { ExtrasDetailComponent } from './extras-detail.component';
import { ExtrasUpdateComponent } from './extras-update.component';
import { ExtrasDeletePopupComponent } from './extras-delete-dialog.component';
import { IExtras } from 'app/shared/model/extras.model';

@Injectable({ providedIn: 'root' })
export class ExtrasResolve implements Resolve<IExtras> {
  constructor(private service: ExtrasService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IExtras> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Extras>) => response.ok),
        map((extras: HttpResponse<Extras>) => extras.body)
      );
    }
    return of(new Extras());
  }
}

export const extrasRoute: Routes = [
  {
    path: '',
    component: ExtrasComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Extras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ExtrasDetailComponent,
    resolve: {
      extras: ExtrasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Extras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ExtrasUpdateComponent,
    resolve: {
      extras: ExtrasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Extras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ExtrasUpdateComponent,
    resolve: {
      extras: ExtrasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Extras'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const extrasPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ExtrasDeletePopupComponent,
    resolve: {
      extras: ExtrasResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'Extras'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
