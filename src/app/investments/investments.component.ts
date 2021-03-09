import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investments',
  templateUrl: './investments.component.html',
  styleUrls: ['./investments.component.css']
})
export class InvestmentsComponent implements OnInit {
  stocks = [];
  constructor() { }

 

  ngOnInit(): void {
  }

  addtoList(newStock: string) {
    
    console.log(newStock);
    this.stocks.push(newStock);
  }

}
