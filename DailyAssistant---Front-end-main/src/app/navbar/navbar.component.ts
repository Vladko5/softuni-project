import { Component, OnInit, Renderer2 } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private userService:UserService, private render:Renderer2) { }

  ngOnInit(): void {
  }

  clicked(clicked: any,other: any[]):void{
    if(!this.userService.isLogged){
      return;
    }
    this.render.setStyle(clicked,'background-color','rgb(2, 166, 216)')
    other.forEach(x=>this.render.setStyle(x,'background-color',' rgb(255, 255, 255)'));
  }
}