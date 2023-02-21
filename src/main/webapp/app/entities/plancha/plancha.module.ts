import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { PlanchaComponent } from './plancha.component';
import { PlanchaDetailComponent } from './plancha-detail.component';
import { PlanchaUpdateComponent } from './plancha-update.component';
import { PlanchaDeletePopupComponent, PlanchaDeleteDialogComponent } from './plancha-delete-dialog.component';
import { planchaRoute, planchaPopupRoute } from './plancha.route';

const ENTITY_STATES = [...planchaRoute, ...planchaPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    PlanchaComponent,
    PlanchaDetailComponent,
    PlanchaUpdateComponent,
    PlanchaDeleteDialogComponent,
    PlanchaDeletePopupComponent
  ],
  entryComponents: [PlanchaDeleteDialogComponent]
})
export class ImprentaPlanchaModule {}
