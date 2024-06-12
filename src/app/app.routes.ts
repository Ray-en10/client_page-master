import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './authentification/login/login.component';
import { SignupComponent } from './authentification/signup/signup.component';
import { ClientInterfaceComponent } from './client-interface/client-interface.component';
import { AppelFondComponent } from './client-interface/services/appel-fond/appel-fond.component';
import { LeveeFondComponent } from './client-interface/services/levee-fond/levee-fond.component';
import { MiseADispoComponent } from './client-interface/services/mise-a-dispo/mise-a-dispo.component';
import { PresentationComponent } from './accueil/presentation/presentation.component';
import { ContactComponent } from './accueil/contact/contact.component';
import { HistoriqueComponent } from './client-interface/historique/historique.component';
import { CommandesComponent } from './client-interface/commandes/commandes.component';
import { ForgotPasswordComponent } from './authentification/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './authentification/reset-password/reset-password.component';
import { AuthGuard } from './models/auth.guard';
import { EchangeComponent } from './client-interface/services/echange/echange.component';
import { ProfileComponent } from './client-interface/profile/profile.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent},
  { path: 'sign', component: SignupComponent },
  { path: 'client', component: ClientInterfaceComponent , canActivate: [AuthGuard] },
  { path: 'af', component: AppelFondComponent , canActivate: [AuthGuard] },
  { path: 'lv', component: LeveeFondComponent, canActivate: [AuthGuard]},
  { path: 'md', component: MiseADispoComponent, canActivate: [AuthGuard]},
  { path: 'presentation', component: PresentationComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'profil', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'historique', component: HistoriqueComponent, canActivate: [AuthGuard] },
  { path: 'validation', component: CommandesComponent, canActivate: [AuthGuard] },
  { path: 'echange', component: EchangeComponent , canActivate: [AuthGuard] },
  { path: 'motdepasse', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutesModule {}
