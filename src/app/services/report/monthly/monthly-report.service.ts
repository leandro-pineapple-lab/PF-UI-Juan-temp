import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { round } from 'lodash';
import { map, tap } from 'rxjs';
import { AppointmentSummaryFilterModel } from 'src/app/models/report/medical/appointment-summary-filter.model';
import { BariatricSurgeryFilterModel } from 'src/app/models/report/monthly/bariatric-surgery/bariatric-surgery-filter.model';
import { LeadsByPayerFilterModel } from 'src/app/models/report/monthly/leads-by-payer/leads-by-payer-filter.model';
import { MonthlyNumbersFilterModel } from 'src/app/models/report/monthly/monthly-numbers/monthly-numbers-filter.model';
import { PullThroughFilterModel } from 'src/app/models/report/monthly/pull-through/pull-through-filter.model';
import { SurgicalSummaryFilterModel } from 'src/app/models/report/monthly/surgical-summary/surgical-summary-filter.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonthlyReportService {

  lastYearsAmountToShow = 6;
  lastYearsList: number[] = [];

  constructor(private http: HttpClient) {
    this.lastYearsList = this.getLastYearsList(this.lastYearsAmountToShow);
  }

  getAppointmentsSummary(reportFilters: AppointmentSummaryFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/MonthlyReport/GetAppointmentsSummaryReport'}`, {
      params: {
        year: (reportFilters.year.value as number),
        providerId: (reportFilters.provider.value as number),
        type: (reportFilters.type.value as string),
      }
    }).pipe(
      map((data: any) => {
        const {item1, item2} = data.object;
        if (item1?.length > 0){
          const totalsOfTotals = this.getAppointmentsTotalsOfTotals(item1);
          totalsOfTotals.cssClass = 'bold';
          item1.push(totalsOfTotals);
          const appointmentsPercentages: any = this.getAppointmentsPercentages(totalsOfTotals);
          appointmentsPercentages.cssClass = 'bold';
          item1.push(appointmentsPercentages);
        }
        if (item2?.length > 0){
          const totalsOfTotals = this.getAppointmentsTotalsOfTotals(item2);
          totalsOfTotals.cssClass = 'bold';
          item2.push(totalsOfTotals);
          const appointmentsPercentages: any = this.getAppointmentsPercentages(totalsOfTotals);
          appointmentsPercentages.cssClass = 'bold';
          item2.push(appointmentsPercentages);
        }
        return data;
      })
    );
  }

  private getAppointmentsPercentages(totalsOfTotals: any) {
    return {
      month: '% of total appointments',
      confAndCompletedAmount: round((totalsOfTotals.confAndCompletedAmount * 100) / totalsOfTotals.appointmentsAmount, 2),
      confirmedAmount: round((totalsOfTotals.confirmedAmount * 100) / totalsOfTotals.appointmentsAmount, 2),
      completedAmount: round((totalsOfTotals.completedAmount * 100) / totalsOfTotals.appointmentsAmount, 2),
      postponedAmount: round((totalsOfTotals.postponedAmount * 100) / totalsOfTotals.appointmentsAmount, 2),
      cancelledAmount: round((totalsOfTotals.cancelledAmount * 100) / totalsOfTotals.appointmentsAmount, 2),
      noShowAmount: round((totalsOfTotals.noShowAmount * 100) / totalsOfTotals.appointmentsAmount, 2),
    };
  }

  private getAppointmentsTotalsOfTotals(appointmentsArray: any[]){
    const totalsOfTotals = appointmentsArray.reduce((total, monthData) => {
      return {
          month: 'TOTAL',
          confAndCompletedAmount: total.confAndCompletedAmount + monthData.confAndCompletedAmount,
          confirmedAmount: total.confirmedAmount + monthData.confirmedAmount,
          completedAmount: total.completedAmount + monthData.completedAmount,
          postponedAmount: total.postponedAmount + monthData.postponedAmount,
          cancelledAmount: total.cancelledAmount + monthData.cancelledAmount,
          noShowAmount: total.noShowAmount + monthData.noShowAmount,
          appointmentsAmount: total.appointmentsAmount + monthData.appointmentsAmount
      };
    }, {
        confAndCompletedAmount: 0,
        confirmedAmount: 0,
        completedAmount: 0,
        postponedAmount: 0,
        cancelledAmount: 0,
        noShowAmount: 0,
        appointmentsAmount: 0,
    });
    return totalsOfTotals;
  }

  getLeadsByPayer(reportFilters: LeadsByPayerFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/MonthlyReport/GetLeadsByPayerReport'}`, {
      params: {
        year: (reportFilters.year.value as number),
        surgeon: (reportFilters.surgeon.value as string)
      }
    });
  }

  getMonthlyStats(reportFilters: MonthlyNumbersFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/MonthlyReport/GetMonthlyStatsReport'}`, {
      params: {
        year: (reportFilters.year.value as number),
      }
    }).pipe(
      tap((response: any) => {
        if (response) {
          let {previousYearStats, selectedYearStats} = response;
          if (previousYearStats?.length > 0){
            const ratioSurgeriesPreviousYearStat = previousYearStats.find((x: any) => x.stat === 'Ratio Surgeries to Leads');
            if (ratioSurgeriesPreviousYearStat){
              this.addStatPercentageSign(ratioSurgeriesPreviousYearStat);
            }
          }
          if (selectedYearStats?.length > 0){
            const ratioSurgeriesSelectedYearStat = selectedYearStats.find((x: any) => x.stat === 'Ratio Surgeries to Leads');
            if (ratioSurgeriesSelectedYearStat){
              this.addStatPercentageSign(ratioSurgeriesSelectedYearStat);
            }
          }
        }
      })
    );
  }

  private addStatPercentageSign(stat: any){
    stat.januaryValue = stat.januaryValue ? stat.januaryValue + '%' : undefined;
    stat.februaryValue = stat.februaryValue ? stat.februaryValue + '%' : undefined;
    stat.marchValue = stat.marchValue ? stat.marchValue + '%' : undefined;
    stat.aprilValue = stat.aprilValue ? stat.aprilValue + '%' : undefined;
    stat.mayValue = stat.mayValue ? stat.mayValue + '%' : undefined;
    stat.juneValue = stat.juneValue ? stat.juneValue + '%' : undefined;
    stat.julyValue = stat.julyValue ? stat.julyValue + '%' : undefined;
    stat.augustValue = stat.augustValue ? stat.augustValue + '%' : undefined;
    stat.septemberValue = stat.septemberValue ? stat.septemberValue + '%' : undefined;
    stat.octoberValue = stat.octoberValue ? stat.octoberValue + '%' : undefined;
    stat.novemberValue = stat.novemberValue ? stat.novemberValue + '%' : undefined;
    stat.decemberValue = stat.decemberValue ? stat.decemberValue + '%' : undefined;
  }

  getPullThrough(reportFilters: PullThroughFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/MonthlyReport/GetPullThroughReport'}`, {
      params: {
        year: (reportFilters.year.value as number),
      }
    });
  }

  getBariatricSurgeries(reportFilters: BariatricSurgeryFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/MonthlyReport/GetBariatricSurgeriesReport'}`, {
      params: {
        year: (reportFilters.year.value as number),
      }
    }).pipe(
      tap((data: any) => {
        const { thisYearBariatricSurgerySummary, bariatricSurgerySummaryComparison } = data;
        if (thisYearBariatricSurgerySummary.length > 0) {
          thisYearBariatricSurgerySummary[thisYearBariatricSurgerySummary.length - 1].cssClass = 'bold';
        }
      }),
      map((data: any) => ({
        ...data,
        bariatricSurgerySummaryComparison: data.bariatricSurgerySummaryComparison.map((x: any) => ({
          ...x,
          monthName: `${x.monthName} - ${x.year}`,
        }))
      }))
    );
  }

  getSurgicalSummary(reportFilters: SurgicalSummaryFilterModel) {
    return this.http.get(`${environment.API_URL}${'api/MonthlyReport/GetSurgicalSummaryReport'}`, {
      params: {
        year: (reportFilters.year.value as number),
        reportType: (reportFilters.reportType.value as string),
        procedureType: (reportFilters.procedureType.value as string),
      }
    }).pipe(
      tap((data: any) => {
        if (data?.length > 0) {
          data[data.length - 1].cssClass = 'bold';
        }
      })
    );
  }

  getLastYearsList(yearsToShow: number){
    let currentYear = new Date().getFullYear();
    const yearsList: number[] = [];
    for (let index = 0; index < yearsToShow; index++) {
      yearsList.push(currentYear);
      currentYear = currentYear - 1;
    }
    return yearsList;
  }
}
