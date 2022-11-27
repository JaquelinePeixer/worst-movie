import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MoviesService } from '../_service/movies.service';

@Component({
  selector: 'app-list-movies',
  templateUrl: './list-movies.component.html',
  styleUrls: ['./list-movies.component.scss']
})
export class ListMoviesComponent implements OnInit {

  moviesData: any = [];
  setYear: string = "";
  setWinner: any = "";
  pagination: any = {
    "size": 15,
    "totalPages": 14,
    "number": 1
  }
  listPagination: any = [];



  filterYear = new FormControl();
  filterWinner = new FormControl();

  constructor(private movieService: MoviesService) { }
  ngOnInit(): void {
    this.getListMovies()
  }

  getListMovies() {
    let campo = `?page=${this.pagination.number}&size=${this.pagination.size}`
    if (this.setWinner) {
      const winner = this.setWinner
      campo = campo + `&winner=${winner}`
    }

    if (this.setYear) {
      const year = this.setYear
      campo = campo + `&year=${year}`
    }
    console.log('campo', campo)
    this.movieService.getMoviesData(campo).subscribe(
      (data: any) => {
        this.moviesData = data.content;
        this.moviesData.map((item: any) => {
          if (item.winner) {
            item.winner = 'Yes'
          } else {
            item.winner = 'No'
          }
        })
        this.forListPagination(data.totalPages)
        console.log('data', data)
      },
      error => {
        console.log('error', error);
      })
  }

  forListPagination(ttPage: any) {
    this.pagination.totalPages = ttPage;
    this.listPagination = [];

    for (let i = 1; i < ttPage; i++) {
      this.listPagination.push(i)
    }

    if (this.listPagination.length == 0) {
      this.listPagination.push(1)
    }

  }

  handleChangePagination(item: any) {
    this.pagination.number = item;
    this.getListMovies();
  }

  goFirstPage() {
    this.pagination.number = 1;
    this.getListMovies();
  }

  goLastPage() {
    this.pagination.number = this.pagination.totalPages - 1;
    this.getListMovies();
  }

  previousPage() {
    if (this.pagination.number !== 1) {
      this.pagination.number = this.pagination.number - 1;
    }
    this.getListMovies();
  }

  nextPage() {
    if (this.pagination.number !== this.pagination.totalPage) {
      this.pagination.number = this.pagination.number + 1;
    }
    this.getListMovies();
  }

  getFilterYear() {
    this.pagination.number = 1;
    this.setYear = this.filterYear.value;
    this.getListMovies();
  }

  getFilterWinner() {
    this.pagination.number = 1;
    this.setWinner = this.filterWinner.value;
    this.getListMovies();
  }

}
