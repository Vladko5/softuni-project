import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksComponent } from './links/links.component';
import { LinkitemComponent } from './linkitem/linkitem.component';
import { LinksService } from './links.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    LinksComponent,
    LinkitemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers:[
    LinksService
  ]
})
export class LinkModule { }
