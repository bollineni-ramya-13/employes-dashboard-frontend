import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  profileDetails:any
  token:any = ""
  url: any; //Angular 11, for stricter type
	msg = "";
  image:any
  uploadPic = false
  userDetails:any
  errorRes:any = {
    error : false,
    message : "File size too large. Got 14483456. Maximum is 10485760."
  }

  constructor(private router:Router) { }

  ngOnInit(): void {
   this.userDetails = localStorage.getItem("logged-in-userDtails")
   this.userDetails = JSON.parse(this.userDetails)
   this.token = this.userDetails?.token
   //  console.log("token",this.token)
   this.GetProfileDetails()
  }

  GetProfileDetails(){
    if(this.token){
      fetch("http://localhost:5000/profile",{
        method:"get",
        headers:{
          "Content-Type":"application/json",
          "Authorization" : `Bearer ${this.token}`
        },
        
      }).then(res => res.json())
      .then(data=>{
        if(data?.status == "200" ){
          // console.log(data);
          this.profileDetails = data.userDetails
          this.uploadPic=false
        }
        else if(data?.status == "422"){
          console.log(data);
          
        }
      }).catch(err=>{
        console.log(err);
        
      })
     }

  }

  Logout () {
    localStorage.removeItem("logged-in-userDtails")

    this.router.navigate(["login-page"])
  }

  Back() {
    this.router.navigate(["home-page"])
  }

  CancelUpload(){
    this.uploadPic = false
  }

  selectFile(event: any) { //Angular 11, for stricter type
    this.errorRes.error = false;
    this.image = event.target.files[0]
		if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.msg = 'You must select an image';
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}

    this.uploadPic = true;

    // this.UploadImage()
	}

  UploadImage(){
    const data = new FormData()
    data.append("file",this.image)
    data.append("upload_preset","employees-images")
    data.append("cloud_name","dqlfjgkoe")

    fetch("http://api.cloudinary.com/v1_1/dqlfjgkoe/image/upload",{
    "method":"post",
     body:data
    })
    .then(res=>res.json())
    .then(data=>{
      

      if(data.secure_url) {
        fetch("http://localhost:5000/updatepic",{
          method:"put",
          headers:{
            "Content-Type":"application/json",
            "Authorization" : `Bearer ${this.token}`
          },
          body:JSON.stringify({
            pic:data.secure_url
          })
         
        })
        .then(res=>res.json())
        .then(imageRes=>{
          // console.log("imageRes",imageRes);
  
          this.userDetails.user = imageRes
  
          localStorage.setItem("logged-in-userDtails",JSON.stringify(this.userDetails))
          
          this.GetProfileDetails()
          
        })
        .catch(err=>{
          console.log(err);
        })   
      }
      else {
        this.errorRes.error = true
        this.errorRes.message = data.error.message
        console.log(data.error.message);
      }

        
    })
    .catch(err=>{
      console.log(err);
      
    })

  }


}
