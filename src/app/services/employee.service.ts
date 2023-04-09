import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { EmployeeTimeSheet } from '../models/EmployeeTimesheet';
import { EmployeeData } from '../models/EmployeeData';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployeeList(): Observable<any> {
    return this.http
      .get(
        'https://rc-vault-fap-live-1.azurewebsites.net/api/gettimeentries?code=vO17RnE8vuzXzPJo5eaLLjXjmRW07law99QTD90zat9FfOQJKKUcgQ=='
      )
      .pipe(map((response: any) => this.employeeTotalHours(response)));
  }

  private employeeTotalHours(res: EmployeeTimeSheet[]): EmployeeData[] {
    const groupedData: { [key: string]: EmployeeData } = {};

    for (let i = 0; i < res.length; i++) {
      const item: EmployeeTimeSheet = res[i];
      const dateDifference = this.calcDifferenceBetweenDates(
        item.StarTimeUtc,
        item.EndTimeUtc
      );

      if (item.EmployeeName)
        if (groupedData[item.EmployeeName]) {
          groupedData[item.EmployeeName].DateDifference += dateDifference;
        } else {
          groupedData[item.EmployeeName] = {
            EmployeeName: item.EmployeeName,
            DateDifference: dateDifference,
          };
        }
    }

    const result = Object.values(groupedData);
    return result;
  }

  private calcDifferenceBetweenDates(start: string, end: string): number {
    const startDT: Date = new Date(start);
    const endDT: Date = new Date(end);
    const diffInMilliseconds = endDT.getTime() - startDT.getTime();
    const diffInHours = diffInMilliseconds / 1000 / 60 / 60; // convert milliseconds to hours
    return Math.floor(diffInHours);
  }
}
