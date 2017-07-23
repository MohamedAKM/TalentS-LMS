import { Component,EventEmitter } from '@angular/core';
import { WebService } from '../web.service';
import { ActivatedRoute } from '@angular/router'
import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';

export interface UploadProgress {
  status: 'UploadStatus'; // current status of upload for specific file (Queue | Uploading | Done | Canceled)
  data?: {
    percentage: number; // percentage of upload already completed
    speed: number; // current upload speed per second in bytes
    speedHuman: string; // current upload speed per second in human readable form
  };
}

export interface UploadFile {
  id: string; // unique id of uploaded file instance
  fileIndex: number; // fileIndex in internal ngx-uploader array of files
  lastModifiedDate: Date; // last modify date of the file (Date object)
  name: string; // original name of the file
  size: number; // size of the file in bytes
  type: string; // mime type of the file
  progress: UploadProgress;
  response?: any; // response when upload is done (parsed JSON or string)
}

// output events emitted by ngx-uploader
export interface UploadOutput {
  type: 'addedToQueue' | 'allAddedToQueue' | 'uploading' | 'done' | 'removed' | 'start' | 'cancelled' | 'dragOver' | 'dragOut' | 'drop';
  file?: UploadFile;
  nativeFile?: File; // native javascript File object, can be used to process uploaded files in other libraries
}

// input events that user can emit to ngx-uploader
export interface UploadInput {
  type: 'uploadAll' | 'uploadFile' | 'cancel' | 'cancelAll';
  url?: string; // URL to upload file to
  method?: string; // method (POST | PUT)
  id?: string; // unique id of uploaded file
  fieldName?: string; // field name (default 'file')
  fileIndex?: number; // fileIndex in internal ngx-uploader array of files
  file?: UploadFile; // uploading file
  data?: { [key: string]: string | Blob }; // custom data sent with the file
  headers?: { [key: string]: string }; // custom headers
  concurrency?: number; // concurrency of how many files can be uploaded in parallel (default is 0 which means unlimited)
  withCredentials?: boolean; // apply withCredentials option
}

@Component({
    moduleId: module.id,
    selector: 'course-details',
    templateUrl:'course-details.html',
/*    template: `
        <md-card class="card">
            <md-input-container>
                <input mdInput [(ngModel)]="model.fullName" placeholder="Full Name">
            </md-input-container>
            <md-input-container>
                <input mdInput [(ngModel)]="model.education" placeholder="Education">
            </md-input-container>
            <button md-raised-button color="primary" (click)="saveUser(model)">Save Changes</button>
        </md-card>
    `*/
})
export class CourseDetailsComponent {
formData: FormData;
  files: UploadFile[];
  uploadInput: EventEmitter<UploadInput>;
  humanizeBytes: Function;
  dragOver: boolean;

    model = {
            title: '',
            code: '',
            description: '',
            categoryid: '',
            level:'',
            language: '',
            location: '',
            trainees:'',
            userid: ''
    }

    constructor(private webService : WebService,private route: ActivatedRoute) {
             this.files = []; // local uploading files array
    this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
    this.humanizeBytes = humanizeBytes;

    }

    onUploadOutput(output: UploadOutput): void {
    console.log(output); // lets output to see what's going on in the console

    if (output.type === 'allAddedToQueue') { // when all files added in queue
      // uncomment this if you want to auto upload files when added
      // const event: UploadInput = {
      //   type: 'uploadAll',
      //   url: '/upload',
      //   method: 'POST',
      //   data: { foo: 'bar' },
      //   concurrency: 0
      // };
      // this.uploadInput.emit(event);
    } else if (output.type === 'addedToQueue') {
      this.files.push(output.file); // add file to array when added
    } else if (output.type === 'uploading') {
      // update current data in files array for uploading file
      const index = this.files.findIndex(file => file.id === output.file.id);
      this.files[index] = output.file;
    } else if (output.type === 'removed') {
      // remove file from array when removed
      this.files = this.files.filter((file: UploadFile) => file !== output.file);
    } else if (output.type === 'dragOver') { // drag over event
      this.dragOver = true;
    } else if (output.type === 'dragOut') { // drag out event
      this.dragOver = false;
    } else if (output.type === 'drop') { // on drop event
      this.dragOver = false;
    }else if (output.type === 'done') { // on drop event
        var course_code = this.route.snapshot.params.code;
            //console.log('course_code:' + course_code);
           this.webService.getFiles(course_code).subscribe( res => {
                this.files = res;
            });
    }
  }

  startUpload(): void {  // manually start uploading
      var course_code = this.route.snapshot.params.code;
    const event: UploadInput = {
      type: 'uploadAll',
      url: 'http://localhost:1234/api/upload',
      method: 'POST',
      data: { courseid: course_code },
      concurrency: 1 // set sequential uploading of files with concurrency 1
    }

    this.uploadInput.emit(event);
  }

  cancelUpload(id: string): void {
    this.uploadInput.emit({ type: 'cancel', id: id });
  }
        ngOnInit() {
            var course_code = this.route.snapshot.params.code;
            console.log('course_code:' + course_code);
            this.webService.getCourse(course_code).subscribe( res => {
                this.model = res;
            });
           this.webService.getFiles(course_code).subscribe( res => {
                this.files = res;
            });
        }
}
