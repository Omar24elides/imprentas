import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { OtroFormatoComponent } from './otro-formato.component';
import { OtroFormatoDetailComponent } from './otro-formato-detail.component';
import { OtroFormatoUpdateComponent } from './otro-formato-update.component';
import { OtroFormatoDeletePopupComponent, OtroFormatoDeleteDialogComponent } from './otro-formato-delete-dialog.component';
import { otroFormatoRoute, otroFormatoPopupRoute } from './otro-formato.route';

const ENTITY_STATES = [...otroFormatoRoute, ...otroFormatoPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    OtroFormatoComponent,
    OtroFormatoDetailComponent,
    OtroFormatoUpdateComponent,
    OtroFormatoDeleteDialogComponent,
    OtroFormatoDeletePopupComponent
  ],
  entryComponents: [OtroFormatoDeleteDialogComponent]
})
export class ImprentaOtroFormatoModule {}
