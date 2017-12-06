import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {

  constructor(public http: HttpClient) {
    
  }
  loginUser(email:string,password:string):Promise<any>{
    return firebase.auth().signInWithEmailAndPassword(email,password);
  }
  signupUser(email:string,password:string):Promise<any>{
    return firebase.auth().createUserWithEmailAndPassword(email,password).then(newUser=>{
      firebase.database().ref(`/userProfile/${newUser.uid}/email`)
    }).catch(error=>{
      console.log(error);
      throw new Error(error);
    })
  }
  resetPassword(email:string):Promise<any>{
    return firebase.auth().sendPasswordResetEmail(email);
  }
  logoutUser():Promise<any>{
    const userId = firebase.auth().currentUser.uid;
    firebase.database().ref(`/userProfile/${userId}`).off();
    return firebase.auth().signOut();
  }
}
