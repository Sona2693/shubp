import { AppErrorHandler } from './post/common/app-error-handler';
import { PostService } from './services/post.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    HttpModule  
  ],
  providers: [
    PostService,
    {
      provide : ErrorHandler, useClass : AppErrorHandler
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
