import { Component, Inject, Input } from '@angular/core';
import { Employee, RoleForEmployee } from '../models/employee.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { EmployeePostModel, RoleForEmployeePostModel } from '../models/employeePostModel.model';
import { AddRoleComponent } from '../add-role/add-role.component';
import { Role } from '../models/role.model';
import { EmployeeService } from '../emloyee.service';


@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [FormsModule,CommonModule,ReactiveFormsModule,AddRoleComponent],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent {
  employee!: EmployeePostModel;
  public addRole: boolean = false;

  constructor (
    private dialogRef: MatDialogRef<EditEmployeeComponent>,
    private employeeService: EmployeeService,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data && data.employee) {
      this.employee = data.employee;
      console.log(this.employee);
      
    }
  }
  
  save() {
    console.log('Saving changes...');
    // קריאה לשירות לעדכון העובד
    this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe({
      next: (updatedEmployee) => {
        console.log('Employee updated successfully:', updatedEmployee);
        // סגירת הדיאלוג עם העובד המעודכן
        this.dialogRef.close(updatedEmployee);
      },
      error: (error) => {
        console.error('Error updating employee:', error);
        // טיפול בשגיאה
      }
    });
  }
  
  
  
  
  
  
  
  
  

  cancel() {
    // Implement cancel functionality here
    // This method will be called when the "Cancel" button is clicked
    console.log('Canceling changes...');
    this.dialogRef.close();
  }
  addRoleToEmployee(role: RoleForEmployee) {
    const roleForEmployee: RoleForEmployeePostModel = {
      employeeId: this.employee.id,
      roleId: role.roleId, // או אם השם של הפרמטר ב-Role הוא roleId, יש להשתמש ב- role.roleId
      startDate: new Date(), // תאריך ההתחלה כפי שרצית
      isManager: false // כאן נכניס את ערך ה- isManager המתאים
    };

    if (this.employee.roles) {
      this.employee.roles.push(roleForEmployee);
    } else {
      this.employee.roles = [roleForEmployee];
    }
}

  
}