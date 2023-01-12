import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.css']
})
export class RegistrationPageComponent implements OnInit {

  email:string =""
  location:string=""
  number:number=0
  password:string=""
  confirmpassword:string=""
  dob:string=""
  teamType:string=""
  name:any = ""
  gender:any = ""

  signupRes:any = {
    success : false,
    error:false,
    message:"Registration Successful"
  }

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  Register(){

    if(this.password === this.confirmpassword){
      fetch("http://localhost:5000/signup",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name:this.name,
        dob:this.dob,
        email:this.email,
        number:this.number,
        gender:this.gender,
        teamType:this.teamType,
        location:this.location,
        password:this.password
      })
    }).then(res => res.json())
    .then(data=>{
      
      if(data?.status == "200" ){
        // console.log(data);
        this.signupRes.success = true;
        this.signupRes.error = false;

        this.signupRes.message = data?.message
      }
      else if(data?.status == "422"){
        console.log(data);
        this.signupRes.error = true;
        this.signupRes.success = false;
        this.signupRes.message = data?.error
      }
    }).catch(err=>{
      this.signupRes.message = err
    })

    }
    else {
      this.signupRes.error = true;

      this.signupRes.message = "Password and Confirm Password are not same"
    }

    // console.log(this.name,this.dob,this.email,this.number,this.gender,this.teamType,this.location,this.password,this.confirmpassword)
    
   
  }

  HandleTeamType(e:any) {
    this.teamType = e.target.value
  }
  HandleGender(e:any) {
    this.gender = e.target.value
  }
  CreateNewAccount(){
    this.signupRes.error = false;
    this.signupRes.success = false;
  }

}
