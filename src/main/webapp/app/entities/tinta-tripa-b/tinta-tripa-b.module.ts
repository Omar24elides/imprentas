import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { TintaTripaBComponent } from './tinta-tripa-b.component';
import { TintaTripaBDetailComponent } from './tinta-tripa-b-detail.component';
import { TintaTripaBUpdateComponent } from './tinta-tripa-b-update.component';
import { TintaTripaBDeletePopupComponent, TintaTripaBDeleteDialogComponent } from './tinta-tripa-b-delete-dialog.component';
import { tintaTripaBRoute, tintaTripaBPopupRoute } from './tinta-tripa-b.route';

const ENTITY_STATES = [...tintaTripaBRoute, ...tintaTripaBPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TintaTripaBComponent,
    TintaTripaBDetailComponent,
    TintaTripaBUpdateComponent,
    TintaTripaBDeleteDialogComponent,
    TintaTripaBDeletePopupComponent
  ],
  entryComponents: [TintaTripaBDeleteDialogComponent]
})
export class ImprentaTintaTripaBModule {}
