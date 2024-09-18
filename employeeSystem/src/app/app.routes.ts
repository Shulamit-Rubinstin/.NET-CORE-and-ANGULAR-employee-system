import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

export const routes: Routes = [
    { path: '', redirectTo: 'employee-table', pathMatch: 'full' },
    { path: 'employee-table', loadComponent: () => import('./employees-table/employees-table.component').then(c => c.EmployeesTableComponent) },
    { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'edit-employee/:id', component: EditEmployeeComponent },
    { path: '**', component: NotFoundComponent },
];
