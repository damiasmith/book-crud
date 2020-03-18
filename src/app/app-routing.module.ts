import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { ShowBookComponent } from './show-book/show-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';


const routes: Routes = [
  {
    path: 'show-book/:id',
    component: ShowBookComponent,
    data: { title: 'Show Book' }
  },
  {
    path: 'edit-book/:id',
    component: EditBookComponent,
    data: { title: 'Edit Book' }
  },
  {
    path: 'add-book',
    component: AddBookComponent,
    data: { title: 'Add Book' }
  },
  {
    path: 'books',
    component: BooksComponent,
    data: { title: 'Books' }
  },
  { path: '',
    redirectTo: '/books',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
