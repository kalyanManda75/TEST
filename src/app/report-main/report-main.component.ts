import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared/shared.module';
import { ReportChildComponent } from '../report-child/report-child.component';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-report-main',
  standalone: true,
  imports: [SharedModule, ReportChildComponent],
  templateUrl: './report-main.component.html',
  styleUrl: './report-main.component.css'
})
export class ReportMainComponent {
  public items: any = [
    { label: 'OP Reports', value: 0, param: '_OP' },
    { label: 'IP Reports', value: 1, param: '_IP' },
    { label: 'ER Reports', value: 2, param: '_ER' }
  ];
  public activeItem:any = 0;
  constructor(public route: ActivatedRoute, private router: Router){};
  public showReport:any = false;

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get('id')
        if(id){
          let data = _.filter(this.items, (ele) => {return ele.param == id.toUpperCase()});
          if(data.length > 0){
            this.activeItem = data[0].value;
            this.showReport = true;
          } 
        }else{
          this.activeItem = this.items[0].value;
          let url:any = `/reports-main/${this.items[0].param}`;
          // let url:any = `/patientslist/reports-main/${this.items[0].param}`;
          this.showReport = true;
          window.location.href = url;
        }
    }

     tabChange(event: any,tabIndex:any) {
        let url:any = `/reports-main/${this.items[tabIndex].param}`;
        // let url:any = `/patientslist/reports-main/${this.items[tabIndex].param}`;
        // this.router.navigateByUrl(url);
        // window.location.href = url
        this.router.navigate([url])
    }
}
