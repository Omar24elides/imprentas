import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { TintaPortadaComponent } from './tinta-portada.component';
import { TintaPortadaDetailComponent } from './tinta-portada-detail.component';
import { TintaPortadaUpdateComponent } from './tinta-portada-update.component';
import { TintaPortadaDeletePopupComponent, TintaPortadaDeleteDialogComponent } from './tinta-portada-delete-dialog.component';
import { tintaPortadaRoute, tintaPortadaPopupRoute } from './tinta-portada.route';

const ENTITY_STATES = [...tintaPortadaRoute, ...tintaPortadaPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TintaPortadaComponent,
    TintaPortadaDetailComponent,
    TintaPortadaUpdateComponent,
    TintaPortadaDeleteDialogComponent,
    TintaPortadaDeletePopupComponent
  ],
  entryComponents: [TintaPortadaDeleteDialogComponent]
})
export class ImprentaTintaPortadaModule {}
