import {Injectable} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private domSanitizer: DomSanitizer) {
  }

  public createImageUrlFromBlob(image: Blob): SafeUrl {
    const objectURL = URL.createObjectURL(image);
    return this.domSanitizer.bypassSecurityTrustUrl(objectURL);
  }
}
