import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  motor :Array<any>;
  // public motor : FirebaseListObservable<>;
  constructor(public db : AngularFirestore) { }

  getMotor() : Observable<any[]>{
    return this.db.collection('recent_sensor_data').snapshotChanges();
    }
}
