import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  empEmail:any=""
  empPassword:any=""
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  HandleLogin(){
    this.router.navigate(["home-page"])
  }

  Login(){

    var EmployeesList:any =localStorage.getItem("EmployeesList")

    EmployeesList = EmployeesList == null ? [] : JSON.parse(EmployeesList)

    var correctCredentials = false
    for(let i=0;i<EmployeesList.length;i++){
      if(EmployeesList[i].empEmail == this.empEmail){
        if(EmployeesList[i].password == this.empPassword){
          correctCredentials = true
          localStorage.setItem("loggedInUserDetails",JSON.stringify(EmployeesList[i]))
          break
        }
        else {
          correctCredentials = false
        }
      }
      else {
        
        correctCredentials = false
      }
    }
    if(correctCredentials){
      alert("Login successfully")
      this.router.navigate(["home-page"])
    }
    else {
      alert("Invalid details")
    }

    console.log("empEmail",this.empEmail,"empPassword",this.empPassword);
    

  }

}
