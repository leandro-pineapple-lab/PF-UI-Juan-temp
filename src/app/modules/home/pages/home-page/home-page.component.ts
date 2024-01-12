import { Component, ElementRef, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user/user.model';
import { UserService } from 'src/app/services/user/user.service';
import {Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
