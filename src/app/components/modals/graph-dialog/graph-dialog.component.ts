import { Component, Input, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-graph-dialog',
  templateUrl: './graph-dialog.component.html',
  styleUrls: ['./graph-dialog.component.scss']
})
export class GraphDialogComponent implements OnInit {
  @Input() dataSource: Object = {};

  title: string = '';
  graphType: string = '';
  graphData: Object = {};
  graphColors: string[] = [];
  canvas: any;
  ctx: any;

  constructor(
    public dialogRef: MatDialogRef<GraphDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.graphData = data.graph.data;
    this.graphType = data.graph.type;
    while (this.graphColors.length < Object.keys(this.graphData).length) {
      this.graphColors.push(`rgb(${this.rand(0, 255)}, ${this.rand(0, 255)}, ${this.rand(0, 255)})`);
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: this.graphType,
      data: {
        labels: Object.keys(this.graphData),
        datasets: [{
          label: 'Value',
          data: Object.values(this.graphData),
          backgroundColor: this.graphColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
              stacked: true
          }],
          yAxes: [{
              stacked: true
          }]
        }
      }
    });
  }

  rand(from, to) {
    return ~~(Math.random() * (to - from)) + from;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
