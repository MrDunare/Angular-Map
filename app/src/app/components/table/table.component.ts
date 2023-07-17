import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Client } from 'src/app/models/client.interface';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  dataSource!: Client[];
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
