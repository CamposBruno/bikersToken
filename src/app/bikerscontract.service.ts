import { Injectable } from '@angular/core';
import * as Web3 from 'web3';

import { Biker } from './biker';

declare let require: any;
declare let window: any;

let tokenAbi = require('./bikerscontract.abi.json');

@Injectable()
export class BikerscontractService {

  public _account: string = null;
  public _metamask: boolean = false;
  private _web3: any;
  private _tokenContract: any;
  private _tokenContractAddress: string = "0x0C291f46142F20E3dcc7BF2369894E96FEF45427"; 
  

  constructor() {
    if (typeof window.web3 !== 'undefined' ) {
      // Use Mist/MetaMask's provider
      this._web3 = new Web3(window.web3.currentProvider);
      
      if(typeof this._web3.eth.accounts[0] == 'undefined'){
        console.warn('Please use a dapp browser like mist or MetaMask plugin');
        return;
      }
      
      this._metamask = true;
      
    } else {
      console.warn('Please use a dapp browser like mist or MetaMask plugin');
      return;
    }

    this._metamask = true;
    this._web3.eth.defaultAccount = this._web3.eth.accounts[0];
    this._account = this._web3.eth.defaultAccount;    
    this._tokenContract = this._web3.eth.contract(tokenAbi).at(this._tokenContractAddress);  
  }

  public async becomeBiker(name: string, callback: Function) {    
    let _web3 = this._web3;
    let txHash = await this._tokenContract.becomeBiker(name, {gas: 95000}, callback);
  }

  public async tranferBikerscoin(to: string, amout: number, callback: Function){
    this._tokenContract.transferTokens(to, this._web3.toWei(amout, 'ether'), { gas : 128000 }, callback);    
  }

  public async getBikerDescription(address: string): Promise<Biker> {
    
    let account = this._account;
    
    if(address !== ""){
      account = address;
    }
      
    return new Promise((resolve, reject) => {
      this._tokenContract.bikerDescription.call(account,  (err, result) => {
        if(err != null) {
          reject(err);
        }
        let biker = new Biker();
        biker.address = result[0];
        biker.name = result[1];
        biker.tradePoints = result[2];
        biker.balance = this._web3.fromWei(result[3]);
        biker.valid = result[4];

        resolve(biker);
      });
    }) as Promise<Biker>;
  }

  public async getUserBalance(address: string): Promise<number> {
    
    let account = await this.getAccount();
    
    if(address !== ""){
      account = address;
    }
      
    return new Promise((resolve, reject) => {
      let _web3 = this._web3;
      this._tokenContract.balanceOf.call(account, function (err, result) {
        if(err != null) {
          reject(err);
        }
  
        resolve(_web3.fromWei(result));
      });
    }) as Promise<number>;
  }

  private async getAccount(): Promise<string> {
    if (this._account == null) {
      this._account = await new Promise((resolve, reject) => {
        this._web3.eth.getAccounts((err, accs) => {
          if (err != null) {
            alert('There was an error fetching your accounts.');
            return;
          }
  
          if (accs.length === 0) {
            alert(
              'Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.'
            );
            return;
          }
          resolve(accs[0]);
        })
      }) as string;
  
      this._web3.eth.defaultAccount = this._account;
    }
  
    return Promise.resolve(this._account);
  }

}
