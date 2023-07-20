import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.interface';
import { FormService } from 'src/app/services/form.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  reactiveFormClientPut!: Client;

  //variable for take the id
  idClient!: number;

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    // INIT POST FORM

    this.mainForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      fiscalCode: new FormControl(null, Validators.required),
      dateOfBirth: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, Validators.required),
      netWorth: new FormControl(null, Validators.required),
    });
  }

  // form method that store the content from the form into an object
  onSubmit() {
    if (this.mainForm.valid) {
      this.isTableUpdated = false;
      this.reactiveFormClient = this.mainForm.value;
      this.formService.sendData(this.reactiveFormClient).subscribe((res) => {
        console.log(this.reactiveFormClient);
        this.isTableUpdated = true;
      });
    } else {
      alert('Form not Valid!');
    }
  }

  //linked to *ngIf to toggle the form for POST
  openForm(): boolean {
    return (this.isFormOpened = !this.isFormOpened);
  }
}
