import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared/shared.module';
import { ReportDataService } from '../../report-data.service';
import { ReportServiceService } from '../../report-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  public reportsData:any = [
    {label:'OP Report', value:'OP_PATIENTS'},
    {label:'IP Report', value:'IP_PATIENTS'}
  ];
  public selectedCity:any;
  public reportResponseData:any = [];
  public defaultReportResponseData:any = [];
  public reportJsonStracture:any = [];
  public tableHeaders:any = [];
  public tableFilters:any = [];
  public blockedPanel: any = false;

  constructor(public reportData:ReportDataService, public reportService:ReportServiceService){}
  changeReport(reportData:any){
    this.reportResponseData = [];
    this.reportJsonStracture = [];
    this.tableHeaders = [];
    this.tableFilters = [];
    this.blockedPanel = true;
    setTimeout(() => {
    if(this.reportData.reportData.status == 200){
      this.reportResponseData = this.reportData.reportData.data[reportData]
     };
     
     if(this.reportResponseData.length > 0){
      this.reportResponseData = _.forEach(this.reportResponseData, (ele,ind) => {
        ele.sno = ind + 1
      })
      this.reportJsonStracture = this.reportService.reportsJSon[reportData];
      this.tableHeaders = this.reportJsonStracture.gridColumnsList || [];
      this.tableFilters = this.reportJsonStracture.inputControlsList || [];
      this.defaultReportResponseData = Object.assign([], this.reportResponseData)
       _.forEach(this.reportJsonStracture.masterDataForm, (ele, ind) => {
         ele.data = [...new Set(this.defaultReportResponseData.map((p: any) => p[ele.field]))].map(g => ({
           label: g === 'M' ? 'Male' : g === 'F' ? 'Female' : g,
           value: g
         }));
       });
     }
     this.blockedPanel = false;
      },3000);
    };


    searchData(field:any, value:any){
      this.reportResponseData = _.filter(this.defaultReportResponseData, (ele) => { return ele[field] == value})
    }
}
