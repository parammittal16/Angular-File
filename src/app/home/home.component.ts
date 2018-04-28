import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { NgForm } from '@angular/forms/src/directives/ng_form';

import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fileContent: any;
  fileName: any;
  fileExtension: any;
  fileExtensionError = false;
  fileExtensionMessage: any;
  file: any;
  reader: any;
  reader2: any;
  files: any;
  contents: any;
  allowedExtensions: string[];
  frmData;
  loading: boolean;
  resData: any;
  name: string;
  csvData: any;
  csv: any;
  headers: any;
  headers2: any;
  lines: any;
  i: number;
  j: number;
  tarr: any;
  fileselected: boolean;
  allTextLines: any;
  dat: any;
  dropdown: string[] = [];
  array;
  array2;
  constructor(private data: DataService, private http: HttpClient, private elem: ElementRef) {

  }

  ngOnInit() {
    this.fileselected = false;
  }
  onSent(form: NgForm) {

    this.loading = true;
    this.frmData = new FormData();
    this.frmData.append('csv_file', this.file, this.file.name);
    this.frmData.append('state', this.name);
    console.log(this.frmData);
    this.data.senddata(this.frmData)
    .subscribe((data) => {
      console.log(data);
      this.loading = false;
      this.resData = data;
      this.array = Object.keys(this.resData.anomalies_dict);
      this.array2 = Object.values(this.resData.anomalies_dict);
    });
  }
  fileEvent(event) {
    this.file = event.target.files[0];
    console.log(this.file);
    this.fileName = this.file.name;
    this.allowedExtensions =
    ['xls', 'csv'];
    this.fileExtension = this.fileName.split('.').pop();

    if (this.isInArray(this.allowedExtensions, this.fileExtension)) {
      this.fileExtensionError = false;
      this.fileExtensionMessage = '';
    } else {
      this.fileExtensionMessage = 'Only Excel and csv files allowed!!';
      this.fileExtensionError = true;
    }

    if (this.file) {
      this.reader = new FileReader();
      this.reader.onloadend = (e: any) => {
        this.contents = e.target.result;
        this.fileContent = this.contents;
      };
      this.reader.readAsDataURL(this.file);
    } else {
      alert('Failed to load file');
    }
    if (this.file) {
      this.reader2 = new FileReader();
      this.reader2.readAsText(this.file);
      this.reader2.onload = (eve: any) => {
        this.csv = eve.target.result;
        this.dat = this.csv;
        this.csvData = this.dat;
        this.allTextLines = this.csvData.split(/\r\n|\n/);
        this.dropdown = [];
        for (this.i = 1; this.i < this.allTextLines.length - 1; this.i++) {
          this.headers = this.allTextLines[this.i].split(',');
          this.headers2 = this.allTextLines[this.i + 1].split(',');
          if (this.headers[0] !== this.headers2[0]) {
            this.dropdown.push(this.headers[0]);
          }
        }
      };
      this.fileselected = true;
    }

  }

  /*- checks if word exists in array -*/
  isInArray(array, word) {
    return array.indexOf(word.toLowerCase()) > -1;
  }

}
