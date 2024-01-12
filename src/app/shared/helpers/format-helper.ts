export class FormatHelper {
  public static convertStringToDate(dateString: string) {
    const dateParts = dateString.split('/');
    if (dateParts.length !== 3) {
      return '';
    }

    const month = parseInt(dateParts[0], 10);
    const day = parseInt(dateParts[1], 10);
    const year = parseInt(dateParts[2], 10);

    const date = new Date(year, month - 1, day);

    if (isNaN(date.getTime())) {
      return '';
    }

    return date;
  }
}
