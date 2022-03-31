import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonasPageComponent } from './pages/personas-page/personas-page.component';

const routes: Routes = [
  {
    path: '',
    component: PersonasPageComponent,
    outlet: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonasRoutingModule { }
