import { Component, OnInit,Input,OnChanges,SimpleChanges,ViewChild } from '@angular/core';
import { ChartType } from 'Chart.js';
import { MultiDataSet, Label, ChartsModule,BaseChartDirective } from 'ng2-charts';
import { FireService } from '../../fire.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {    
  @Input() data;
  @ViewChild(BaseChartDirective) chart: BaseChartDirective;
  
  public doughnutChartLabels: Label[] = ['Critical','Safe', 'Warning'];
  public doughnutChartData= [0,0,0];
  public doughnutChartType: ChartType = 'doughnut';
  constructor() { }



  ngOnInit() {	
	this.data.subscribe(res => {				
	this.doughnutChartData[1]=res["save"]; 
	this.doughnutChartData[2]=res["warning"]; 
	this.doughnutChartData[0]=res["critical"]; 						
	});	
  }   
	ngOnChanges(changes: SimpleChanges) {        
	this.data.subscribe(res => {				
	this.doughnutChartData[1]=res["save"]; 
	this.doughnutChartData[2]=res["warning"]; 
	this.doughnutChartData[0]=res["critical"]; 						
	this.chart.chart.update(); 	
	});
    }
  
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
