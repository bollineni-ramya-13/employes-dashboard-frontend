import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password-page',
  templateUrl: './forget-password-page.component.html',
  styleUrls: ['./forget-password-page.component.css']
})
export class ForgetPasswordPageComponent implements OnInit {

  validEmail:any = false
  email:any
  newpassword:any
  confirmNewPassword:any
  verifyEmailRes:any = {
    success : false,
    error:false,
    message:"Invalid Details"
  }
  resetPasswordRes:any = {
    success : false,
    error:false,
    message:"Successfully Updated Your New Password!"
  }


  EmailValidation () {

    fetch("http://localhost:5000/verifyemail",{
      method:"post",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:this.email,
      })
    }).then(res => res.json())
    .then(data=>{
      if(data?.status == "200" ){
        console.log(data);
        
        this.validEmail = true
        this.verifyEmailRes.error = false;
        this.verifyEmailRes.success = true;
        this.verifyEmailRes.message = data.message
      }
      else if(data?.status == "422"){
        console.log(data);
        this.verifyEmailRes.error = true;
        this.verifyEmailRes.success = false;
        this.verifyEmailRes.message = data.error
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  UpdateNewPassword(){

    if(this.newpassword === this.confirmNewPassword){

      fetch("http://localhost:5000/updatepassword",{
      method:"put",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email:this.email,
        password:this.newpassword
      })
    }).then(res => res.json())
    .then(data=>{
      if(data?.status == "200" ){
        console.log(data);
        this.resetPasswordRes.success = true
        this.resetPasswordRes.message=data.message
      }
      else if(data?.status == "422"){
        console.log(data);
        this.verifyEmailRes.error = true;
        this.verifyEmailRes.success = false;
        this.verifyEmailRes.message = data.error
      }
    }).catch(err=>{
      console.log(err);  
    })

    }
    else {
      this.verifyEmailRes.error = true;
      this.verifyEmailRes.success = false;
      this.verifyEmailRes.message = "Password and Confirm password not same"

    }

    
  }

  constructor() { }

  ngOnInit(): void {
  }

}
