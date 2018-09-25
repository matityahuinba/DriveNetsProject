import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private router: Router) { }


  clickHistory(){
    this.router.navigate(['/', 'history']);
  }

  clickPortfolio(){
    this.router.navigate(['/', 'portfolio']);
  }

  clickViewStocks(){
    this.router.navigate(['/', 'viewStocks']);
  }

  clickBuy(){
    this.router.navigate(['/', 'buy', 'Buy']);
  }

  clickSell(){
    this.router.navigate(['/', 'sell', 'Sell']);
  }

  ngOnInit() {
  }

}
