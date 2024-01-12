import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BudgetModel } from 'src/app/models/referral/budget.model';
import { MarketingService } from 'src/app/services/marketing/marketing.service';

@Component({
  selector: 'app-marketing-budget',
  templateUrl: './marketing-budget.component.html',
  styleUrls: ['./marketing-budget.component.scss']
})
export class MarketingBudgetComponent implements OnInit {
  budgetsList: BudgetModel[] = [];
  newBudget: BudgetModel = new BudgetModel();
  selectedBudget: BudgetModel = new BudgetModel();
  closeResult: string = "";
  currentYear = new Date().getFullYear();
  selectedYear = new Date().getFullYear();
  yearsList: number[] = [];
  januaryBudget: number = 0;
  februaryBudget: number = 0;
  marchBudget: number = 0;
  aprilBudget: number = 0;
  mayBudget: number = 0;
  juneBudget: number = 0;
  julyBudget: number = 0;
  augustBudget: number = 0;
  septemberBudget: number = 0;
  octoberBudget: number = 0;
  novemberBudget: number = 0;
  decemberBudget: number = 0;
  totalBudget: number = 0;

  constructor(private marketingService: MarketingService, private toastr: ToastrService, private modalService: NgbModal) { }

  async ngOnInit() {
    this.getLastFourYears();
    await this.getBudgets(this.currentYear);
  }

  getLastFourYears() {
    this.yearsList.push(this.currentYear);
    this.yearsList.push(this.currentYear - 1);
    this.yearsList.push(this.currentYear - 2);
    this.yearsList.push(this.currentYear - 3);
  }

  async getBudgets(selectedYear: number){
    (await this.marketingService.getBudgets(selectedYear)).subscribe({
      next: (response: any) => {
        if (response.object != null && response.object.length > 0) {
          this.budgetsList = response.object;
          this.resetMonthCalculations();
          this.getMonthCalculations();
        }
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async getBudgetsByYear() {
    this.getBudgets(this.selectedYear);
  }

  resetMonthCalculations(){
    this.januaryBudget = 0;
    this.februaryBudget = 0;
    this.marchBudget = 0;
    this.aprilBudget = 0;
    this.mayBudget = 0;
    this.juneBudget = 0;
    this.julyBudget = 0;
    this.augustBudget = 0;
    this.septemberBudget = 0;
    this.octoberBudget = 0;
    this.novemberBudget = 0;
    this.decemberBudget = 0;
    this.totalBudget = 0;
  }

  getMonthCalculations(){
    this.budgetsList.forEach(budget => {
      this.januaryBudget = this.januaryBudget + budget.january;
      this.februaryBudget = this.februaryBudget + budget.february;
      this.marchBudget = this.marchBudget + budget.march;
      this.aprilBudget = this.aprilBudget + budget.april;
      this.mayBudget = this.mayBudget + budget.may;
      this.juneBudget = this.juneBudget + budget.june;
      this.julyBudget = this.julyBudget + budget.july;
      this.augustBudget = this.augustBudget + budget.august;
      this.septemberBudget = this.septemberBudget + budget.september;
      this.octoberBudget = this.octoberBudget + budget.october;
      this.novemberBudget = this.novemberBudget + budget.november;
      this.decemberBudget = this.decemberBudget + budget.december;
      this.totalBudget = this.totalBudget + budget.total;
    })
  }

  openDeleteConfirmationModal(budgetDeleteModal: any, budget: BudgetModel) {
    this.selectedBudget = budget;
    this.modalService.open(budgetDeleteModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openUpdateConfirmationModal(budgetUpdateModal: any, budget: BudgetModel) {
    this.selectedBudget = budget;
    this.modalService.open(budgetUpdateModal, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  async updateBudget(){
    (await this.marketingService.saveBudget(this.selectedBudget)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        this.getBudgets(this.selectedYear);
        this.selectedBudget = new BudgetModel();
        this.modalService.dismissAll();
        this.toastr.success("Budget successfully updated.", 'Success');
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async deleteBudget(budgetId: number){
    (await this.marketingService.deleteBudget(budgetId)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        this.getBudgets(this.selectedYear);
        this.selectedBudget = new BudgetModel();
        this.modalService.dismissAll();
        this.toastr.success("Budget successfully deleted.", 'Success');
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }

  async addBudget(){
    this.newBudget.year = this.selectedYear;
    (await this.marketingService.saveBudget(this.newBudget)).subscribe({
      next: (response: any) => {
        if (response.hasErrors){
          this.toastr.error(response.errorMessage, 'Error');
          return;
        }
        this.getBudgets(this.selectedYear);
        this.toastr.success("Budget successfully created.", 'Success');
        this.newBudget = new BudgetModel();
      },
      error: (e: any) => {
        this.toastr.error(e.error, 'Error');
      }
    });
  }
}
