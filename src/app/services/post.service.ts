import { NotFoundError } from './../post/common/not-found-error';
import { AppError } from './../post/common/app-error';

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import {map, catchError} from 'rxjs/operators';
import { throwError} from 'rxjs';
import { WrongInputError } from '../post/common/wrong-input-error';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http : Http) { }

  getPosts()
  {
    return this.http.get(this.url)
    .pipe( catchError(this.handleError) );
  }

  createPosts(post)
  {
    return this.http.post(this.url, JSON.stringify(post))
    .pipe( map().catchError(this.handleError) );
  }

  updatePosts(post)
  {
    return this.http.patch(this.url + '/' + post.id,JSON.stringify({isRead : true}))
    .pipe( catchError(this.handleError) );
  }

  deletePosts(id)
  {
    return this.http.delete(this.url + '/' + id)
    .pipe( catchError(this.handleError) );
  }

  private handleError(error : Response)
  {
    if (error.status === 404) 
      {
        return throwError(new NotFoundError(error.json()));
      }
    if (error.status === 400) 
      {
        return throwError(new WrongInputError(error.json()));
      }
    return throwError(new AppError(error.json()));
   
  }


}
