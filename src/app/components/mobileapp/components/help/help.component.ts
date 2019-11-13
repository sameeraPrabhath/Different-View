import { Component, OnInit ,EventEmitter ,ElementRef } from '@angular/core';
import { FirebaseService } from '../../../../shared/firebase.service';


import { FileUploader, FileLikeObject } from 'ng2-file-upload';
import { HttpClient,HttpHeaders } from "@angular/common/http"
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";

import { environment } from '../../../../../environments/environment'


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  selectedFiles: File[];

  


  constructor(private http:HttpClient , private firebaseService: FirebaseService ) { }

  ngOnInit() {

  }

  files : File[]=[];
  urls: string[];
  eve: EventTarget
  name:string= '';

  uploadToFIrebase(){
    this.firebaseService.uploadAnyImageToFirebase( this.selectedFiles,"firebaseSampleTest").then(
      (res: string[])=>{
  
        const user = {
          imgs:res,
          test:this.name
        };

        this.http.post(environment.apiBaseUrl + '/filearr',user )
        .subscribe(res => {console.log("okay...")})
        

        console.log("firebase upload success"+JSON.stringify(res))
      },err=>{
        console.log("error in uploading to the firebase")
      }
    )
}




  public uploader: FileUploader = new FileUploader({
   
    disableMultipart : false,
    itemAlias: 'attachment',
    allowedFileType: ['image']


    });





  onSubmit(){

this.selectedFiles = new Array<File>(this.uploader.queue.length);
    for (let i = 0; i < this.uploader.queue.length; i++) {
 
      this.selectedFiles[i] = this.uploader.queue[i]._file;
      
    }

    console.log( this.uploader.queue.length)
    console.log( this.selectedFiles)

    this.uploadToFIrebase();
  }

  
}
