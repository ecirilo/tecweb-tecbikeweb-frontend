import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AluguelComponent } from './aluguel/aluguel.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { BikeComponent } from './bike/bike.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],
    children: [
      { path: 'bike', component: BikeComponent },
      { path: 'aluguel', component: AluguelComponent }
    ]
  },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
