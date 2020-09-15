import { Component } from '@angular/core';
import { FireService } from './fire.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'driveradmin';

  constructor(private fireService: FireService,
              private Fire:AngularFirestore){}


              ngOnInit()
               {
                this.getfiredata();
                this.getselectedfiredata();
                
              }

  
  
  driver:User[];



  //Adding user to selected list
  i=-1;
  add(index)
  {
   
   this.fireadd(this.list[index].firstname);
   this.remove(index);  

    
  }
  //delete user

 remove(index)
  {
    
    this.Fire.doc('User/'+this.list[index].id).delete();
    
  }

//getting record from firebase function
  list:User[];
  data:User;
j;
k;
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
fireadd(name)
{
  this.today=Date();

  this.waitsample={

    "firstname":name,
    "timestamp":this.today
      }
  
  this.Fire.collection('Admin').add(this.waitsample);
  console.log("call");
  
  
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
  console.log(this.selected);
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


}
