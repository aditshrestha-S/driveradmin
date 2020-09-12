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
    console.log(this.list[index].id);
    this.Fire.doc('User/'+this.list[index].id).delete();
    
  }

//getting record from firebase function
  list:User[];
  data:User;

  getfiredata()
  {
  this.fireService.getfiredata().subscribe(actionArray =>{
    this.list=actionArray.map(item=>{
      return{
        id: item.payload.doc.id,
        ...item.payload.doc.data()  as User
      }
      
    });
    this.driver=this.list;
    
  
  })
  
}
//function ends here

waitsample;
fireadd(name)
{
  this.waitsample={

    "firstname":name
    
      }
  
  this.Fire.collection('Admin').add(this.waitsample);
  console.log("call");
  
  
  }
  

//function ends

selected:User[];

getselectedfiredata()
{
this.fireService.getsfiredata().subscribe(actionArray =>{
  this.selected=actionArray.map(item=>{
    return{
      id: item.payload.doc.id,
      ...item.payload.doc.data()  as User
    }
    
  });

})

}

removeselected(index)
  {
    
    this.Fire.doc('Admin/'+this.selected[index].id).delete();
    
  }


}
