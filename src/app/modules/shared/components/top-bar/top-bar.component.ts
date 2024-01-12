import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { ChangePasswordModalComponent } from '../modal/change-password-modal/change-password-modal.component';


@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  collapseSidebar = false;
  userFullName: string;
  lastNamePatientFilter: string = "";
  onUserFullNameChange: Subscription;
  @Output()
  toggleMenuEvent = new EventEmitter<boolean>();

  constructor(private router: Router, private modalService: NgbModal, private userService: UserService) {
    this.onUserFullNameChange = this.userService.userFullName.subscribe(event => {
      this.userFullName = event;
    })
  }

  ngOnInit(): void {
    this.userFullName = localStorage.getItem("userFullName") || "";
  }

  ngOnDestroy(){
    if (this.onUserFullNameChange){
      this.onUserFullNameChange.unsubscribe();
    }
  }

  signOut(){
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }

  openChangePasswordModal() {
    this.modalService.open(ChangePasswordModalComponent, {size: 'lg'});
  }

  searchPatientByLastName(){
    if (this.lastNamePatientFilter.trim().length > 0){
      this.router.navigateByUrl('/prospects/search-prospect?last_name=' + this.lastNamePatientFilter);
    }else{
      this.router.navigateByUrl('/prospects/search-prospect');
    }
  }

  toggleMenu(){
    this.collapseSidebar = !this.collapseSidebar;
    this.toggleMenuEvent.emit(this.collapseSidebar);
  }

}
