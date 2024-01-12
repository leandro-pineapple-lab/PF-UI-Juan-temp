import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FavoriteReportsModalComponent } from '../favorite-reports-modal/favorite-reports-modal.component';
import { AddFavoriteReportModalComponent } from '../add-favorite-report-modal/add-favorite-report-modal.component';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';
import { FavoriteReportUtils } from 'src/app/shared/utils/report/favorite-report.utils';

@Component({
  selector: 'app-report-actions',
  templateUrl: './report-actions.component.html',
  styleUrls: ['./report-actions.component.scss']
})
export class ReportActionsComponent implements OnInit {

  @Input()
  title = '';
  @Input()
  favoriteReports: FavoriteReportModel[] = [];
  @Input()
  favoriteReport = new FavoriteReportModel();
  @Input()
  reportFilters: any;
  @Output()
  getFavoriteReportsEvent = new EventEmitter();
  @Output()
  getReportsEvent = new EventEmitter();

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openMyFavoriteReportsModal(){
    const activeModal = this.modalService.open(FavoriteReportsModalComponent);
    activeModal.componentInstance.favoriteReports = this.favoriteReports;
    activeModal.componentInstance.title = `Favorite ${this.title} Reports`;
  }

  openAddFavoriteReportModal(){
    this.favoriteReport.title = this.title;
    this.favoriteReport.params = FavoriteReportUtils.convertToFavoriteReportParams(this.reportFilters);
    this.favoriteReport.params = this.favoriteReport.params.filter(x => x.key);
    const activeModal = this.modalService.open(AddFavoriteReportModalComponent);
    activeModal.componentInstance.favoriteReport = this.favoriteReport;
    activeModal.result.then(() => {
      this.getFavoriteReportsEvent.emit();
    });
  }

  getReport(){
    this.getReportsEvent.emit();
  }
}
