import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private fire:AngularFirestore,
              private http: HttpClient) { }

              public data_urlsms="https://driversmsserver.herokuapp.com/sent";
              

              public data_urlmail="https://driversmsserver.herokuapp.com/mail";

  formData:User;
  getfiredata()
  {
   return   this.fire.collection('User').snapshotChanges();
  }

  getselectedfiredata()
  {
   return   this.fire.collection('Admin').snapshotChanges();
  }

//sending sms function
sample;
datapost(varno,varname,varmaterial)
  {
   
    this.sample={

      "no":varno,
      "name":varname,
      "material":varmaterial
    }

    this.http.post(this.data_urlsms,this.sample).toPromise().then((data:any)=>{
      
    });
    console.log("Function call")
    

  }

  //sending mail function

  
datamail(emailid)
  {
    
    this.sample={

      "emailid":emailid
    }

    if(emailid.length != 0)
    {
    this.http.post(this.data_urlmail,this.sample).toPromise().then((data:any)=>{
      console.log(data);
    
    });
  }

  }



}
