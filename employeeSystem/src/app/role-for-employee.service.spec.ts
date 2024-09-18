// import { TestBed } from '@angular/core/testing';

// import { RoleForEmployeeService } from './role-for-employee.service';

// describe('RoleForEmployeeService', () => {
//   let service: RoleForEmployeeService;

//   beforeEach(() => {
//     TestBed.configureTestingModule({});
//     service = TestBed.inject(RoleForEmployeeService);
//   });

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
// });
import { TestBed } from '@angular/core/testing';
import { RoleForEmployeeService } from './role-for-employee.service';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // ייבוא נכון של HttpClientTestingModule

describe('RoleForEmployeeService', () => {
  let service: RoleForEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // מוסיפים את HttpClientTestingModule
      providers: [RoleForEmployeeService],
    });
    service = TestBed.inject(RoleForEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
