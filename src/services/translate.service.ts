declare let underscore: any;
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const url = 'https://translation.googleapis.com/language/translate/v2?key=';
import { key as translateKey } from '/credentials/apiKeyTranslateWimcoding'; // replace this with your API Key

export class GoogleObj {
  q: string = '';
  source?: string = 'nl';
  target?: string = 'ru';
  format?: string = 'text';

  constructor() {}
}


@Injectable()
export class TranslateService {
  constructor(private _http: HttpClient) {}

  translate(obj: GoogleObj) {
    console.log('translate ', obj);
    obj.source = obj.source?.split('-')[0];
    obj.target = obj.target?.split('-')[0];
    return this._http.post(url + translateKey, obj).pipe(
      map((d: any) => d.data.translations[0].translatedText.replace(/&#39;/g, "'"))
    )
  }

  replaceSpecialChars(string: string): any {
    return string.replace(/&#39;/g, "'");
  }
}

