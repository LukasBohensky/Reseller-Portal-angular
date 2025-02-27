import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from '../DialogComponents/DetailsDialog';
import { EditDialogComponent } from '../DialogComponents/EditDialog';
import { DeactivateDialogComponent } from '../DialogComponents/DeactivateDialog';
import { MatMenu } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu';
import { FormService } from '../services/FormServices';
import { MatButton } from '@angular/material/button';
import {CdkContextMenuTrigger, CdkMenuTrigger} from "@angular/cdk/menu";
import {MatIcon} from "@angular/material/icon";
import {take} from "rxjs";

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
    MatTableModule, MatMenuModule, MatMenu, MatButton, CdkContextMenuTrigger, MatIcon],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //@ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  @ViewChild(MatMenuTrigger, { static: false }) contextMenu!: MatMenuTrigger;
  @ViewChild('contextMenuTrigger', { static: false }) contextMenuTrigger!: ElementRef;

  dataSource: any[] = [];
  displayedColumns: string[] = [
    'Status',
    'Erstellungsdatum',
    'Kundenname',
    'Hostname',
    'E-Mail Adresse',
    //'Actions'
  ]

  contextMenuInstance: any;

  constructor(private formService: FormService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.formService.getCustomers().subscribe(
      (data) => {
        this.dataSource = data;
      },
      (error) => {
        console.error('Fehler beim Abrufen der Daten:', error);
      }
    )
  }

  openContextMenu(event: MouseEvent, instance: any): void {
    event.preventDefault(); // Verhindert das Standard-Kontextmenü
    this.contextMenuInstance = instance;
    this.contextMenu.menuData = { instance };
    this.contextMenu.openMenu();
  }

  openDetailsDialog(instance: any): void {
    const dialogRef = this.dialog.open(DetailsDialogComponent, {
      data: instance,
      disableClose: true, // Verhindert das Schließen ohne Aktion
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Details-Dialog geschlossen.');
    });
  }


  openEditDialog(instance: any): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { ...instance } // Eine Kopie der Instanz-Daten übergeben
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // API-Aufruf zum Aktualisieren der Daten in der Datenbank
        this.formService.updateCustomer(result).subscribe(
          (response) => {
            console.log('Kunde erfolgreich aktualisiert:', response);

            // Lokale Datenquelle aktualisieren
            const index = this.dataSource.findIndex((i) => i.hostname === result.hostname);
            if (index !== -1) {
              // Nur die geänderte Instanz aktualisieren
              this.dataSource[index] = { ...result };
              this.dataSource = [...this.dataSource]; // Trigger für die Anzeige
            }
          },
          (error) => {
            console.error('Fehler beim Aktualisieren der Daten:', error);
          }
        );
      }
    });
  }

  openDeactivateDialog(instance: any): void {
    console.log('Instance übergeben an Dialog:', instance);

    const dialogRef = this.dialog.open(DeactivateDialogComponent, {
      data: instance, // Übergabe der Instanzdaten
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Lösche Datensatz mit domainName:', instance.domainName);
        this.formService.deleteCustomer(instance.domainName).subscribe(
          (response) => {
            console.log('Datensatz erfolgreich gelöscht:', response);

            // Lokale Datenquelle aktualisieren
            this.dataSource = this.dataSource.filter((i) => i.domainName !== instance.domainName);
          },
          (error) => {
            console.error('Fehler beim Löschen des Datensatzes:', error);
          }
        );
      }
    });
  }



  /*openEditDialog(instance: Instance): void {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: { ...instance } // Kopie der Daten übergeben
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.formService.updateCustomer(result).subscribe(
          (response) => {
            console.log('Kunde erfolgreich aktualisiert:', response);
            // Aktualisiere die Anzeige
            const index = this.dataSource.findIndex((i) => i.hostname === result.hostname);
            if (index !== -1) {
              this.dataSource[index] = result;
            }
          },
          (error) => {
            console.error('Fehler beim Aktualisieren der Daten:', error);
          }
        );
      }
    });
  }*/



  /*openDeactivateDialog(instance: Instance): void {
    const dialogRef = this.dialog.open(DeactivateDialogComponent, {
      data: instance, // Übergabe der Instanzdaten
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Entferne die deaktivierte Instanz aus der Tabelle
        this.dataSource = this.dataSource.filter((i) => i.hostname !== instance.hostname);

        console.log('Instanz deaktiviert:', instance.hostname);
      }
    });
  }*/



  /*openContextMenu(event: MouseEvent, instance: Instance): void {
    event.preventDefault(); // Verhindert das Standard-Kontextmenü des Browsers
    this.menuTrigger.menuData = { item: instance }; // Setzt die aktuellen Daten für das Menü
    this.menuTrigger.openMenu(); // Öffnet das Kontextmenü
  }
  */



  /*
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
  }*/
}

