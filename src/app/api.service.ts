import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL = 'http://127.0.0.1:8000/stocks';
  postURL = 'http://127.0.0.1:8000/database'
  dataURL = 'http://127.0.0.1:8000/apisets'
  headers = new HttpHeaders({
    'Content-Type' : 'application/json'

  });
  // {
//   "1. open": "869.67",
//   "2. high": "877.77",
//   "3. low": "854.75",
//   "4. close": "863.42",
//   "5. adjusted close": "863.42",
//   "6. volume": "20161719",
//   "7. dividend amount": "0.0000",
//   "8. split coefficient": "1.0"
// }
// stocks =  '{"result":true, "count":42}';
// stocks = '{"open": 869.67, "high": 877.77, "low": 854.75, "close": 863.42, "adjusted close": 863.42, "volume": 20161719, "dividend amount": 0.0000, "split coefficient": 1.0} ';

  constructor(private httpClient: HttpClient) { 

  }

  getStocks() {
    // let dynamicData = this.httpClient.get(this.baseURL);
    // console.log(dynamicData);
    // return this.stocks;
    return this.httpClient.get(this.baseURL, {headers: this.headers});
  }

  addStock(newStock: string, price: number, noshares: number) {

    let body = {
      name: newStock,
      price: price,
      noshares: noshares
    }

    return this.httpClient.post(this.postURL, body, {headers: this.headers});
  }

  getfromDatabase() {
    return this.httpClient.get(this.dataURL, {headers: this.headers})
  }



}
