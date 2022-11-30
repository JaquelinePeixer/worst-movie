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
  filterYear: string = "";
  filterWinner: string = "";
  pagination: any = {
    "size": 15,
    "totalPages": 14,
    "number": 0
  }
  listPagination: any = [];

  constructor(private movieService: MoviesService) { }
  ngOnInit(): void {
    this.getListMovies()
  }

  getListMovies() {
    let campo = `?page=${this.pagination.number}&size=${this.pagination.size}`

    if (this.filterWinner) {
      const winner = this.filterWinner
      campo = campo + `&winner=${winner}`
    }

    if (this.filterYear) {
      const year = this.filterYear
      campo = campo + `&year=${year}`
    }

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
      },
      error => {
        console.log('error', error);
      })
  }

  forListPagination(ttPage: any) {
    this.pagination.totalPages = ttPage;
    this.listPagination = [];

    for (let i = 0; i < ttPage; i++) {
      const value = i + 1;
      this.listPagination.push(value)
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
    this.pagination.number = 0;
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

  getFilterYearWinner() {
    this.pagination.number = 0;
    this.getListMovies();
  }


}
