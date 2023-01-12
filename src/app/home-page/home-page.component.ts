import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  allEmployeesDetails:any
  tabValue:any ="allteams"
  picUrl:any = "https://res.cloudinary.com/dqlfjgkoe/image/upload/v1673422015/user_circle_icon_152504_sjztbt.png"

  ngOnInit(): void {

    this.GetEmployees()

    let userData:any = localStorage.getItem("logged-in-userDtails")
    this.picUrl = JSON.parse(userData).user.pic
    
  }

  GetEmployees() {
    fetch("http://localhost:5000/allemployees",{
      method:"get",
      headers:{
        "Content-Type":"application/json",
      },
      
    }).then(res => res.json())
    .then(data=>{
      if(data?.status == "200" ){
        // console.log(data.employees);
        this.allEmployeesDetails = data.employees
      }
      else if(data?.status == "422"){
        console.log(data);
        
      }
    }).catch(err=>{
      console.log(err);
      
    })
  }

  SelectedTeam(teamType:any) {

    if(teamType === "allteams"){
      this.GetEmployees()
    }
    else {
    fetch("http://localhost:5000/selected",{
      method:"post",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        teamType:teamType
      })
      
    }).then(res => res.json())
    .then(data=>{
      if(data?.status == "200" ){
        // console.log(data.employees);
        this.allEmployeesDetails = data.employees
      }
      else if(data?.status == "422"){
        console.log(data);
        
      }
    }).catch(err=>{
      console.log(err);
      
    })    
  }

  }
}
