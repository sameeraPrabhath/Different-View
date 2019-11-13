import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http"
import { environment } from '../../../../../environments/environment'

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
noOfProduct = 0
noOforders = 0
noOfsales = 0
Tsales = 0
o:any[]
s:any[]
count=0
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.products()
    this.orders()
    this.sales()
  }



  products(){  
    this.http.get(environment.apiBaseUrl + '/productlist')
    .subscribe((data:any[])=>
    {
  this.noOfProduct = data.length
    })
   }

   orders(){  
    this.http.get(environment.apiBaseUrl + '/getorders')
    .subscribe((data:any[])=>
    {
      this.noOforders = data.length
      this.o = data

      for(let i=0; i<this.noOforders;i++){
if(this.o[i].orderstatus=='Pending')
this.count++
      }

    })
   }

   sales(){  
    this.http.get(environment.apiBaseUrl + '/getcompletedorders')
    .subscribe((data:any[])=>
    {
      this.noOfsales = data.length
      this.s = data

      for(let i=0; i<this.noOfsales;i++){

         for(let j=0; j<this.s[i].orderitems.length ;j++)
         {
         this.Tsales = this.Tsales + ( this.s[i].orderitems[j].price * this.s[i].orderitems[j].quantity)

         }
      }

    })
   }


}
