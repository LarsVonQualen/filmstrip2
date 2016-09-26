import { Routes } from '@angular/router';
import { AboutComponent, HomeComponent, CollectionComponent, MovieComponent, SignUpComponent, SignInComponent } from './components';

export const rootRouterConfig: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'home/:searchQuery', component: HomeComponent},
  {path: 'home/:searchQuery/:page', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'collection', component: CollectionComponent},
  {path: 'movies/:movieId', component: MovieComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent}
];
