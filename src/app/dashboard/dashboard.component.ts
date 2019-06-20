import { Component, OnInit,OnChanges,SimpleChanges  } from '@angular/core';
import { FireService } from '../fire.service';
import { Observable,from } from 'rxjs';
import { map } from 'rxjs/operators';
// import {ChartComponent} from '../chart/chart.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  items: any[];
  oilsave: number =0;
  oilwarning: number =0;
  oilcritical: number =0;
  accusave: number =0;
  accuwarning: number =0;
  accucritical: number =0;
  arrayaccu;
  arrayoil;
  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(public service: FireService) {}
  ngOnInit() {

      this.service.getMotor().pipe(
        map(actions => actions.map(a => {
		// console.log("before"+(this.oilwarning+this.oilcritical+this.oilsave));
		if(this.oilwarning+this.oilcritical+this.oilsave>=actions.length){
			this.oilwarning=0;
			this.oilcritical=0;
			this.oilsave=0;
			this.accucritical=0;
			this.accusave=0;
			this.accuwarning=0;
		}
          var statusoil=2;
          var statusaccu=2;

          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          if(data.oil_volume>300){
            this.oilsave++;
          }else if(data.oil_volume<=300&&data.oil_volume>=100){
            this.oilwarning++;
            statusoil=1;
          }else{
            this.oilcritical++;
            statusoil=0;
          }
          if (data.battery_voltage>=13.3&&data.battery_voltage<14.6){
            this.accusave++;
          } else if (data.battery_voltage<=13.2&&data.battery_voltage>12.7){
            this.accuwarning++;
            statusaccu=1;
          }else {
            this.accucritical++;
            statusaccu=0;
          }
          if(statusoil==2&&statusaccu==2){
            data.newstatus="Safe";
          }else if(statusoil==0||statusaccu==0){
            data.newstatus="Critical";
          }else data.newstatus="Warning";
			// this.service.getPlateMotor(data["mtr-id"]).subscribe(doc => {
				// data.license_plate=doc.license_plate;
		  // });

		  // console.log("paste "+(this.oilwarning+this.oilcritical+this.oilsave));
          return {id, ...data};
        }))
      )
	  .subscribe(res => {
		this.items = res;
		this.arrayoil = from([{save: this.oilsave,warning: this.oilwarning,critical: this.oilcritical}]);
	    this.arrayaccu = from([{save: this.accusave,warning: this.accuwarning,critical: this.accucritical}]);
	  })
	}
  deletedata(motor_id:string){
		this.service.deleteMotor(motor_id)
	}
	// getPlate(motor_id: string):string{
		// var nilai;
		// this.service.getPlateMotor("B 4382 JA").subscribe(doc => {
				// console.log(doc.license_plate);
		  // });

		  // return nilai;
	// }
}
