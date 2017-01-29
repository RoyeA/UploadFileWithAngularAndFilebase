import {Component,OnInit} from '@angular/core'
import {AngularFire,AuthProviders,AuthMethods} from 'angularfire2'
import * as firebase from 'firebase'

@Component({
    selector:'upload-file',
    template:`
        <div>Upload a file:<input ngModel #file="ngModel" #self type="file" (change)="upload($event.target.files[0])"></div>
        
        <div *ngFor="let file of files ">
            <img [src]="file.src" width=100>
        </div>
    `,
    providers:[AngularFire]
})

export class UploadFileComponent implements OnInit {
    storageRef;
    imageListSub;
    images;
    files:any[];
    constructor(private af:AngularFire){ }

    ngOnInit(){
      this.af.auth.login(
                {email:'[EMAIL]',password:'[PASSWORD]'},
                {provider: AuthProviders.Password, method: AuthMethods.Password}
                ).then(auth=>{
                    // get a list of files
                    this.af.database.list('/files/').subscribe(files=>{
                        this.files = files;
                        // per each file, get the url, and set the url as new property of the file.
                        files.map(file=>{
                            firebase.storage().ref().child('/files/'+file.name).getDownloadURL()
                            .then(url=>file['src']=url);
                        })
                    })
                    
        });
    }

    upload(file){
        // upload the file to Firebase storage
        firebase.storage().ref('/files/'+file.name).put(file)
        .then(suc=>{
            // store the file in the database
            this.af.database.list('/files').push({name:file.name})
            .then(a=>{console.log("success in storing new entry",a)})
            .catch(err=>{console.log("Failed to add entry ",err)});
        })
        .catch(err=>{console.log("Failed ",err)});
    }
}