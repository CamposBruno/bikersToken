import { Component, OnInit } from '@angular/core';
import { BikerscontractService } from '../bikerscontract.service';
import { FormControl} from '@angular/forms';
import { Router } from '@angular/router';

import { Biker } from '../biker';

@Component({
  selector: 'app-main-wrapper',
  templateUrl: './main-wrapper.component.html',
  styleUrls: ['./main-wrapper.component.css']
})
export class MainWrapperComponent implements OnInit {
  biker: Biker;
  address : string;
  balanceOf: number = 0;
  bk$Contract: BikerscontractService;

  constructor( public _bkc: BikerscontractService) {
    this.bk$Contract = _bkc;
    this.biker = new Biker();
   }

  ngOnInit() {
    if(this.bk$Contract._metamask){
      this.bk$Contract.getBikerDescription("").then(biker => this.biker = biker);
    }
  }

  getBalanceOf(target: FormControl){
    this.bk$Contract.getUserBalance(target.value).then( balance => this.balanceOf = balance);
  }

  getBikerDescription(target: FormControl){
    this.bk$Contract.getBikerDescription(target.value).then(biker => this.biker = biker);
  }

  tranferBikerscoin(target: FormControl){
    console.log(`transfer ${target.value} bikerscoin to ${this.address}`);
    this.bk$Contract.tranferBikerscoin(this.address, target.value, function(error, result){
      if(error) console.warn("error", error);
      console.log(result);
    });
  }

}
