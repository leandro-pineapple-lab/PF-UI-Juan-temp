import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LogAccessDataModel } from 'src/app/models/common/log/log-access.data.model';
import { CommonService } from 'src/app/services/common/common.service';
import { PagesConstants } from 'src/app/shared/constants/pages.constants';
import { UrlHelper } from 'src/app/shared/helpers/url-helper';

@Component({
  selector: 'app-homework-status',
  templateUrl: './homework-status.component.html',
  styleUrls: ['./homework-status.component.scss']
})
export class HomeworkStatusComponent implements OnInit {

  logAccessDataModel = new LogAccessDataModel();

  constructor(private commonService: CommonService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.logAccessData();
  }

  logAccessData(){
    this.logAccessDataModel.pageAccessed = PagesConstants.REPORTS_HOMEWORK_STATUS;
    this.logAccessDataModel.pageAccessedUrl = UrlHelper.getPageAccessedUrl();
    this.commonService.logAccess(this.logAccessDataModel).subscribe();
  }

}
