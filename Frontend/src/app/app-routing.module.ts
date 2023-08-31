import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChatComponent } from './chat/chat.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormComponent } from './form/form.component';
import { FaqComponent } from './faq/faq.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserslistComponent } from './userslist/userslist.component';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { AdminsListComponent } from './admins-list/admins-list.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminGuard } from './guards/admin.guard';
import { ClientGuard } from './guards/client.guard';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/compat/auth-guard'
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';

//non authentifiés vers 'login'
const redirectUnauthorizedToLogin = () =>
redirectUnauthorizedTo(['/login']);

//authentifiés: chat
//const redirectLoggedInToHome = () =>
//redirectLoggedInTo(['/home']);

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'chat',component:ChatComponent, canActivate:[ClientGuard]},
  {path:'admindashboard',component:AdminDashboardComponent, canActivate:[AdminGuard]},
  {path:'form',component:FormComponent},
  {path:'faq',component:FaqComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'userslist',component:UserslistComponent, canActivate:[AdminGuard]},
  {path:'clientslist',component:ClientsListComponent, canActivate:[AdminGuard]},
  {path:'adminslist',component:AdminsListComponent, canActivate:[AdminGuard]},
  {path:'editprofile',component:EditprofileComponent, canActivate:[ClientGuard]},
  {path:'profile',component:ProfileComponent, canActivate:[ClientGuard]},
  {path:'forgotpassword',component:ForgotpasswordComponent},
  {path:'verifyemail',component:VerifyemailComponent},
  {path:'**', redirectTo:'/home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
