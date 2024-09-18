import { Component } from '@angular/core';
import { Router,RouterOutlet } from '@angular/router';
import { EmployeesTableComponent } from "./employees-table/employees-table.component";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, EmployeesTableComponent]
})
export class AppComponent {
  title = 'employeeSystem';
}
