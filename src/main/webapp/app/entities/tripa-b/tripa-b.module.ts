import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { TripaBComponent } from './tripa-b.component';
import { TripaBDetailComponent } from './tripa-b-detail.component';
import { TripaBUpdateComponent } from './tripa-b-update.component';
import { TripaBDeletePopupComponent, TripaBDeleteDialogComponent } from './tripa-b-delete-dialog.component';
import { tripaBRoute, tripaBPopupRoute } from './tripa-b.route';

const ENTITY_STATES = [...tripaBRoute, ...tripaBPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TripaBComponent, TripaBDetailComponent, TripaBUpdateComponent, TripaBDeleteDialogComponent, TripaBDeletePopupComponent],
  entryComponents: [TripaBDeleteDialogComponent]
})
export class ImprentaTripaBModule {}
