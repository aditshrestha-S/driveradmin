import { Component } from '@angular/core';
import { FireService } from './fire.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'driveradmin';

  constructor(private fireService: FireService,
              private Fire:AngularFirestore,
              private _snackBar:MatSnackBar,
              public dialog: MatDialog){}


              ngOnInit()
               {
                
                this.openDialog();
                this.getfiredata();
                this.getselectedfiredata();
                
                
              }

              openDialog() {
                this.dialog.open(DialogComponent);
              }

  
  
  driver:User[];



  //Adding user to selected list
  i=-1;
  add(index)
  {
   
   this.fireadd(this.list[index].firstname,index);
   //this.remove(index);  

    
  }
  //delete user

 remove(index)
  {
    
    this.Fire.doc('User/'+this.list[index].id).delete();
    
  }

//getting record from firebase function
waitinglistlength=0;

  list:User[];
  data:User;
j;
k;
llength=0;
added;
temp:User;
  getfiredata()
  {
  this.fireService.getfiredata().subscribe(actionArray =>{
    this.list=actionArray.map(item=>{
      return{
        id: item.payload.doc.id,
        ...item.payload.doc.data()  as User
      }
     
    });
    console.log(this.list);
    
    if(this.list.length > this.waitinglistlength)
    {
      this.playAudio();
      
      this.waitinglistlength=this.list.length;
     

    }



    //this.driver=this.list;
    for(this.k=0;this.k<this.list.length;this.k++)
  {
    for(this.j=this.i+1;this.j<this.list.length;this.j++)
    {
      if(this.list[this.k].timestamp < this.list[this.j].timestamp)
      {
       // this.temp=this.list[this.i];
        this.temp=this.list[this.k];
        this.list[this.k]=this.list[this.j];
        this.list[this.j]=this.temp;
      }
    }
  }
  
  })
  
}
//function ends here

waitsample;
today;
errorflag=false;
fireadd(name,index)
{
  this.today=Date();

  this.waitsample={

    "firstname":name,
    "timestamp":this.today,
    "material":this.Category
      }
  
      if(this.Category =="")
      {
        this.errorflag=true;
      }
      else
      {
        this.errorflag=false;
        this.Fire.collection('Admin').add(this.waitsample);
        this.Category="";
        this.remove(index);
      }
  
  }
  
//function ends

//function for getting selected user

selected:User[];

getselectedfiredata()
{
this.fireService.getselectedfiredata().subscribe(actionArray =>{
  this.selected=actionArray.map(item=>{
    return{
      id: item.payload.doc.id,
      ...item.payload.doc.data()  as User
    }
    
  });
  
  //
  // Sorting Selected list
  //
  for(this.k=0;this.k<this.selected.length;this.k++)
  {
    for(this.j=this.i+1;this.j<this.selected.length;this.j++)
    {
      if(this.selected[this.k].timestamp < this.selected[this.j].timestamp)
      {
       // this.temp=this.list[this.i];
        this.temp=this.selected[this.k];
        this.selected[this.k]=this.selected[this.j];
        this.selected[this.j]=this.temp;
      }
    }
  }
})

}

//function for remove student form selected list
removeselected(index)
  {
    
    this.Fire.doc('Admin/'+this.selected[index].id).delete();
    
  }


//material type values

topics=['metal ALCO','metal Schnitzer','dirty concrete','clean concrete','trash hollister','trash Los Banos','ADC','cardboard','Sheetrock'];
Category="";

//
//
// Playing sound
//
playAudio(){
  
  let audio = new Audio();
  audio.src = "./assets/audio3.mp3";
  audio.load();
  audio.play();
  this.openSnackBarsuccess("new entry");
  
 
}

//
//Snackbar
//

  //snacknbar function for success

  durationInSeconds = 2;
  openSnackBarsuccess(message) 
  {
    
    this._snackBar.open(message, "", 
    {
      duration: this.durationInSeconds * 1000,
      panelClass: ['success-snackbar']
    });
  }
  //snacknbar function for success ends here
  
  //sending sms function
no="+919325080262";
sendsms(i)
{
  this.fireService.datapost(this.list[i].mobileno);
  console.log("call");
  
}

//getting responce function



}
