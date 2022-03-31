import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'personas',
    loadChildren: ()=>import(`../../modules/personas/personas.module`).then(m=>m.PersonasModule)
  },
  {
    path: '',
    loadChildren: ()=>import(`../../modules/index/index.module`).then(m=>m.IndexModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
