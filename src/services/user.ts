import firebase from 'firebase';
import {AuthService} from './auth'

export class UserService {

  logout() {
    firebase.auth().signOut();
  }

  getActiveUser() {
    return firebase.auth().currentUser;
  }

  userIsAdmin() {
    return this.getActiveUser().email === "irini@irini.com";
  }
}
