import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonasRoutingModule } from './personas-routing.module';
import { PersonasPageComponent } from './pages/personas-page/personas-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PersonasPageComponent
  ],
  imports: [
    CommonModule,
    PersonasRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PersonasModule { }
