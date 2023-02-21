import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { MaquinaComponent } from './maquina.component';
import { MaquinaDetailComponent } from './maquina-detail.component';
import { MaquinaUpdateComponent } from './maquina-update.component';
import { MaquinaDeletePopupComponent, MaquinaDeleteDialogComponent } from './maquina-delete-dialog.component';
import { maquinaRoute, maquinaPopupRoute } from './maquina.route';

const ENTITY_STATES = [...maquinaRoute, ...maquinaPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    MaquinaComponent,
    MaquinaDetailComponent,
    MaquinaUpdateComponent,
    MaquinaDeleteDialogComponent,
    MaquinaDeletePopupComponent
  ],
  entryComponents: [MaquinaDeleteDialogComponent]
})
export class ImprentaMaquinaModule {}
