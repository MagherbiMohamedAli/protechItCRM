import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { initializeApp } from 'firebase/app';


const firebaseConfig= {
  apiKey: "AIzaSyDNTI3jZwax693vfNqk11Jg-PjGXHIVuT4",
  authDomain: "clientele-a5a4a.firebaseapp.com",
  projectId: "clientele-a5a4a",
  storageBucket: "clientele-a5a4a.appspot.com",
  messagingSenderId: "793524511262",
  appId: "1:793524511262:web:3e88a0e464c9ea4d55840f"
};
const app = initializeApp(firebaseConfig);



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
