import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  employeeName:string =""
  employeeEmail:string =""
  currentLocation:string=""
  mobileNumber:number=0
  experience:number=0
  password:string=""
  confirmpassword:string=""
  dob:string=""
  teamType:string=""

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  Register(){

    var EmployeesListData:any = localStorage.getItem("EmployeesList")

    EmployeesListData=EmployeesListData == null ? []:JSON.parse(EmployeesListData)

    var exists = false;
    for(let i=0;i<EmployeesListData.length;i++)
    {
      if(EmployeesListData[i].empEmail === this.employeeEmail ){
        
        exists = true
        break
      }
      else{
        exists = false
      }
    }
    if(exists){
      alert("email already exists please try with other Mail ID")
    }
    else {
      if(this.password === this.confirmpassword){
        var EmployeeData = {
          empName:this.employeeName,
          empEmail:this.employeeEmail,
          teamType:this.teamType,
          dob:this.dob,
          currentLocation:this.currentLocation,
          mobileNumber:this.mobileNumber,
          experience:this.experience,
          password:this.password,
          confirmPassword:this.confirmpassword
        }
        EmployeesListData.push(EmployeeData)
  
        localStorage.setItem("EmployeesList",JSON.stringify(EmployeesListData));

        this.router.navigate(["login-page"])
        
      }
      else {
        alert("Password and confirm password did not match")
        this.password=""
        this.confirmpassword=""
      }
    }
  }

  HandleTeamType(e:any) {
    this.teamType = e.target.value
  }

}
