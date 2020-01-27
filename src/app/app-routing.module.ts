import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {GalleryComponent} from './gallery/gallery.component';
import {UserComponent} from './user/user.component';
import {AuthComponent} from './auth/auth.component';


const routes: Routes = [
  {path: '', component: GalleryComponent},
  {path: 'auth', component: AuthComponent},
  // {path: '**', component: InvalidComponent}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
