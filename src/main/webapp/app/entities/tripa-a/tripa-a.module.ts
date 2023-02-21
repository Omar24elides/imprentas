import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { TripaAComponent } from './tripa-a.component';
import { TripaADetailComponent } from './tripa-a-detail.component';
import { TripaAUpdateComponent } from './tripa-a-update.component';
import { TripaADeletePopupComponent, TripaADeleteDialogComponent } from './tripa-a-delete-dialog.component';
import { tripaARoute, tripaAPopupRoute } from './tripa-a.route';

const ENTITY_STATES = [...tripaARoute, ...tripaAPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [TripaAComponent, TripaADetailComponent, TripaAUpdateComponent, TripaADeleteDialogComponent, TripaADeletePopupComponent],
  entryComponents: [TripaADeleteDialogComponent]
})
export class ImprentaTripaAModule {}
