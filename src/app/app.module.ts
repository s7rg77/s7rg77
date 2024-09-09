import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UniverseComponent } from './universe/universe.component';
import { NameComponent } from './name/name.component';
import { Planet01Component } from './planet01/planet01.component';
import { Star01Component } from './star01/star01.component';
import { Star02Component } from './star02/star02.component';
import { FooterComponent } from './footer/footer.component';
import { GalaxyComponent } from './galaxy/galaxy.component';
import { Planet02Component } from './planet02/planet02.component';

@NgModule({
  declarations: [
    AppComponent,
    UniverseComponent,
    NameComponent,
    Planet01Component,
    Star01Component,
    Star02Component,
    FooterComponent,
    GalaxyComponent,
    Planet02Component
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }