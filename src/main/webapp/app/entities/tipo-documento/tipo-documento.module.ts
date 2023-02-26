import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { TipoDocumentoComponent } from './tipo-documento.component';
import { TipoDocumentoDetailComponent } from './tipo-documento-detail.component';
import { TipoDocumentoUpdateComponent } from './tipo-documento-update.component';
import { TipoDocumentoDeletePopupComponent, TipoDocumentoDeleteDialogComponent } from './tipo-documento-delete-dialog.component';
import { tipoDocumentoRoute, tipoDocumentoPopupRoute } from './tipo-documento.route';

const ENTITY_STATES = [...tipoDocumentoRoute, ...tipoDocumentoPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    TipoDocumentoComponent,
    TipoDocumentoDetailComponent,
    TipoDocumentoUpdateComponent,
    TipoDocumentoDeleteDialogComponent,
    TipoDocumentoDeletePopupComponent
  ],
  entryComponents: [TipoDocumentoDeleteDialogComponent]
})
export class ImprentaTipoDocumentoModule {}
