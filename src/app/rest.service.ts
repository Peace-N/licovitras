import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  baseUrl: string = "http://www.licovitras.co.za/api/";

  constructor(public httpClient: HttpClient) { }

  // Sending a GET request to /countries

  public getCountries() {

    return this.httpClient

      .get(this.baseUrl + "ingest").pipe(map(result => result));

  }

  public registerNewPatient(patient, lat, long, adress) {
    var body = "name=" + encodeURIComponent(patient.name) + "&email=" + encodeURIComponent(patient.email) + 
    "&cell=" + patient.phone + "&latitude=" + lat + "&longitude=" + long + "&address=" + adress;
    return this.httpClient.post(this.baseUrl + "patients", body, {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
    })
  }

  // login(user: User): Observable<AuthResponse> {
  //   var body = "username=" + encodeURIComponent(user.email) + "&password=" + encodeURIComponent(user.password) + "&grant_type=" + "password" + "&scope=" + "*" + "&client_id=" + this.AUTH_CLIENT_ID + "&client_secret=" + this.AUTH_SECRET;
  //   var headers = new Headers();
  //   let params = new HttpParams({fromString: body });
  //   return this.httpClient.post(this.AUTH_SERVER_ADDRESS, body, {
  //   headers: new HttpHeaders()
  //     .set('Content-Type', 'application/x-www-form-urlencoded')
  // }).pipe(
  //       tap(async (res: AuthResponse) => {
  //         console.log(res);
  //         if (res.user) {
  //           await this.storage.set("ACCESS_TOKEN", res.user.access_token);
  //           await this.storage.set("EXPIRES_IN", res.user.expires_in);
  //           await this.storage.set("username", user.email);
  //           this.authSubject.next(true);
  //         }
  //       })
  //   );
  // }
}

export class Country {

  constructor(values: Object = {}) {

    Object.assign(this, values);

  }

}
