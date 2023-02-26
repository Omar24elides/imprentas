import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ManoObra } from 'app/shared/model/mano-obra.model';
import { ManoObraService } from './mano-obra.service';
import { ManoObraComponent } from './mano-obra.component';
import { ManoObraDetailComponent } from './mano-obra-detail.component';
import { ManoObraUpdateComponent } from './mano-obra-update.component';
import { ManoObraDeletePopupComponent } from './mano-obra-delete-dialog.component';
import { IManoObra } from 'app/shared/model/mano-obra.model';

@Injectable({ providedIn: 'root' })
export class ManoObraResolve implements Resolve<IManoObra> {
  constructor(private service: ManoObraService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IManoObra> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ManoObra>) => response.ok),
        map((manoObra: HttpResponse<ManoObra>) => manoObra.body)
      );
    }
    return of(new ManoObra());
  }
}

export const manoObraRoute: Routes = [
  {
    path: '',
    component: ManoObraComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ManoObras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ManoObraDetailComponent,
    resolve: {
      manoObra: ManoObraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ManoObras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ManoObraUpdateComponent,
    resolve: {
      manoObra: ManoObraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ManoObras'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ManoObraUpdateComponent,
    resolve: {
      manoObra: ManoObraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ManoObras'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const manoObraPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ManoObraDeletePopupComponent,
    resolve: {
      manoObra: ManoObraResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'ManoObras'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
