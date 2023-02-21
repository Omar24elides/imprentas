import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { TipoMontajeComponent } from './tipo-montaje.component';
import { TipoMontajeDetailComponent } from './tipo-montaje-detail.component';
import { TipoMontajeUpdateComponent } from './tipo-montaje-update.component';
import { TipoMontajeDeletePopupComponent, TipoMontajeDeleteDialogComponent } from './tipo-montaje-delete-dialog.component';
import { tipoMontajeRoute, tipoMontajePopupRoute } from './tipo-montaje.route';

const ENTITY_STATES = [...tipoMontajeRoute, ...tipoMontajePopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoMontajeComponent,
    TipoMontajeDetailComponent,
    TipoMontajeUpdateComponent,
    TipoMontajeDeleteDialogComponent,
    TipoMontajeDeletePopupComponent
  ],
  entryComponents: [TipoMontajeDeleteDialogComponent]
})
export class ImprentaTipoMontajeModule {}
