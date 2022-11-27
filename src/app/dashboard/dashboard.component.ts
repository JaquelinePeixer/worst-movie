import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { YearWinners } from '../_interface/movies';
import { MoviesService } from '../_service/movies.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  listYearWinners: any;
  listStudios: any = [];
  winMinInterval: any = [];
  winMaxInterval: any = [];
  yearMovies: any = [];
  value: any;
  valueInterval: any;



  constructor(private movieService: MoviesService) { }

  ngOnInit() {
    this.getWinYear()
    this.getStudios();
    this.getWinInterval();
    this.getYearMovies(2018);
  }

  getWinYear() {
    this.movieService.getWinYear().subscribe(
      (data: any) => {
        this.listYearWinners = data.years;
      },
      error => {
        console.log('error', error);
      })
  }

  getStudios() {
    this.movieService.getStudios().subscribe(
      (data: any) => {
        data.studios.forEach((item: any, index: number) => {
          if (index < 3) {
            this.listStudios.push(item);
          }
        });
      },
      error => {
        console.log('error', error);
      })
  }

  getWinInterval() {
    this.movieService.getWinInterval().subscribe(
      (data: any) => {
        this.valueInterval = [data.min, data.max];
      },
      error => {
        console.log('error', error);
      })
  }

  filterYear = new FormGroup({
    year: new FormControl()
  });

  getYearMovies(year: number) {

    let campo = `?winner=true&year=${year}`
    console.log('campo', campo)

    this.movieService.getYearMovies(campo).subscribe(
      (data: any) => {
        this.yearMovies = data;
      },
      error => {
        console.log('error', error);
      })
  }


  getFilterYear() {
    this.getYearMovies(this.filterYear.controls.year.value);
  }

}
