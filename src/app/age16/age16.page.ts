import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Router } from  "@angular/router";


@Component({
  selector: 'app-age16',
  templateUrl: './age16.page.html',
  styleUrls: ['./age16.page.scss'],
})
export class Age16Page implements OnInit {

  public age;

  constructor(private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.age = this.route.snapshot.paramMap.get("age")
    console.log("age", this.age);
  }

  getResults() {
    this.router.navigate(['results']);
  }
}
