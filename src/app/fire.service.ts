import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireService {
  // public motor : FirebaseListObservable<>;
  constructor(public db : AngularFirestore) { }

  getMotor() : Observable<any[]>{
    return this.db.collection('/recent_sensor_data').snapshotChanges()
    }
   getDefaultMotor() : Observable<any[]>{
    return this.db.collection('/recent_sensor_data').valueChanges()
    }

    getDataMotor() : Observable<any[]>{
      return this.db.collection('/motorcycle').valueChanges()
    }

    getPlateMotor(motor_id: string){
		return this.db.doc<any>(`motorcycle/${motor_id}`).valueChanges()
	}
	getChangeMotor() : Observable<any>{
	console.log(this.db.collection('/recent_sensor_data').stateChanges(['modified']))
		return this.db.collection('/recent_sensor_data').stateChanges(['modified'])
    }

    deleteMotor(motor_id:string){
		this.db.doc<any>(`motorcycle/${motor_id}`).delete().then(function() {
			console.log("Document successfully deleted!");
		}).catch(function(error) {
			console.error("Error removing document: ", error);
	});

		this.db.doc<any>(`recent_sensor_data/${motor_id}`).delete().then(function() {
			console.log("Document successfully deleted!");
		}).catch(function(error) {
			console.error("Error removing document: ", error);
		})
	}
}
