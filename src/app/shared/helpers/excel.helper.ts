import { FileSaverService } from 'ngx-filesaver';
import { Workbook, Worksheet } from 'exceljs';

const EXCEL_TYPE: string = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION: string = '.xlsx';

export class ExcelHelper {
    constructor(private fileSaver: FileSaverService) {}

    public exportToExcel(data: any[], title: string = '', headers: string[] = []) {
        const workBook = new Workbook();
        workBook.created = new Date();
        workBook.modified = new Date();
        const workSheet = workBook.addWorksheet('Sheet1');

        if (title != '') {
            workSheet.addRow([]);
            workSheet.mergeCells('A1:' + this.numToAlpha(Object.keys(data[0]).length - 1) + 1);
            workSheet.getCell('A1').value = title;
            workSheet.getCell('A1').alignment = { vertical: 'middle', horizontal: 'center' };
            workSheet.getCell('A1').font = { bold: true, size: 14 };
        }

        if (headers.length > 0) {
            const headerRow = workSheet.addRow(headers);
            headerRow.eachCell((cell, index) => {
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '298dccff' },
                    bgColor: { argb: '000000' }
                };
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
                cell.font = { size: 12, bold: true };
                workSheet.getColumn(index).width = headers[index - 1].length < 20 ? 20 : headers[index - 1].length;
            });
        }

        let columnsArray: any[];
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                columnsArray = Object.keys(data[key]);
            }
        }

        data.forEach((element: any) => {
            const eachRow: any[] = [];
            columnsArray.forEach((column) => {
                eachRow.push(element[column]);
            });
            workSheet.addRow(eachRow);
        });

        this.adjustColumnWidth(workSheet);

        workBook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
            const blob = new Blob([data], { type: EXCEL_TYPE });
            this.fileSaver.save(blob, title + EXCEL_EXTENSION);
        });
    }

    numToAlpha(num: number) {
        let alpha = '';
        for (; num >= 0; num = parseInt((num / 26).toString(), 10) - 1) {
            alpha = String.fromCharCode((num % 26) + 0x41) + alpha;
        }
        return alpha;
    }

    private adjustColumnWidth(workSheet: Worksheet) {
        workSheet.columns.forEach(column => {
          const lengths = (column as any).values.map((v: any) => v.toString().length);
          const maxLength = Math.max(...lengths.filter((v:any) => typeof v === 'number'));
          column.width = maxLength;
        });
    }
}
