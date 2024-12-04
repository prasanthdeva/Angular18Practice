import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../services/master.service';
import { IDesignation } from '../../interface/role';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css'
})
export class DesignationComponent implements OnInit {


  designationList: IDesignation[] = [];
  isLoader: boolean = true;
  masterService = inject(MasterService);

  ngOnInit(): void {
      this.masterService.getDesignation().subscribe((result:any)=>{
      this.designationList = result.data;
      this.isLoader = false;
      },error=>{
        alert("API error");
        this.isLoader = false;
      })
  }

}
