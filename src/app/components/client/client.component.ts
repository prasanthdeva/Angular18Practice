import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { APIResponseModel } from '../../interface/role';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{

  clientObj: Client = new Client();
  clientList: Client[] = [];

  clientService = inject(ClientService);

  ngOnInit(): void {
      this.loadClient();
  }

  loadClient(){
   this.clientService.getAllClients().subscribe((res:APIResponseModel)=>{
    this.clientList = res.data;
   })
  }


  onSaveClient() {
    debugger;
   this.clientService.addUpdate(this.clientObj).subscribe((res: APIResponseModel)=>{
    if(res.result){
      alert("Client Created Success");
      this.loadClient();
      this.clientObj = new Client();
    }else{
      alert(res.message);
    }
   
   })
  }

  onDelete(id : number)
  {
    const isDelete = confirm("Are you sure want to delete");
    
    if(isDelete)
    {
      this.clientService.deleteClientById(id).subscribe((res: APIResponseModel)=>{
        if(res.result){
          alert("Client deleted Success");
          this.loadClient();
        }else{
          alert(res.message);
        }
     })
    }
    
 
  } 
    

}
