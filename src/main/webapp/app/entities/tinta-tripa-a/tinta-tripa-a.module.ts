import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { TintaTripaAComponent } from './tinta-tripa-a.component';
import { TintaTripaADetailComponent } from './tinta-tripa-a-detail.component';
import { TintaTripaAUpdateComponent } from './tinta-tripa-a-update.component';
import { TintaTripaADeletePopupComponent, TintaTripaADeleteDialogComponent } from './tinta-tripa-a-delete-dialog.component';
import { tintaTripaARoute, tintaTripaAPopupRoute } from './tinta-tripa-a.route';

const ENTITY_STATES = [...tintaTripaARoute, ...tintaTripaAPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TintaTripaAComponent,
    TintaTripaADetailComponent,
    TintaTripaAUpdateComponent,
    TintaTripaADeleteDialogComponent,
    TintaTripaADeletePopupComponent
  ],
  entryComponents: [TintaTripaADeleteDialogComponent]
})
export class ImprentaTintaTripaAModule {}
