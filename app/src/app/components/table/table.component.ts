import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.interface';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  dataSource!: Client[];
  dataFromServer!: Client[];

  constructor(private formService: FormService) {}

  ngOnInit() {
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
