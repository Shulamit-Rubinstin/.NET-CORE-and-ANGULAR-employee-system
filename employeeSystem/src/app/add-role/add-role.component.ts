// // import { Component, EventEmitter, OnInit, Output } from '@angular/core';

// // import { RoleService } from '../role.service';
// // import { Role } from '../models/role.model';
// // import { CommonModule } from '@angular/common';
// // import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// // import { MatFormField, MatFormFieldControl, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
// // import { MatInputModule } from '@angular/material/input';
// // import { Employee, RoleForEmployee } from '../models/employee.model';

// // @Component({
// //   selector: 'app-add-role',
// //   standalone: true,

// //   imports: [CommonModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatFormField, MatLabel],
// //   templateUrl: './add-role.component.html',
// //   styleUrls: ['./add-role.component.css'] 
// // })
// // export class AddRoleComponent implements OnInit {
// //   public role!: any;
// //   public roles!:  Role[];
// //   public addRole!: FormGroup;
// //   public showFromDate?: Date;

// //   @Output()
// //   public onSave: EventEmitter<RoleForEmployee> = new EventEmitter<RoleForEmployee>();
// //   employeeId?: number;

// //   constructor(private roleService: RoleService) { };

// //   ngOnInit() {
// //     this.roleService.get().subscribe({
// //       next: (res) => {
// //         this.roles = res;
// //         console.log(this.roles);
        
// //         this.role = this.roles.map((r) => {
// //           return {
// //             id: r.id,
// //             name: r.name,
// //             selected: false
// //           }
// //         })
// //       },
// //       error: (err) => {
// //         console.log(err);
// //       }
// //     })
// //     this.addRole = new FormGroup({
// //       "roleId": new FormControl(""),
// //       "isManager": new FormControl(false),
// //       "startDate": new FormControl("")
// //     })
// //   }

 
// //   save() {
// //     const selectedRole = this.roles.find(r => r.id === this.addRole.controls['roleId'].value);

// //     if (selectedRole) {
// //         const roleForEmployee: RoleForEmployee = {
// //             employeeId: this.employeeId||0, // וודאי שה-employeeId נכון, את צריכה לשלוח אותו מהקומפוננטה או מהקונטקסט
// //             roleId: selectedRole.id,
// //             startDate: this.addRole.controls['startDate'].value,
// //             isManager: this.addRole.controls['isManager'].value,
// //             role: selectedRole // השתמשי ב-Role עבור הפרטים הכלליים של התפקיד
// //         };

// //         this.onSave.emit(roleForEmployee); // שדרי את האובייקט המתוקן של RoleForEmployee
// //     }
// // }
// //   minDate(){
// //     this.showFromDate=this.roles[this.roles.findIndex((r) => { return r.id == this.addRole.controls['roleId'].value})].entryDate
// //   }
// // }
// import { Component, EventEmitter, OnInit, Output } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';  // כאן חשוב ייבוא של ReactiveFormsModule
// import { RoleService } from '../role.service';
// import { Role } from '../models/role.model';
// import { Employee, RoleForEmployee } from '../models/employee.model';

// @Component({
//   selector: 'app-add-role',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './add-role.component.html',
//   styleUrls: ['./add-role.component.css'] 
  
// })
// export class AddRoleComponent implements OnInit {
//   public role!: any;
//   public roles!: Role[];
//   public addRole!: FormGroup;
//   public showFromDate?: Date;
//   public roleAlreadySelected = false; // משתנה עבור הצגת הודעה על תפקיד שכבר נבחר
//   @Output()
//   public onSave: EventEmitter<RoleForEmployee> = new EventEmitter<RoleForEmployee>();
//   employeeId?: number;
//   employeeRoles: RoleForEmployee[] = []; // ודאי שהרשימה ריקה בהתחלה

//   constructor(private roleService: RoleService) {}

//   ngOnInit() {
//     // קבלת רשימת תפקידים מהשירות
//     this.roleService.get().subscribe({
//       next: (res) => {
//         this.roles = res;
//         this.employeeRoles = this.getSelectedRolesForEmployee(); // ודאי שהקומפוננטה מקבלת את התפקידים שנבחרו לעובד
//         this.role = this.roles.map((r) => {
//           return {
//             id: r.id,
//             name: r.name,
//             selected: false
//           }
//         });
//       },
//       error: (err) => {
//         console.log(err);
//       }
//     });

