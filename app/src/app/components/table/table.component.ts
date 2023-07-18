import { Component, Input, OnInit, OnChanges, ViewChild } from '@angular/core';
import { Client } from 'src/app/models/client.interface';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  dataSource!: Client[];
  //prendo l'id dal campo input
  idClient!: number;
  @Input() isTableUpdated!: boolean;

  constructor(private formService: FormService) {
    this.updateTable();
  }

  ngOnInit() {
    this.formService.getData().subscribe((data) => {
      this.dataSource = data;
      console.log(this.isTableUpdated);
    });
  }

  ngOnChanges() {
    this.formService.getData().subscribe((data) => {
      this.dataSource = data;
    });
  }
  deleteClient() {
    this.isTableUpdated = false;
    this.formService.deleteDataById(this.idClient).subscribe(
      () => {
        this.isTableUpdated = true;
        console.log('Elemento eliminato con successo');
        // Aggiorna la visualizzazione o gestisci altre operazioni dopo l'eliminazione
      },
      (error) => {
        console.error("Errore durante l'eliminazione:", error);
        // Gestisci l'errore in base alle tue esigenze
      }
    );
  }
  getByID() {
    this.isTableUpdated = false;
    this.formService.getById(this.idClient).subscribe((data) => {
      console.log(data);
      this.dataSource = [];
      this.dataSource.push(data);
      this.isTableUpdated = true;
    });
  }

  getFullData() {
    this.formService.getData().subscribe((data) => {
      this.dataSource = data;
    });
  }
  updateTable() {
    if (this.isTableUpdated)
      this.formService.getData().subscribe((data) => {
        this.dataSource = data;
      });
  }

  displayedColumns: string[] = [
    'id',
    'name',
    'surname',
    'email',
    'dateOfBirth',
    'fiscalCode',
    'username',
    'netWorth',
  ];
}
