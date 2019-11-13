import { Component, OnInit } from '@angular/core';
import {Router } from '@angular/router';
import { environment } from '../../../../../environments/environment'
import { HttpClient,HttpHeaders } from "@angular/common/http"

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor( private router:Router,private http:HttpClient) { }
sales:any[];

  ngOnInit() {
    
    this.fetchOrders()
  }

  
  fetchOrders(){
    this.http.get(environment.apiBaseUrl + '/getcompletedorders')
.subscribe((data:any[])=>{
      this.sales=data; 
      console.log(this.sales);
    });
  }



  
  editOrder(id){
    this.router.navigate([`/viewosales/${id}`]);
 }


}
