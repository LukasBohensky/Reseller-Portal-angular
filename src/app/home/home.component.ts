import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DetailsDialogComponent } from '../DialogComponents/DetailsDialog';
import { EditDialogComponent } from '../DialogComponents/EditDialog';
import { DeactivateDialogComponent } from '../DialogComponents/DeactivateDialog';
import { InstanceDialogComponent } from '../components/instance-dialog/instance-dialog.component';
import { MatMenu } from '@angular/material/menu';
import { MatMenuTrigger } from '@angular/material/menu';
import { FormService } from '../services/FormServices';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatButton } from '@angular/material/button';
import {CdkMenu, CdkMenuItem, CdkContextMenuTrigger} from '@angular/cdk/menu';



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
    MatTableModule, MatMenuModule, MatMenu, MatButton,
    CdkContextMenuTrigger, CdkMenu, CdkMenuItem],
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dataSource: any[] = [];
  dataSource_disabled: any[] = [];
  displayedColumns: string[] = [
    'Status',
    'Erstellungsdatum',
    'Kundenname',
    'Hostname',
    'E-Mail Adresse',
    'Actions'
  ]

  constructor(private formService: FormService, private dialog: MatDialog) {}

  ngOnInit(): void {

    this.getCustomers();

  }

  async getCustomers() {

    try {

      let customers = await this.formService.getCustomers().toPromise();
      let customersDisabled = await this.formService.getCustomersDisabled().toPromise();

      this.dataSource = customers as any;
      this.dataSource_disabled = customersDisabled as any;

    } catch(err) {

      console.log('Fehler beim laden der Kunden', err);

    }
  }

  openDetailsDialog(instance: Instance): void {

    console.log('details', instance);

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

  openDialog(instance: any, action: String) {

    let component = {title: '', action: ''};

    switch(action) {
      case 'activate': component.title = 'Aktivieren'; component.action = 'aktivieren'; break;
      case 'deactivate': component.title = 'Deaktivieren'; component.action = 'aktivieren'; break;
      case 'pay': component.title = 'Bezahlung'; component.action = 'bezahlen'; break;
      case 'delete': component.title = 'Löschen'; component.action = 'löschen'; break;
    }

    console.log('Instance übergeben an Dialog:', instance);

    const dialogRef = this.dialog.open(InstanceDialogComponent, {
      data: {
        instance,
        component,
        action,
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {

      if (result) {
        let result = null;
        console.log('Datensatz mit domainName: ' + instance.domainName + ' ' + component.action);

        switch(action) {
          case 'activate': result = await this.formService.activateCustomer(instance.domainName).toPromise(); break;
          case 'deactivate': result = await this.formService.deactivateCustomer(instance.domainName).toPromise(); break;
          case 'pay': result = await this.formService.startPayment(instance.domainName).toPromise(); break;
          case 'delete': result = await this.formService.deleteCustomer(instance.domainName).toPromise(); break;
        }

        if(result.status == 'ok') {
          console.log('API Antwort:', result);
          this.getCustomers();
        } else {
          console.error('Fehler beim ändern des Datensatz mit domainName: ' + instance.domainName);
        }

      }
    });

  }

  openContextMenu(event: MouseEvent, instance: Instance): void {
    event.preventDefault(); // Verhindert das Standard-Kontextmenü des Browsers
    this.menuTrigger.menuData = { item: instance }; // Setzt die aktuellen Daten für das Menü
    this.menuTrigger.openMenu(); // Öffnet das Kontextmenü
  }
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
}

