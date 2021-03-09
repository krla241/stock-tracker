import { ClassGetter } from '@angular/compiler/src/output/output_ast';
import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  stocks = {};
  
  
  //To initiate the api service
  constructor(private apiService: ApiService) { 

  }

  ngOnInit(): void {
    // this.stocks = this.apiService.getStocks();
    // const obj = JSON.parse(this.stocks);
    // this.stocks = obj.open;
    this.apiService.getStocks().subscribe(
      data => {
        console.log(data);

        this.stocks = data;
        

      },
      error => console.log(error)

    );

  }

}
