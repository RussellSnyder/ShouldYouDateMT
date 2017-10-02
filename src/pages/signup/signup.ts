import {Component} from '@angular/core';
import {NgForm} from "@angular/forms";
import {LoadingController, AlertController} from "ionic-angular";
import {Http, Response} from "@angular/http";

import {AuthService} from "../../services/auth";

@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html'
})
export class SignupPage {
    constructor(private authService: AuthService,
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController,
                private http: Http) {
    }

    onSignup(form: NgForm) {
        const loading = this.loadingCtrl.create({
            content: 'Signing you up...'
        });
        loading.present();

        return this.authService.signup(form.value.email, form.value.password)
            .then(data => {
                this.authService.getActiveUser().updateProfile({
                    displayName: form.value.name,
                    photoURL: null
                });
                loading.dismiss();
                return data;
            })
            .catch(error => {
                    loading.dismiss();

                    const alert = this.alertCtrl.create({
                        title: 'Signup failed!',
                        message: error.message,
                        buttons: ['Ok']
                    });
                    alert.present();
                }
            )
    }
}
