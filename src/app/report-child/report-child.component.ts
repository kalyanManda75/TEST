import { ChangeDetectorRef, Component,OnDestroy, ViewChild, ElementRef, AfterViewInit, HostListener   } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { ReportDataService } from '../report-data.service';
import { ReportServiceService } from '../report-service.service';
import { SharedModule } from '../shared/shared/shared.module';
import { BlockUI } from 'primeng/blockui';

interface PageEvent {
    first: number;
    rows: number;
    page: number;
    pageCount: number;
}

@Component({
  selector: 'app-report-child',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './report-child.component.html',
  styleUrl: './report-child.component.css'
})
export class ReportChildComponent {
  constructor(public route: ActivatedRoute,public cd:ChangeDetectorRef, public reportData:ReportDataService, public reportService:ReportServiceService){}
  public reportId:any = '';
  globalSearchText: string = '';
  public selectedCity:any;
  first: number = 0;
  rows: number = 10;
  totalRecords:any = 0;
  public reportResponseData:any = [];
  public defaultReportResponseData:any = [];
  public reportJsonStracture:any = [];
  public globalSearchKeys:any = [];
  public tableHeaders:any = [];
  public messages :any = [];
  public blockedPanel: any = false;
   transform(value: any, search: string,product:any): { text: string; highlight: boolean }[] {
    if (!value || !search) return [{ text:product.tag ? product.tag.replace("{{text}}", value): value,highlight:false}];

    const regex = new RegExp(`(${search})`, 'gi');
     return value
    .toString()
    .split(regex)
    .map((part:any) => ({
      text: product.tag ? product.tag.replace("{{text}}", part): part,
      highlight: regex.test(part)
    }));
    return value.toString().replace(regex, `<span class="mark">$1</span>`);
  }

  async ngOnInit(){
    this.reportId = '';
    this.reportId = this.route.snapshot.paramMap.get('id');
    if(this.reportId){
      await this.getReportData(this.reportId)
    };
     window.addEventListener('keydown', async (event: KeyboardEvent) => {
    if (event.key === 'Enter' && this.reportJsonStracture.isPagedDataSource) {
      await this.getReportData(this.reportId)
    }
  });
  };

  async getReportData(id:any){
    this.reportResponseData = [];
    this.reportJsonStracture = [];
    this.tableHeaders = [];
    this.messages = [];
    this.blockedPanel = true;
    let reportUrl:any = this.reportId.toUpperCase();
    this.reportJsonStracture = this.reportService.reportsJSon[reportUrl];
    this.globalSearchKeys = this.reportService.reportsJSon[reportUrl].globalSearchKeys;
    let resData: any = await this.reportService.postAnonymousCalls((this.reportJsonStracture.apiPath), this.reportJsonStracture.payload);
      if (resData.statusCode == 200) {
          this.reportResponseData = resData.data || [];
          this.totalRecords = [null,undefined,''].includes(resData.totalRecords) ? this.reportResponseData.length : resData.totalRecords || 0;
        if (this.reportResponseData.length > 0) {
          this.reportResponseData = _.forEach(this.reportResponseData, (ele, ind) => {
            ele.sno = ind + 1
            ele.sno = ele.sno.toString();
          })
          
          this.tableHeaders = this.reportJsonStracture.gridColumnsList || [];
          this.defaultReportResponseData = Object.assign([], this.reportResponseData)
        }
         this.blockedPanel = false
        this.reportService.prepairMasterData(this.reportJsonStracture.masterDataForm, this.reportResponseData)
    }else{
      this.tableHeaders = this.reportJsonStracture.gridColumnsList || [];
      this.blockedPanel = false;
      this.totalRecords = 0;
      this.messages = [{ severity: 'info', detail: 'No Data Found.' }];
    }    
  };

  async onPageChange(event: any) {
        this.first = event.first;
        this.rows = event.rows;
        this.reportService.reportsJSon[this.reportId].payload['pageNo'] = event.first + 1;
        this.reportService.reportsJSon[this.reportId].payload['pageSize'] = event.rows;
        // {
        //   "pageNo": event.first + 1,
        //   "pageSize": event.rows
        // }
        await this.getReportData(this.reportId)
    };

    calculateCustomerTotal(name: string) {
        let total = 0;

        if (this.reportResponseData) {
            for (let customer of this.reportResponseData) {
                if (customer[this.reportJsonStracture.groupRowsBy.name] === name) {
                    total++;
                }
            }
        }

        return total;
    };

    async searchField(input:any,field:any){
      let searchedObject:any = {};
      _.forEach(this.tableHeaders, (ele,ind) => {
        if(![null, undefined, ''].includes(ele.searchData)){
          searchedObject[ele.field] = ele.searchData;
        }
      });
      this.reportService.reportsJSon[this.reportId].payload['pageNo'] = 1;
      this.first = 1;
      this.reportService.reportsJSon[this.reportId].payload['searchedObject'] = searchedObject;
        // await this.getReportData(this.reportId);

    };

    async onSort(event:any){
      let orderingObject:any = {};
      console.log('e',event)
      if(event.sortField || event.filters?.global){
        this.reportService.reportsJSon[this.reportId].payload['pageNo'] = 1;
        this.first = 1;
        if(event.sortField){
          orderingObject[event.sortField] = event.sortOrder == 1 ? 'asc' : 'desc';
          this.reportService.reportsJSon[this.reportId].payload['orderingObj'] = orderingObject;
          await this.getReportData(this.reportId);
        };
        if(event.filters?.global){
          this.reportService.reportsJSon[this.reportId].payload['globalFilter'] = event.filters?.global;
        }
        // await this.getReportData(this.reportId);
      }else{
        this.reportService.reportsJSon[this.reportId].payload['globalFilter'] = {};
        // await this.getReportData(this.reportId);
      }
      
    };

    selectedOrder: any = null;

onCellClick(item: any, product: any) {
  if (item.field === "MOBILE_NO") {   // Only for mobile column
    this.selectedOrder = product;
  }
}

closeDetails() {
  this.selectedOrder = null;
}

handleSort(event: any) {
  console.log("🔥 Normal Sort Event →", event);
  console.log("Sorted Field:", event.sortField);
  console.log("Order:", event.sortOrder); // 1=ASC, -1=DESC
}

}
