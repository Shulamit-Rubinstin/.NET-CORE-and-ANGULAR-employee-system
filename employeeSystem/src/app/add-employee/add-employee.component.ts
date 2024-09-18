import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { RoleService } from '../role.service';
import { Role } from '../models/role.model';
import { CommonModule } from '@angular/common';
import { AddRoleComponent } from '../add-role/add-role.component';
import { Employee, RoleForEmployee } from '../models/employee.model';
import { FormBuilder,  } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../emloyee.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  AddRoleComponent],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {
  public emp: Employee = new Employee()
  public addForm!: FormGroup;
  public addRole: boolean = false;

  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.addForm = new FormGroup({
      "firstName": new FormControl(
        "", [Validators.required, Validators.minLength(2)]
      ),
      "lastName": new FormControl(
        "", [Validators.required, Validators.minLength(2)]
      ),
      "identity": new FormControl("", [Validators.minLength(9), Validators.maxLength(9)]),
    }
    )
  }
  saveEmployee() {
    if (this.addForm.valid) {
      const employeeData = this.addForm.value;
      const employeeRoles: RoleForEmployee[] = this.emp.roles; // מערך של תפקידים שהוקצו לעובד
  
      const employee = {
        ...employeeData,
        roles: employeeRoles, // וודא שהשדה roles הוא מערך ולא אובייקט יחיד
      };
  
      this.employeeService.saveEmployee(employee).subscribe(
        (response: any) => {
          console.log('עובד נשמר בהצלחה', response);
        },
        (error: any) => {
          console.error('שגיאה בשמירת עובד', error);
        }
      );
    }
  }
  
  
  // addRoleToEmployee(role: RoleForEmployee) {
  //   this.emp.roles.push(role); // מוסיף את התפקיד למערך של תפקידים
  // }
  addRoleToEmployee(role: RoleForEmployee | RoleForEmployee[]) {
  if (Array.isArray(role)) {
    // אם אתה מקבל מערך של תפקידים
    this.emp.roles.push(...role); // הוסף את כל התפקידים
  } else {
    // אם אתה מקבל תפקיד בודד
    this.emp.roles.push(role); // הוסף את התפקיד הבודד
  }
}
}
