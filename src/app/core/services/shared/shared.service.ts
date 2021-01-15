import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  public exportAsExcelFile(jsonObj: any[], fileName: string = 'SampleCSV'): void {
    const WorkBook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(jsonObj);
    XLSX.utils.book_append_sheet(WorkBook, sheet);
    XLSX.writeFile(WorkBook, `${fileName}.csv`, {bookType: 'csv'});
  }
}
