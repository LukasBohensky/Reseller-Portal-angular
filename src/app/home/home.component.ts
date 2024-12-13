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

const INSTANCE_DATA: Instance[] = [];


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [CommonModule, MatTableModule],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private sharedService: SharedService) {}

  displayedColumns: string[] = ['id', 'name', 'address', 'actions'];
  dataSource = INSTANCE_DATA;

  formValues: any;
  ngOnInit() {
    let found = false;
    let i = 0;
    this.sharedService.currentFormValues.subscribe(values => {
      if (values.first && values.second) {
        const Instance: Instance = {
          id: id++,
          name: values.first,
          address: values.second
        }
        while (!found && INSTANCE_DATA.length > i) {
          if (INSTANCE_DATA.length > i) {
            if (INSTANCE_DATA[i].name === values.first && INSTANCE_DATA[i].address === values.second) {
              found = true;
          }
          i++;
        }}
        i = 0;
        if (!found) {
          INSTANCE_DATA.push(Instance);
        } 
      this.dataSource = [...INSTANCE_DATA];
    }});
  }

  deleteRow(instance: any): void {
    // Remove the row from the dataSource
    this.dataSource = this.dataSource.filter(item => item !== instance);
  }
}

