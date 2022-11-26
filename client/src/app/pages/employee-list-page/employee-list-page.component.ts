import { Component } from '@angular/core';

@Component({
  selector: 'app-employee-list-page',
  templateUrl: './employee-list-page.component.html',
  styleUrls: ['./employee-list-page.component.scss']
})
export class EmployeeListPageComponent {
  employeeList = [{name: "Kamil", status: "Active"}, {name: "Aleksey", status: "Inactive"}, {name: "Danil", status: "Deactive"}];
}
