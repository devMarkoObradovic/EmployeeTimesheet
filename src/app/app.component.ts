import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { EmployeeService } from './services/employee.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartOptions } from './models/ChartOptions';
import { EmployeeData } from './models/EmployeeData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class AppComponent implements OnInit {
  title = 'Employee Timesheet';
  displayedColumns: string[] = ['EmployeeName', 'DateDifference', 'actions'];
  dataSource!: MatTableDataSource<EmployeeData>;

  chartOptions!: ChartOptions;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private empSerevice: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.empSerevice.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.setPieChart(this.dataSource.data);
      },
      error: console.log,
    });
  }

  setPieChart(data: EmployeeData[]) {
    this.chartOptions = {
      title: {
        text: 'Pie Chart for Employees Timesheet',
        align: 'center',
        style: {
          fontSize: '16px',
          fontWeight: '600',
        },
      },
      series: data.map((item: EmployeeData) => item.DateDifference),
      chart: {
        width: '100%',
        type: 'pie',
      },
      labels: data.map((item: EmployeeData) => item.EmployeeName),
      colors:['#41FF00', '#E91E63', '#9C27B0', '#B15928', '#FFFF99','#6A3D9A', '#CAB2D6', '#FEFF04'],
      legend: {
        position: 'bottom',
      },
    };
  }
}
