import { Component, OnInit } from '@angular/core';
import { LinksService } from '../links.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.css']
})
export class LinksComponent implements OnInit {
  isClicked: boolean;
  linkService:LinksService;
  constructor( linkService:LinksService) {
    this.isClicked=false;
    this.linkService=linkService;
   }

  ngOnInit(): void {
  }

  toggleInfo():void{
    this.isClicked=!this.isClicked;
    if(this.isClicked){
      this.linkService.getLinkArray().subscribe();
    }
  }
}
