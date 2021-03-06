import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert,AlertController,Loading, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';  
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm : FormGroup;
  public loading : Loading;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController, public alertCtrl:AlertController,public authProvider:AuthProvider,formBuilder:FormBuilder) {
    this.loginForm = formBuilder.group({
      email: ['',Validators.compose([Validators.required,EmailValidator.isValid])],
      password: ['',Validators.compose([Validators.required,Validators.minLength(6)])]
    });
  }

  goToSignup():void{
    this.navCtrl.push('SignupPage');
  }
  goToResetPassword():void{
    this.navCtrl.push('PasswordRestartPage');
  }
  loginUser():void{
    if(!this.loginForm.valid){
      console.log('Not Valid');
    }else{
      const email = this.loginForm.value.email;
      const pass = this.loginForm.value.password;
      this.authProvider.loginUser(email,pass).then(authData=>{
        this.loading.dismiss().then(()=>{
          this.navCtrl.setRoot(HomePage);
        });
      },
      error=>{
        this.loading.dismiss().then(()=>{
          const alert : Alert = this.alertCtrl.create({
            message:error.message,
            buttons:[{text:'OK',role:'cancel'}]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
