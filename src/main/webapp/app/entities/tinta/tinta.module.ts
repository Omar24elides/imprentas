import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { TintaComponent } from './tinta.component';
import { TintaDetailComponent } from './tinta-detail.component';
import { TintaUpdateComponent } from './tinta-update.component';
import { TintaDeletePopupComponent, TintaDeleteDialogComponent } from './tinta-delete-dialog.component';
import { tintaRoute, tintaPopupRoute } from './tinta.route';

const ENTITY_STATES = [...tintaRoute, ...tintaPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TintaComponent, TintaDetailComponent, TintaUpdateComponent, TintaDeleteDialogComponent, TintaDeletePopupComponent],
  entryComponents: [TintaDeleteDialogComponent]
})
export class ImprentaTintaModule {}
