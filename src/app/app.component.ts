import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { requiredFileType } from './upload-file-validators';
import { ImageUploadService } from "./services/image-upload.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  progress = 0;

  ImageForm = new FormGroup({
    galleryName: new FormControl('', Validators.required),
    url: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    galleryGroup: new FormControl('', Validators.required),
    caption: new FormControl('', Validators.required),
    altText: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    uploadedBy: new FormControl('', Validators.required),
    width: new FormControl(null, Validators.required),
    height: new FormControl(null, Validators.required),
    image: new FormControl(null, [Validators.required, requiredFileType('jpg')] )
  });
  success = false;

  constructor( private http: HttpClient ,public uploadService:ImageUploadService) {
  }

// Submit Form :: A>K
  onSubmit() {
   
    this.success = false;
    if ( !this.ImageForm.valid ) {
      markAllAsDirty(this.ImageForm);
      return;
    }
   
this.uploadService.UoloadImage(this.ImageForm.value).subscribe(res => {
  this.progress = 0;
  this.success = true;
  this.ImageForm.reset();
});
console.log(this.ImageForm.value);
  }

  // Common form validation Check ::A>K
  hasError( field: string, error: string ) {
    const control = this.ImageForm.get(field);
    return control.dirty && control.hasError(error);
  }

}
  // Common form All validation Check ::A>K
export function markAllAsDirty( form: FormGroup ) {
  for ( const control of Object.keys(form.controls) ) {
    form.controls[control].markAsDirty();
  }
}


