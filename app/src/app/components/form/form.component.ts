import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.interface';
import { FormService } from 'src/app/services/form.service';
import {
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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




  //variable for take the id
  idClient!: number;

  constructor(
    private formService: FormService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // INIT POST FORM

    this.mainForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      surname: new FormControl(null, Validators.required),
      fiscalCode: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[A-Z]{6}\\d{2}[A-Z]\\d{2}[A-Z]\\d{3}[A-Z]$'),
      ]),
      dateOfBirth: new FormControl(null, [
        Validators.required,
        this.dateValidator,
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      username: new FormControl(null, Validators.required),
      netWorth: new FormControl(null, Validators.required),
    });
  }

  //---------------------------------------------------------------------Date Validation, format DD/MM/YYYY-------------------------
  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) {
      return { invalidDate: true };
    }

    const parts = value.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      return { invalidDate: true };
    }

    //---------------------------------------------------------------------Fiscal Code Validator-------------------------------------

    // Controllo per verificare la validità della data (ad esempio, non accettare il 30 febbraio)
    const date = new Date(year, month - 1, day);
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      return { invalidDate: true };
    }

    return null;
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
      this.openSnackBar('The form is not Valid!!!');
      setTimeout(() => {
        this._snackBar.dismiss();
      }, 3000);
    }
  }

  //linked to *ngIf to toggle the form for POST
  openForm(): boolean {
    return (this.isFormOpened = !this.isFormOpened);
  }

  //Snackbar

  openSnackBar(message: string) {
    this._snackBar.open('The form is not Valid!!!');
  }
}
