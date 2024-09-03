import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },  // Route für die Home-Komponente
  { path: '**', redirectTo: '' }  // Alle nicht gefundenen Routen zur Home-Seite umleiten
];
