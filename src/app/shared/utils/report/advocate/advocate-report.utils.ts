export class AdvocateReportUtils {
  static getReportParams(reportFilterProperties: string[], filters: any){
    const params: any = {};
    reportFilterProperties.forEach((property) => {
      if ((filters[property as keyof any]) && filters[property as keyof any].value !== undefined) {
        params[property] = filters[property as keyof any].value;
      }
    });
    return params;
  }

  static getCompletedHomeworkFilterParams(): string[]{
    return [
      'orderedSince',
      'advocate',
      'surgeon',
      'anonymize'
    ];
  }

  static getDailyIntakeFilterParams(): string[]{
    return [
      'intakeFrom',
      'intakeTo',
      'lastContactFrom',
      'lastContactTo',
      'leadSource',
      'advocate',
      'status',
      'city',
      'state',
      'leadType',
      'surgeon',
      'anonymize',
      'plannedProcedure',
      'interestedProcedure',
      'office',
      'referralSource',
      'referralSourceDetail',
      'ignoreDateRange',
      'activeLeadsOnly',
      'showFirstVisit',
      'serviceLine',
    ];
  }
}
