// Necessary imports from the @angular/core module and other external modules
import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Client } from 'src/app/models/client.interface';
import { FormService } from 'src/app/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  // Array of Client objects representing the data displayed in the table
  dataSource!: Client[];

  //Formgroup to update single Client
 

  // ID of the selected client in the table
  idClient!: number;
  clientUsername!: string;

  // Property used to check if the table has been updated or not.
  @Input() isTableUpdated!: boolean;

  // Constructor of the class, performs dependency injection, including the FormService service
  constructor(private formService: FormService) {}

  //Form update
    updateForm = new FormGroup({
    name: new FormControl('Tonino'),
    surname: new FormControl(),
    fiscalCode: new FormControl(),
    dateOfBirth: new FormControl(),
    email: new FormControl(),
    username: new FormControl(),
    netWorth: new FormControl(),
  });


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
      console.log(this.dataSource)
    });
  }

  // Method to delete a client from the server using the FormService service
  deleteClient(id: number) {
    this.formService.deleteDataById(id).subscribe(() => {
      console.log(`Element number ${id} deleted successfully`);
      // After deletion, call the method to fetch all data from the server again
      this.getFullData();
    });
  }

  // Method to get a single Client object from the server using the FormService service
  getUsername() {
    let id = this.getIdbyUsername(this.clientUsername)
    this.isTableUpdated = false;
    this.formService.getUser(id).subscribe((data) => {
      console.log(data);
      // Reset the dataSource array with the single object obtained from the server
      this.dataSource = [data];
      this.isTableUpdated = true;
    });
  }

// Method that return id of client from username
  getIdbyUsername(username:string):number{
    let userId:number = 0;
    this.dataSource.forEach(element => {
      if(element.username === username)
        userId = element.id
    });
    return userId;

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
    'actions',
  ];



  


}
