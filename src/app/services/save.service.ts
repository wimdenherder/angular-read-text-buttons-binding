import { Injectable } from '@angular/core';
import { AuthService } from './auth-service.service';
import { AngularFirestore } from '@angular/fire/firestore';

export class TutorialService {
  constructor() { }
}

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  constructor(
    public authService: AuthService,
    private db: AngularFirestore
  ) {  }

  public logToDb(text: string) {
    const user = JSON.parse(localStorage.getItem('user') || '');
    const userEmail = user.email;
    console.log('userEmail',userEmail);
    if(userEmail) {
      this.db.collection('duobutton').doc('log').collection(userEmail).add( { date: new Date(), text });
    }
  }
}
