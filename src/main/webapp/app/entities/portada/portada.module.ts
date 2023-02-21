import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { PortadaComponent } from './portada.component';
import { PortadaDetailComponent } from './portada-detail.component';
import { PortadaUpdateComponent } from './portada-update.component';
import { PortadaDeletePopupComponent, PortadaDeleteDialogComponent } from './portada-delete-dialog.component';
import { portadaRoute, portadaPopupRoute } from './portada.route';

const ENTITY_STATES = [...portadaRoute, ...portadaPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PortadaComponent,
    PortadaDetailComponent,
    PortadaUpdateComponent,
    PortadaDeleteDialogComponent,
    PortadaDeletePopupComponent
  ],
  entryComponents: [PortadaDeleteDialogComponent]
})
export class ImprentaPortadaModule {}
