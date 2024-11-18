import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service'; 
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';

let id = 0;

export interface Instance {
  id: number;
  name: string;
  address: string;
}

const INSTANCE_DATA: Instance[] = [
];


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [CommonModule, MatTableModule],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private sharedService: SharedService) {}

  displayedColumns: string[] = ['id', 'name', 'address'];
  dataSource = INSTANCE_DATA;

  formValues: any;
  ngOnInit() {
    this.sharedService.currentFormValues.subscribe(values => {
      this.formValues = values;
    });
    
    INSTANCE_DATA.push()
  }
}

