import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.interface';
import { FormService } from 'src/app/services/form.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {


  //Booleans to toggle off form for both POST and PUT https methods
  isFormOpened: boolean = false;
  isFormPutOpened: boolean = false;
  isTableUpdated: boolean = false;

  //reactiveForm data POST
  mainForm!: FormGroup;
  reactiveFormClient!: Client;

//ReactiveForm data PUT
  mainFormPut!: FormGroup;

  constructor(private formService: FormService) {}



  ngOnInit(): void {
    // INIT POST FORM

    this.mainForm = new FormGroup({
      name: new FormControl('Tonino'),
      surname: new FormControl(),
      fiscalCode: new FormControl(),
      dateOfBirth: new FormControl(),
      email: new FormControl(),
      username: new FormControl(),
      netWorth: new FormControl(),
    });

//INIT PUT FORM
    this.mainFormPut = new FormGroup({
      name: new FormControl('pluto'),
      surname: new FormControl(),
      fiscalCode: new FormControl(),
      dateOfBirth: new FormControl(),
      email: new FormControl(),
      username: new FormControl(),
      netWorth: new FormControl(),
    });


   
  }

  // form method that store the content from the form into an object
  onSubmit() {
    this.isTableUpdated = false;
    this.reactiveFormClient = this.mainForm.value;
    this.formService.sendData(this.reactiveFormClient).subscribe((res) => {
      console.log(this.reactiveFormClient);
      this.isTableUpdated = true;
    });
  }

  //linked to *ngIf to toggle the form for POST
  openForm(): boolean {
    return (this.isFormOpened = !this.isFormOpened);
  }

 //linked to *ngIf to toggle the form for PUT
  openFormPut(): boolean {
    return (this.isFormPutOpened = !this.isFormPutOpened);
  }
}
