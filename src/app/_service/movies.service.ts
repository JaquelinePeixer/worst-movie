import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { config } from 'src/config';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {

  constructor(private http: HttpClient) { }

  getMoviesData(campo: string): Observable<any> {
    return this.http.get(config.obterUrl() + campo);
  }

  getWinYear(): Observable<any> {
    return this.http.get(config.obterUrl() + '?projection=years-with-multiple-winners');
  }

  getStudios(): Observable<any> {
    return this.http.get(config.obterUrl() + '?projection=studios-with-win-count');
  }

  getWinInterval(): Observable<any> {
    return this.http.get(config.obterUrl() + '?projection=max-min-win-interval-for-producers');
  }

  getYearMovies(campo:any): Observable<any> {
    return this.http.get(config.obterUrl() + campo);
  }

}
