// Necessary imports from the @angular/core module and other external modules
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Client } from 'src/app/models/client.interface';
import { FormService } from 'src/app/services/form.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  clientUsername!: string;

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
      console.log(this.dataSource);
    });
  }

  // Method to delete a client from the server using the FormService service
  deleteClient(id: number) {
    if (window.confirm('Do you really want to delate this user??')) {
      this.formService.deleteDataById(id).subscribe(() => {
        console.log(`Element number ${id} deleted successfully`);
        // After deletion, call the method to fetch all data from the server again
        this.getFullData();
      });
    }
  }

  // Method to get a single Client object from the server using the FormService service
  getUsername() {
    let id = this.getIdbyUsername(this.clientUsername);
    this.isTableUpdated = false;
    this.formService.getUser(id).subscribe((data) => {
      console.log(data);
      // Reset the dataSource array with the single object obtained from the server
      this.dataSource = [data];
      this.isTableUpdated = true;
    });
  }

  // Method that return id of client from username
  getIdbyUsername(username: string): number {
    let userId!: number;
    this.dataSource.forEach((element) => {
      if (element.username === username) userId = element.id;
    });
    return userId;
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
    'actions',
    'update',
  ];

  //-------------------------------------------------------------------------Form--------------------------------------------------------------------------------------

  //Form update
  updateForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    surname: new FormControl(null, Validators.required),
    fiscalCode: new FormControl(null, Validators.required),
    dateOfBirth: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, Validators.required),
    netWorth: new FormControl(null, Validators.required),
  });

  isFormToggle: boolean = false;
  updatedClient!: object;
  updatedId: number = 0;

  //Method to toggle off and on updateForm, is linked to update button in the table.
  openForm(id: number) {
    this.updatedId = id;
    console.log(id);
    this.isFormToggle = !this.isFormToggle;
    // this.updateForm.patchValue(this.dataSource[this.updatedId]);
  }

  //Method that takes param. from updateForm and create a Client type obj
  updatedFormResult() {
    this.updatedClient = this.updateForm.value;
    this.formService
      .updateClient(this.updatedId, this.updatedClient)
      .subscribe(() => {
        this.getFullData();
        this.isFormToggle = false;
      });
  }
}
