import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { TipoPapelComponent } from './tipo-papel.component';
import { TipoPapelDetailComponent } from './tipo-papel-detail.component';
import { TipoPapelUpdateComponent } from './tipo-papel-update.component';
import { TipoPapelDeletePopupComponent, TipoPapelDeleteDialogComponent } from './tipo-papel-delete-dialog.component';
import { tipoPapelRoute, tipoPapelPopupRoute } from './tipo-papel.route';

const ENTITY_STATES = [...tipoPapelRoute, ...tipoPapelPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoPapelComponent,
    TipoPapelDetailComponent,
    TipoPapelUpdateComponent,
    TipoPapelDeleteDialogComponent,
    TipoPapelDeletePopupComponent
  ],
  entryComponents: [TipoPapelDeleteDialogComponent]
})
export class ImprentaTipoPapelModule {}
