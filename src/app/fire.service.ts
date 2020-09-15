import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private fire:AngularFirestore) { }

  formData:User;
  getfiredata()
  {
   return   this.fire.collection('User').snapshotChanges();
  }

  getselectedfiredata()
  {
   return   this.fire.collection('Admin').snapshotChanges();
  }
}
