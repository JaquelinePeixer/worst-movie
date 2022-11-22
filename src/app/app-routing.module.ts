import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ContentMainComponent } from './content-main/content-main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListMoviesComponent } from './list-movies/list-movies.component';

const routes: Routes = [
  {
    path: '',
    component: ContentMainComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        pathMatch: 'full'
      },
      {
        path: 'list-movies',
        component: ListMoviesComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
