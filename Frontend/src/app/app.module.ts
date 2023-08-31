import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ChatComponent } from './chat/chat.component';
import { FormComponent } from './form/form.component';
import { FaqComponent } from './faq/faq.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserslistComponent } from './userslist/userslist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsListComponent } from './clients-list/clients-list.component';
import { AdminsListComponent } from './admins-list/admins-list.component';
import { authInterceptorProviders } from './services/interceptor/interceptor';

import { EditprofileComponent } from './editprofile/editprofile.component';
/* import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login'; */
import { ProfileComponent } from './profile/profile.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';



import { environment } from '../environments/environment';
import { CommonModule } from '@angular/common';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    AdminDashboardComponent,
    ChatComponent,
    FormComponent,
    FaqComponent,
    LoginComponent,
    SignupComponent,
    UserslistComponent,
    ClientsListComponent,
    AdminsListComponent,
    EditprofileComponent,
    ProfileComponent,
    ForgotpasswordComponent,
    VerifyemailComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([]),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    //SocialLoginModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

  ],
  providers: [authInterceptorProviders,
    /* {
      provide: 'SocialAuthServiceConfig', 
      useValue: {
        autoLogin: false,
        providers: [AngularFireAuth,
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '22912923160-73j5ffvl252j672k4mfltv2qbd7j7mdk.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1661817070960557')
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

