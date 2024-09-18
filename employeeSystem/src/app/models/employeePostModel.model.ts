export interface RoleForEmployeePostModel {
  employeeId: number;
  roleId: number;
  startDate: Date;
  isManager: boolean;
}

export interface EmployeePostModel {
  id: number;
  lastName: string;
  firstName: string;
  status: boolean;
  roles: RoleForEmployeePostModel[];
}
