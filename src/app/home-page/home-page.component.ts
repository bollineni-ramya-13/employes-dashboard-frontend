import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  EmpDetails:any
  empLogin = false
  EmployeesList:any

  constructor(private router:Router) { }

  ngOnInit(): void {

     var loggedInUserDetails:any=localStorage.getItem("loggedInUserDetails")
     this.EmpDetails = JSON.parse(loggedInUserDetails);
     if(this.EmpDetails == null){
      this.empLogin = false
     }
     else{
      this.empLogin = true
     }

     
     this.Team('dashboard');


  }

  Logout () {
    localStorage.removeItem("loggedInUserDetails")
    this.router.navigate(["login-page"])
  }

  Team (value:any) {
    var EmployeesList:any = localStorage.getItem("EmployeesList")
    EmployeesList = JSON.parse(EmployeesList);

    
    this.EmployeesList = EmployeesList.filter((emp:any)=>emp.teamType===value)
    
  }

}
