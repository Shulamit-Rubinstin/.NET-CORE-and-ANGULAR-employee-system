import { Role } from "./role.model";

export class RoleForEmployee {
  employeeId!: number;
  roleId!: number;
  startDate!: Date;
  isManager!: boolean;
  role!:Role;

}

export class Employee {
  id?: number;
  lastName!: string;
  firstName!: string;
  status!: boolean;
  roles!: RoleForEmployee[];
  entryDate!:Date;
}
