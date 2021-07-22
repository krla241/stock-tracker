import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  stocks = [];
  constructor(private apiService: ApiService) { }

 

  ngOnInit(): void {
  }

  addtoList(newStock: string, price: number, shares: number) {
    
    console.log('the stock is: ' + newStock + '@  $' + price);
    this.stocks.push(newStock);
    this.apiService.addStock(newStock, price, shares).subscribe(
      data => {
        console.log(data);   
      },
      error => console.log(error)

    );
  }

}
