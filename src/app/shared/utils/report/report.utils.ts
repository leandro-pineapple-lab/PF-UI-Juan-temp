export class ReportUtils {
  static anonymize(stringToAnonymize: string): string {
    if (!stringToAnonymize || stringToAnonymize.trim().length === 0) {
        return '';
    }

    const anonymizedString = stringToAnonymize.trim().substring(0, 1) + '*'.repeat(stringToAnonymize.trim().length - 1);
    return anonymizedString;
  }

  static anonymizeDateString(dateToAnonymize: string): string {
    if (!dateToAnonymize || dateToAnonymize.trim().length === 0) {
        return '';
    }

    const components = dateToAnonymize.split('/');
    const anonymizedMonth = '*'.repeat(components[0].length);
    const anonymizedDay = '*'.repeat(components[1].length);
    const anonymizedDate = `${anonymizedMonth}/${anonymizedDay}/${components[2]}`;

    return anonymizedDate;
  }
}
