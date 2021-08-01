import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILink } from '../../interfaces/link';
import { LinksService } from '../links.service';

@Component({
  selector: 'app-linkitem',
  templateUrl: './linkitem.component.html',
  styleUrls: ['./linkitem.component.css']
})
export class LinkitemComponent implements OnInit {
  isDeleted:boolean;
  @Input() link!:ILink;
  @Output() deleteBtn: EventEmitter<ILink> = new EventEmitter();
  constructor(private linkService:LinksService) {
    this.isDeleted=false;
   }

  ngOnInit(): void {
  }

  deleteEl(id: string): void {
    this.isDeleted = true;
    this.deleteBtn.emit();

    this.linkService.deleteLinkItem(id);

    const linkIndex = this.linkService.linksArray.findIndex(
      (x) => x == this.link
    );

    this.linkService.linksArray.splice(linkIndex, 1);
  }

  updateViews():void{
    this.linkService.updateViews(this.link);
  }

}
