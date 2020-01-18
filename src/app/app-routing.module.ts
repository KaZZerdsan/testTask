import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {GalleryComponent} from './gallery/gallery.component';
import {UserComponent} from './user/user.component';


const routes: Routes = [
  {path: 'gallery', component: GalleryComponent},
  {path: 'auth', component: UserComponent},
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
