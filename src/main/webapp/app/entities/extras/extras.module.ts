import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { ExtrasComponent } from './extras.component';
import { ExtrasDetailComponent } from './extras-detail.component';
import { ExtrasUpdateComponent } from './extras-update.component';
import { ExtrasDeletePopupComponent, ExtrasDeleteDialogComponent } from './extras-delete-dialog.component';
import { extrasRoute, extrasPopupRoute } from './extras.route';

const ENTITY_STATES = [...extrasRoute, ...extrasPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ExtrasComponent, ExtrasDetailComponent, ExtrasUpdateComponent, ExtrasDeleteDialogComponent, ExtrasDeletePopupComponent],
  entryComponents: [ExtrasDeleteDialogComponent]
})
export class ImprentaExtrasModule {}
