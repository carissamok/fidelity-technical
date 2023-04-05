import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CommandEntryComponent } from './command-entry/command-entry.component';
import { CommandStreamComponent } from './command-stream/command-stream.component';
import { CommandSummaryComponent } from './command-summary/command-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    CommandEntryComponent,
    CommandStreamComponent,
    CommandSummaryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
