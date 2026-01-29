import { Routes } from '@angular/router';
import { ReportsComponent } from './reports/reports/reports.component';
import { ReportMainComponent } from './report-main/report-main.component';
import { TabledemoComponent } from './tabledemo/tabledemo.component';

export const routes: Routes = [
    { path: '', redirectTo: 'reports-main', pathMatch: 'full' },
    {path:'reports', component:ReportsComponent},
    {path:'reports-main',component:ReportMainComponent},
    {path:'reports-main/:id',component:ReportMainComponent},
    {path:'demo',component:TabledemoComponent}
];