//     // הגדרת טופס
//     this.addRole = new FormGroup({
//       "roleId": new FormControl(""),
//       "isManager": new FormControl(false),
//       "startDate": new FormControl("")
//     });
//   }

//   // פונקציה לבדיקת תפקיד שכבר נבחר
//   isRoleSelected(roleId: number): boolean {
//     return this.employeeRoles.some(r => r.roleId === roleId); // בדיקה אם התפקיד כבר קיים ברשימה
//   }

//   // קבלת רשימת התפקידים שנבחרו
//   getSelectedRolesForEmployee(): RoleForEmployee[] {
//     // צריך להחליף את זה במידע המגיע מהשירות/קומפוננטה אחרת
//     return this.employeeRoles;
//   }

//   // שמירת התפקיד
//   save() {
//     const selectedRoleId = this.addRole.controls['roleId'].value;

//     // בדיקה אם התפקיד כבר נבחר
//     const roleAlreadyExists = this.isRoleSelected(selectedRoleId);

//     if (roleAlreadyExists) {
//       this.roleAlreadySelected = true; // הצגת הודעה
//       return; // מניעת שמירה
//     } else {
//       this.roleAlreadySelected = false;
//     }

//     const selectedRole = this.roles.find(r => r.id === selectedRoleId);
//     if (selectedRole) {
//       const roleForEmployee: RoleForEmployee = {
//         employeeId: this.employeeId || 0,
//         roleId: selectedRole.id,
//         startDate: this.addRole.controls['startDate'].value,
//         isManager: this.addRole.controls['isManager'].value,
//         role: selectedRole
//       };

//       this.onSave.emit(roleForEmployee);
//     }
//   }

//   // עדכון תאריך מינימלי
//   minDate() {
//     const selectedRoleId = this.addRole.controls['roleId'].value;
//     const selectedRole = this.roles.find((r) => r.id === selectedRoleId);
//     this.showFromDate = selectedRole ? selectedRole.entryDate : undefined;
//   }
// }
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { RoleService } from '../role.service';
import { RoleForEmployee } from '../models/employee.model';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-add-role',
  standalone: true,  // ציון שהקומפוננטה היא עצמאית
  imports: [
    CommonModule,
    ReactiveFormsModule,  // תומך בטפסים ריאקטיביים
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  public roles: any[] = [];
  public employeeRoles: RoleForEmployee[] = [];
  public addRole!: FormGroup;
  public showFromDate: Date | undefined;
  
  @Output() public onSave: EventEmitter<RoleForEmployee> = new EventEmitter<RoleForEmployee>();

  constructor(private roleService: RoleService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.addRole = new FormGroup({
      "roleId": new FormControl("", Validators.required),
      "isManager": new FormControl(false),
      "startDate": new FormControl("", Validators.required)
    });

    this.roleService.get().subscribe({
      next: (res) => {
        this.roles = res.map(role => ({ ...role, disabled: false }));
      },
      error: (err) => {
        console.log('Error fetching roles:', err);
      }
    });
  }

  isRoleSelected(roleId: number): boolean {
    return this.employeeRoles.some(r => r.roleId === roleId);
  }

  saveRole() {
    const selectedRoleId = this.addRole.controls['roleId'].value;
  
    if (this.isRoleSelected(selectedRoleId)) {
      this.snackBar.open('התפקיד כבר נבחר, בחר תפקיד אחר!', '', { duration: 3000 });
      return;
    }
  
    const selectedRole = this.roles.find(role => role.id === selectedRoleId);
    if (selectedRole) {
      this.employeeRoles.push({
        employeeId: 0,
        roleId: selectedRole.id,
        isManager: this.addRole.controls['isManager'].value,
        startDate: this.addRole.controls['startDate'].value,
        role: selectedRole
      });
  
      this.snackBar.open('התפקיד נוסף בהצלחה!', '', { duration: 3000 });
  
      this.roles = this.roles.map(role =>
        role.id === selectedRole.id ? { ...role, disabled: true } : role
      );
  
      this.addRole.reset();
    }
  }
  
saveEmployee() {
  if (this.employeeRoles.length > 0) {
    this.onSave.emit(this.employeeRoles[this.employeeRoles.length - 1]); // שלח את התפקיד האחרון או בחר תפקיד אחד
    this.snackBar.open('העובד נוסף למערכת בהצלחה עם כל התפקידים!', '', { duration: 3000 });
  } else {
    this.snackBar.open('בחר לפחות תפקיד אחד לעובד!', '', { duration: 3000 });
  }
}
}
