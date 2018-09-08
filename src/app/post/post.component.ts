import { WrongInputError } from './common/wrong-input-error';
import { NotFoundError } from './common/not-found-error';
import { AppError } from './common/app-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts = [];
  constructor(private service : PostService)
  {}

  ngOnInit()
  {
    this.service.getPosts()
    .subscribe(
      response => 
      {
        this.posts = response.json();
      })
  }

  createPost(input : HTMLInputElement)
  {
    let post  = {title : input.value}
    input.value = '';
    this.service.createPosts(post)
    .subscribe(
      response => 
      {
        post['id'] = response.json().id;
        this.posts.splice(0,0,post);
      },
      (error : AppError) =>
      {
        if(error instanceof WrongInputError)
        {
          alert('Wrong Input');
        }
        else throw error;
      })
  }

  updatePost(post)
  {
    this.service.updatePosts(post).subscribe(response => 
    { 
      console.log(response.json);
    })
  }

  deletePost(post)
  {
    this.service.deletePosts(post.id)
    .subscribe
      (response =>
      {
        let index = this.posts.indexOf(post);
        this.posts.splice(index,1);
      },
      (error : AppError) =>
      {
        if(error instanceof NotFoundError)
        {
          alert('Already Exists!');
        }
        else throw error;
      }
    )
  }
}
