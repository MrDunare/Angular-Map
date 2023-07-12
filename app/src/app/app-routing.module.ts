import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { CatFactComponent } from './components/cat-fact/cat-fact.component';
import { MapComponent } from './components/map/map.component';


const routes: Routes = [
  {path: "" , component:LandingComponent},
  {path: "catfacts" , component:CatFactComponent},
  {path: "map" , component:MapComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
