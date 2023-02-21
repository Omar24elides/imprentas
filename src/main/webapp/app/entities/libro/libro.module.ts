import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ImprentaSharedModule } from 'app/shared/shared.module';
import { LibroComponent } from './libro.component';
import { LibroDetailComponent } from './libro-detail.component';
import { LibroUpdateComponent } from './libro-update.component';
import { LibroDeletePopupComponent, LibroDeleteDialogComponent } from './libro-delete-dialog.component';
import { libroRoute, libroPopupRoute } from './libro.route';

const ENTITY_STATES = [...libroRoute, ...libroPopupRoute];

@NgModule({
  imports: [ImprentaSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [LibroComponent, LibroDetailComponent, LibroUpdateComponent, LibroDeleteDialogComponent, LibroDeletePopupComponent],
  entryComponents: [LibroDeleteDialogComponent]
})
export class ImprentaLibroModule {}
