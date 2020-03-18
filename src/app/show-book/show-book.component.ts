import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Book } from '../book';

@Component({
  selector: 'app-show-book',
  templateUrl: './show-book.component.html',
  styleUrls: ['./show-book.component.css']
})
export class ShowBookComponent implements OnInit {

  book: Book = { _id: '', title: '', author: '', description: '', genre: '', updatedAt: null };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.getBookDetails(this.route.snapshot.params.id);
    console.log(this.route.snapshot.params.id);
  }

  getBookDetails(id: any) {
    this.api.getBook(id)
      .subscribe((data: any) => {
        this.book = data;
        console.log(this.book);
        this.isLoadingResults = false;
      });
  }

  deleteBook(id: any) {
    this.isLoadingResults = true;
    this.api.deleteBook(id)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/books']);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
