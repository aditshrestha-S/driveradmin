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

              public data_url="http://localhost:5100/sent";

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
datapost(var1)
  {
    console.log(var1);
    this.sample={

      "no":var1
    }

    this.http.post(this.data_url,this.sample).toPromise().then((data:any)=>{
      console.log(data);
    });
    console.log("Function call")

  }

  //getting response



}
