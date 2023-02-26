import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { PapelComponent } from './papel.component';
import { PapelDetailComponent } from './papel-detail.component';
import { PapelUpdateComponent } from './papel-update.component';
import { PapelDeletePopupComponent, PapelDeleteDialogComponent } from './papel-delete-dialog.component';
import { papelRoute, papelPopupRoute } from './papel.route';

const ENTITY_STATES = [...papelRoute, ...papelPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [PapelComponent, PapelDetailComponent, PapelUpdateComponent, PapelDeleteDialogComponent, PapelDeletePopupComponent],
  entryComponents: [PapelDeleteDialogComponent]
})
export class ImprentaPapelModule {}
