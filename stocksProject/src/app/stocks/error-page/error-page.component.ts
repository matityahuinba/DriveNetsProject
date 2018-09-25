import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  title : string;
  body: string;

  constructor(private activatedRoute: ActivatedRoute) { 
    activatedRoute.params.subscribe(params => {
      const id = params['isSell'];
      if (id){
        this.title = 'Oops!'
        this.body = 'Sale option does not exist!'
      }else{
        this.title = 'Oops! Something is wrong...'
        this.body = 'Please wait for reconnection, and try again.'
      }
    });
  }

  ngOnInit() {
  }

}
