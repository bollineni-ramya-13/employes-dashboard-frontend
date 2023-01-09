import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  loggedInUserDetails:any

  constructor(private router:Router) { }

  ngOnInit(): void {
    var loggedInUserDetails:any=localStorage.getItem("loggedInUserDetails")
    this.loggedInUserDetails=JSON.parse(loggedInUserDetails)
  }

  Logout () {
    localStorage.removeItem("loggedInUserDetails")
    this.router.navigate(["login-page"])
  }


}
