import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';

import * as XLSX from 'xlsx'; 
import { saveAs } from 'file-saver';

import { EmployeeService } from '../emloyee.service';
import { Employee } from '../models/employee.model';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog';
import { EditEmployeeComponent } from '../edit-employee/edit-employee.component';

@Component({
  selector: 'app-employees-table',
  standalone: true,
  imports: [CommonModule,MatIconModule, ReactiveFormsModule, MatIconModule, MatTooltipModule, MatTableModule, MatPaginatorModule, MatFormFieldModule, MatInputModule, AddEmployeeComponent, MatToolbarModule],
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.css']
})
export class EmployeesTableComponent implements OnInit {
  displayedColumns: string[] = ['lastName', 'firstName', 'actions'];
  employees: MatTableDataSource<Employee> = new MatTableDataSource<Employee>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filterValue: string = ''; // Define a property to hold the filter value

  addEmp: boolean = false

  constructor(private employeeService: EmployeeService ,private dialog: MatDialog, private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getAllEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = new MatTableDataSource(data);
        this.employees.paginator = this.paginator;
        console.log("employees", this.employees);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employees.filter = filterValue.trim().toLowerCase();
  }

  editEmployee(employee: Employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    dialogConfig.height = '50%';
  
    // הגדרת הנתונים שתשלח לקומפוננטת העריכה
    dialogConfig.data = {
      employee: employee
    };
  
    // פתיחת דיאלוג העריכה
    const dialogRef = this.dialog.open(EditEmployeeComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(formData => {
      if (formData) {
        console.log('Form data:', formData);
      } else {
        console.log('Dialog closed without form data');
      }
    });
  }
  

  deleteEmployee(employeeId: number) {
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (res) => {
        console.log(res);
        // Remove the employee from the local data array
        this.employees.data = this.employees.data.filter(employee => employee.id !== employeeId);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addRole(employee: Employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '70%';
    dialogConfig.height = '70%';
 
    const dialogRef = this.dialog.open(EditEmployeeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(formData => {
      if (formData) {
        console.log('Form data:', formData);
      } else {
        console.log('Dialog closed without form data');
      }
    });  }
  openAddEmployeeDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '70%';
    dialogConfig.height = '70%';
 
    const dialogRef = this.dialog.open(AddEmployeeComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(formData => {
      if (formData) {
        console.log('Form data:', formData);
      } else {
        console.log('Dialog closed without form data');
      }
    });
  }
  
  downloadData() {
 
    const data: any[] = this.employees.filteredData.map((employee: Employee) => {
      return {
        'שם פרטי': { v: employee.firstName, t: 's', s: { alignment: { horizontal: 'right' } } },
        'שם משפחה': { v: employee.lastName, t: 's', s: { alignment: { horizontal: 'right' } } },
        'תעודת זהות': { v: employee.id, t: 's', s: { alignment: { horizontal: 'right' } } },
      };
    });
  
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    saveAs(blob, 'employees.xlsx');
  }
  
}
