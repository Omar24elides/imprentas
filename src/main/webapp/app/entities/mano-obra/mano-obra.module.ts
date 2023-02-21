import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { ManoObraComponent } from './mano-obra.component';
import { ManoObraDetailComponent } from './mano-obra-detail.component';
import { ManoObraUpdateComponent } from './mano-obra-update.component';
import { ManoObraDeletePopupComponent, ManoObraDeleteDialogComponent } from './mano-obra-delete-dialog.component';
import { manoObraRoute, manoObraPopupRoute } from './mano-obra.route';

const ENTITY_STATES = [...manoObraRoute, ...manoObraPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ManoObraComponent,
    ManoObraDetailComponent,
    ManoObraUpdateComponent,
    ManoObraDeleteDialogComponent,
    ManoObraDeletePopupComponent
  ],
  entryComponents: [ManoObraDeleteDialogComponent]
})
export class ImprentaManoObraModule {}
