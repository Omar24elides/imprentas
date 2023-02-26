import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { CostosIndirectosComponent } from './costos-indirectos.component';
import { CostosIndirectosDetailComponent } from './costos-indirectos-detail.component';
import { CostosIndirectosUpdateComponent } from './costos-indirectos-update.component';
import { CostosIndirectosDeletePopupComponent, CostosIndirectosDeleteDialogComponent } from './costos-indirectos-delete-dialog.component';
import { costosIndirectosRoute, costosIndirectosPopupRoute } from './costos-indirectos.route';

const ENTITY_STATES = [...costosIndirectosRoute, ...costosIndirectosPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    CostosIndirectosComponent,
    CostosIndirectosDetailComponent,
    CostosIndirectosUpdateComponent,
    CostosIndirectosDeleteDialogComponent,
    CostosIndirectosDeletePopupComponent
  ],
  entryComponents: [CostosIndirectosDeleteDialogComponent]
})
export class ImprentaCostosIndirectosModule {}
