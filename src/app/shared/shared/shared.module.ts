import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { BlockUIModule } from 'primeng/blockui';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { TabMenuModule } from 'primeng/tabmenu';
import { TabViewModule } from 'primeng/tabview';
import { HttpClientModule } from '@angular/common/http';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { RippleModule } from 'primeng/ripple';
import { PanelModule } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DragDropModule } from 'primeng/dragdrop';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DragDropModule,
    ButtonModule,
    CardModule,
    IconFieldModule,
    InputIconModule,
    FormsModule,
    RippleModule,
    DropdownModule,
    TableModule,
    PanelModule,
    PaginatorModule,
    BlockUIModule,
    HttpClientModule,
    TabMenuModule,
    ProgressSpinnerModule,
    InputTextModule,
    MessagesModule,
    TabViewModule
    // NoopAnimationsModule
    // BrowserModule,
    // BrowserAnimationsModule
  ],
  exports:[
    CommonModule,
    CardModule,
    DragDropModule,
    ButtonModule,
    IconFieldModule,
    RippleModule,
    PanelModule,
    MessagesModule,
    InputIconModule,
    DropdownModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    HttpClientModule,
    BlockUIModule,
    TabMenuModule,
    ProgressSpinnerModule,
    InputTextModule,
    TabViewModule
    // NoopAnimationsModule
    // BrowserModule,
    // BrowserAnimationsModule
  ]
})
export class SharedModule { }
