import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FavoriteReportModel } from 'src/app/models/report/favorite-report/favorite-report.model';

@Component({
  selector: 'app-favorite-reports-modal',
  templateUrl: './favorite-reports-modal.component.html',
  styleUrls: ['./favorite-reports-modal.component.scss']
})
export class FavoriteReportsModalComponent implements OnInit {

  favoriteReports: FavoriteReportModel[];
  title: string;

  constructor(public activeModal: NgbActiveModal, private router: Router) { }

  ngOnInit(): void {
  }

  goToEditReportPage(favoriteReport: FavoriteReportModel){
    this.activeModal.dismiss();
    this.router.navigate(['/settings/favorite-reports/'], {
        queryParams: { reportId: favoriteReport.id }
    });
  }

}
