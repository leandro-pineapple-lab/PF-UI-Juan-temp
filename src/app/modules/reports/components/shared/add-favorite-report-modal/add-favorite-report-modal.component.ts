import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { ReportService } from 'src/app/services/report/report.service';

@Component({
  selector: 'app-add-favorite-report-modal',
  templateUrl: './add-favorite-report-modal.component.html',
  styleUrls: ['./add-favorite-report-modal.component.scss']
})
export class AddFavoriteReportModalComponent implements OnInit {

  isFormValid = true;
  favoriteReport: FavoriteReportModel;
  constructor(public activeModal: NgbActiveModal, private toastr: ToastrService, private reportService: ReportService) { }

  ngOnInit(): void {
  }

  async addFavoriteReport(){
    this.isFormValid = true;
    if (!this.favoriteReport.title){
      this.toastr.error('Please fill the required fields');
      this.isFormValid = false;
      return;
    }
    try {
      const savedFavoriteReport: any = await this.reportService.addFavoriteReport(this.favoriteReport);
      if (savedFavoriteReport.hasErrors){
        this.toastr.error(savedFavoriteReport.errorMessage);
        return;
      }
      this.toastr.success('Favorite report has been successfully created');
      this.activeModal.close();
    } catch (e: any) {
      this.toastr.error(e.error, "Error");
    }
  }

}
