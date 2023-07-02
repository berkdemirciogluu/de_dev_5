import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componenets/home/home.component';
import { AboutUsComponent } from './componenets/about-us/about-us.component';
import { ContactUsComponent } from './componenets/contact-us/contact-us.component';
import { HomeVideoComponent } from './componenets/home-video/home-video.component';
import { ServicesComponent } from './componenets/services/services.component';
import { ServicesOption1Component } from './componenets/services-option1/services-option1.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeVideoComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'services-option1', component: ServicesOption1Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
