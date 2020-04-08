import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";


@Component({
  selector: 'app-age',
  templateUrl: './age.page.html',
  styleUrls: ['./age.page.scss'],
})
export class AgePage implements OnInit {

  public age: string;

  constructor(public router: Router) { }

  ngOnInit() {
  }

  fishyHandler(event) {
    // get data throught event emitter
    this.age = event.target.value;
  }
  leaveFish(event) {
    console.log('bye bye ', event.target.value);
  }
  goFish(event) {
    console.log('hello ', event.target.value);
  }

  passNavigator(){
    this.router.navigate(['age16/'+this.age]);
  }


}
