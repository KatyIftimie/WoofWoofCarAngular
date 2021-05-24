import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './services/auth.guard.service';
import { RidesComponent } from './components/rides/rides.component';
import { AddRideComponent } from './components/add-ride/add-ride.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add-ride', component: AddRideComponent, canActivate: [AuthGuard] },
  { path: 'rides', component: RidesComponent, canActivate: [AuthGuard] },
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
