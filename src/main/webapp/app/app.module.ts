import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { ImprentaSharedModule } from 'app/shared/shared.module';
import { ImprentaCoreModule } from 'app/core/core.module';
import { ImprentaAppRoutingModule } from './app-routing.module';
import { ImprentaHomeModule } from './home/home.module';
import { ImprentaEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    ImprentaSharedModule,
    ImprentaCoreModule,
    ImprentaHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    ImprentaEntityModule,
    ImprentaAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class ImprentaAppModule {}
