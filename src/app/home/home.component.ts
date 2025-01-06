import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../shared/shared.service'; 
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from '../DialogComponents/DetailsDialog';
import { EditDialogComponent } from '../DialogComponents/EditDialog';
import { DeactivateDialogComponent } from '../DialogComponents/DeactivateDialog';
import { MatMenu } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu';
import { FormService } from '../services/FormServices';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatButton } from '@angular/material/button';

export interface Instance {
  status: string;
  erstellungsdatum: string;
  anrede?: string;
  kontaktperson?: string;
  anschrift?: string;
  telefonnummer?: number;
  kundenname: string;
  hostname: string;
  email: string;
  user?: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  imports: [CommonModule, MatMenuTrigger,
    MatTableModule, MatMenuModule, MatMenu, MatButton],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;

  displayedColumns: string[] = ['Status', 'Erstellungsdatum', 'Kundenname', 'Hostname', 'E-Mail Adresse', 'Actions'];
  dataSource: MatTableDataSource<Instance> = new MatTableDataSource();

  constructor(private http: HttpClient, private formService: FormService, private dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('HomeComponent initialized');
    this.fetchForms();
  }

  fetchForms() {
    this.formService.getForms().subscribe({
      next: (data: Instance[]) => {
        // Ensure data is an array
        if (Array.isArray(data)) {
          this.dataSource.data = data;
          console.log('Forms fetched successfully:', this.dataSource.data);
          console.log('Forms fetched successfully:', data);
        } else {
          console.error('Fetched data is not an array:', data);
        }
      },
      error: (error) => {
        console.error('Error fetching forms:', error);
      }
    });
  }

  deleteRow(instance: any): void {
    // Remove the row from the dataSource
    this.dataSource.data = this.dataSource.data.filter(item => item !== instance);
  }

  // Funktion zum Öffnen des Details-Dialogs
  openDetailsDialog(instance: Instance) {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      data: instance,
      disableClose: true,
    });
  }

  // Funktion zum Öffnen des Bearbeitungs-Dialogs
  openEditDialog(instance: Instance) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: instance,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aktualisieren Sie die Daten in der Tabelle, wenn der Dialog mit Änderungen geschlossen wird
        const index = this.dataSource.data.findIndex(i => i.hostname === result.hostname);
        if (index !== -1) {
          this.dataSource.data[index] = result;
        }
      }
    });
  }

  // Funktion zum Öffnen des Deaktivierungs-Dialogs
  openDeactivateDialog(instance: Instance) {
    const dialogRef = this.dialog.open(DeactivateDialogComponent, {
      data: instance,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Entfernen der Instanz wenn deaktiviert
        this.dataSource.data = this.dataSource.data.filter(i => i.hostname !== instance.hostname);
      }
    });
  }

  // Funktion zum Öffnen des Kontextmenüs
  openContextMenu(event: MouseEvent, row: Instance) {
    event.preventDefault(); // Verhindert das Standard-Kontextmenü
    this.menuTrigger.menuData = { item: row }; // Setzt die Daten für das Menü
    this.menuTrigger.openMenu(); // Öffnet das Kontextmenü
  }
}

