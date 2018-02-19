import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BikerscontractService } from '../bikerscontract.service';
import { Element } from '@angular/compiler';
import { Router } from '@angular/router';

@Component({
  selector: 'app-become',
  templateUrl: './become.component.html',
  styleUrls: ['./become.component.css']
})
export class BecomeComponent implements OnInit {

  bkc: BikerscontractService;
  imageUrl: string;

  constructor(_bkc: BikerscontractService) {
    this.bkc = _bkc;
  }

  ngOnInit() {
    this.getGif();
  }

  becomeBiker(target: FormControl){
    this.bkc.becomeBiker(target.value, function(error, result){
      if(error) console.warn("error", error);
      target.setValue("");
    });
  }

  getGif(){
    
    const gifs = ["001", "002", "003", "004"];
    const random = Math.floor(Math.random() * 4);
    this.imageUrl = './assets/img/' + gifs[random] + '.gif';
  }

}
