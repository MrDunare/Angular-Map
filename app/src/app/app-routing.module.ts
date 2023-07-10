import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { CatFactComponent } from './cat-fact/cat-fact.component';


const routes: Routes = [
  {path: "" , component:LandingComponent},
  {path: "catfacts" , component:CatFactComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
