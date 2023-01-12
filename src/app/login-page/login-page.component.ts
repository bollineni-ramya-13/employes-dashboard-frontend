import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  email:any=""
  password:any=""
  signinRes:any = {
    success : false,
    error:false,
    message:"Invalid Details"
  }

  constructor(
    private router:Router    ) { }

  ngOnInit(): void {
  }

  HandleLogin(){

    // console.log(this.email,this.password);

    fetch("http://localhost:5000/signin",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:this.email,
        password:this.password
      })
    }).then(res => res.json())
    .then(data=>{
      if(data?.status == "200" ){
        // console.log(data);
        localStorage.setItem("logged-in-userDtails",JSON.stringify(data))
        this.router.navigate(['home-page'])
      }
      else if(data?.status == "422"){
        console.log(data);
        this.signinRes.error = true;
        this.signinRes.success = false;
        this.signinRes.message = data.error
        
      }
    }).catch(err=>{
      console.log(err);
      
    })
    

    
  }

}
