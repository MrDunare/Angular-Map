// Necessary imports from the @angular/core module and other external modules
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Client } from 'src/app/models/client.interface';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  // Array of Client objects representing the data displayed in the table
  dataSource!: Client[];

  // ID of the selected client in the table
  idClient!: number;

  // Property used to check if the table has been updated or not.
  @Input() isTableUpdated!: boolean;

  // Constructor of the class, performs dependency injection, including the FormService service
  constructor(private formService: FormService) {}

  // Method called at the start of the component's lifecycle
  ngOnInit() {
    // Make an HTTP request to get all Client objects from the server
    this.getFullData();
  }

  // Method called when any of the input properties changes, in this case, `isTableUpdated`
  ngOnChanges() {
    // If `isTableUpdated` changes, call the method to fetch the data from the server again
    this.getFullData();
  }

  // Method to get all Client objects from the server through the FormService service
  getFullData() {
    this.formService.getData().subscribe((data) => {
      // Update the dataSource array with the data obtained from the server
      this.dataSource = data;
    });
  }

  // Method to delete a client from the server using the FormService service
  deleteClient() {
    this.formService.deleteDataById(this.idClient).subscribe(() => {
      console.log(`Element number ${this.idClient} deleted successfully`);
      // After deletion, call the method to fetch all data from the server again
      this.getFullData();
    });
  }

  // Method to get a single Client object from the server using the FormService service
  getByID() {
    this.isTableUpdated = false;
    this.formService.getById(this.idClient).subscribe((data) => {
      console.log(data);
      // Reset the dataSource array with the single object obtained from the server
      this.dataSource = [data];
      this.isTableUpdated = true;
    });
  }

  // Method to update the table view
  updateTable() {
    // If the table has been updated, call the method to fetch all data from the server again
    if (this.isTableUpdated) {
      this.getFullData();
    }
  }

  // Array of strings defining the columns of the table
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
