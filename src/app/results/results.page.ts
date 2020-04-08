import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from  "@angular/router";
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {
  
  address:string;
  latitude:any;
  longitude:any;

  constructor(private restService : RestService,
    private  router:  Router,  
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    public toastController: ToastController) { }

  ngOnInit() {
  this.initClientAddress();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Thank you fo the screening, stay at home !!',
      duration: 2000
    });
    toast.present();
  }


  initClientAddress() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      this.getAddressFromCoords(resp.coords.latitude, resp.coords.longitude);
      console.log(resp.coords.latitude, resp.coords.longitude, this.address);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  swabResult(form) {
    this.restService.registerNewPatient(form.value, this.latitude, this.longitude, this.address).subscribe((res)=>{
      if(res) {
        this.presentToast();
        this.router.navigateByUrl('tabs/tab1');
      }
    });
  }

  getAddressFromCoords(lattitude, longitude) {
    console.log("getAddressFromCoords "+lattitude+" "+longitude);
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5
    };

    this.nativeGeocoder.reverseGeocode(lattitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.address = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          //if(value.length>0)
          if(value) {
          responseAddress.push(value);
          }
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.address += value+", ";
        }
        this.address = this.address.slice(0, -2);
      })
      .catch((error: any) =>{
        this.address = "Address Not Available!";
      });

  }

}
