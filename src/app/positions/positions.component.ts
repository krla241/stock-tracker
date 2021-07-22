import { Component, OnInit, AfterViewInit } from '@angular/core';
// import {MatTableModule} from '@angular/material/table';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable} from 'rxjs'
import { ApiService } from '../api.service';
import { hasLifecycleHook } from '@angular/compiler/src/lifecycle_reflector';


export interface PeriodicElement {
  name: string;
  price: number;
  shares: number;
  pricepaid: string;
}

export interface Positions {
  name: string;
  price: number;
  noshares: number;
  avgprice?: number;
  marketvalue: number;
  return: number;

}


@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['name', 'price', 'shares', 'pricepaid', 'mktvalue', 'return'];
  // dataSource = ELEMENT_DATA;
  //tsla 7,292.04/16 = 455.75
  STOCK_DATA: Positions[] = [];
  // ELEMENT_DATA: Positions[] = [ {name: 'TSLA', price: 618.71, noshares: 16, avgprice: 455.75, marketvalue: 9899.36, return: 2607.32}];
  ELEMENT_DATA: Positions[] = [];
  ELEMENTS_DATA: Positions[] = [];

  stocks = {};
  data = [{}];
 

  constructor(private apiService: ApiService) {

    //get from API
    this.apiService.getStocks().subscribe(
      res => {
        console.log(res);

        this.stocks = res;
        //console.log(this.stocks['TSLA']);
     
      
    //get stocks from database
    this.apiService.getfromDatabase().subscribe(
      data => {
 
        console.log(data);
        this.STOCK_DATA = data as Positions[]; //maybe I'll use it?

        this.STOCK_DATA.forEach(function (value) {
        
        let pos : Positions = {
          name: value.name,
          price: res[value.name],
          noshares: value.noshares,
          avgprice: this.getAvgPrice(value.price, value.noshares),
          marketvalue: this.mktvalue(res[value.name], value.noshares),
          return: this.totalreturn(this.getAvgPrice(value.price, value.noshares), value.noshares, this.mktvalue(res[value.name], value.noshares))
        }
        this.ELEMENT_DATA.push(pos)
          console.log(this.ELEMENT_DATA);

      }, this); 
      this.ELEMENTS_DATA = this.ELEMENT_DATA;

      },
      error => console.log(error)

    );


  },
  error => console.log(error)

);
   
   }

   getAvgPrice(totalCost: number, numofShares: number ){
    // return (totalCost/numofShares);
    return parseInt((Math.round((totalCost/numofShares) * 100) / 100).toFixed(2))
    
  }
  mktvalue(currentprice: never, numofShares: number) {
    // return (currentprice * numofShares)
    return parseInt((Math.round((currentprice * numofShares) * 100) / 100).toFixed(2))
  }

  totalreturn(avgPrice: number, noshares: number, mktvalue: number) {
    //return = (avgprice * noshares) - mktvalue
    let answer = mktvalue - (avgPrice * noshares);
    return (parseInt((Math.round(answer * 100) / 100).toFixed(2)));

  }


  ngOnInit(): void {
//      //get from API
//      this.apiService.getStocks().subscribe(
//       res => {
//         console.log(res);

//         this.stocks = res;
//         //console.log(this.stocks['TSLA']);
     
      
//     //get stocks from database
//     this.apiService.getfromDatabase().subscribe(
//       data => {
 
//         console.log(data);
//         this.STOCK_DATA = data as Positions[]; //maybe I'll use it?

//         this.STOCK_DATA.forEach(function (value) {
        
//         let pos : Positions = {
//           name: value.name,
//           price: res[value.name],
//           noshares: value.noshares,
//           avgprice: this.getAvgPrice(value.price, value.noshares),
//           marketvalue: this.mktvalue(res[value.name], value.noshares),
//           return: this.totalreturn(this.getAvgPrice(value.price, value.noshares), value.noshares, this.mktvalue(res[value.name], value.noshares))
//         }
//         this.ELEMENT_DATA.push(pos)
        
        

//       }, this); 

//       console.log(this.ELEMENT_DATA);
//       //to update for some reason?
//       this.ELEMENTS_DATA = this.ELEMENT_DATA;

//       },
//       error => console.log(error)

//     );


//   },
//   error => console.log(error)

// );


        
  }

  ngAfterViewInit() {


  }






}


