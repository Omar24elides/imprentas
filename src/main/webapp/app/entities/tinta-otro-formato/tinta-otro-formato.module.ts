import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { TintaOtroFormatoComponent } from './tinta-otro-formato.component';
import { TintaOtroFormatoDetailComponent } from './tinta-otro-formato-detail.component';
import { TintaOtroFormatoUpdateComponent } from './tinta-otro-formato-update.component';
import { TintaOtroFormatoDeletePopupComponent, TintaOtroFormatoDeleteDialogComponent } from './tinta-otro-formato-delete-dialog.component';
import { tintaOtroFormatoRoute, tintaOtroFormatoPopupRoute } from './tinta-otro-formato.route';

const ENTITY_STATES = [...tintaOtroFormatoRoute, ...tintaOtroFormatoPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TintaOtroFormatoComponent,
    TintaOtroFormatoDetailComponent,
    TintaOtroFormatoUpdateComponent,
    TintaOtroFormatoDeleteDialogComponent,
    TintaOtroFormatoDeletePopupComponent
  ],
  entryComponents: [TintaOtroFormatoDeleteDialogComponent]
})
export class ImprentaTintaOtroFormatoModule {}
