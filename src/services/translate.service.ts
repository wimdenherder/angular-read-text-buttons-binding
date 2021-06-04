import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take, share } from 'rxjs/operators';

const url = 'https://translation.googleapis.com/language/translate/v2?key=';
import { key as translateKey } from '/credentials/apiKeyTranslateWimcoding'; // replace this with your API Key

export class GoogleObj {
  q: string = '';
  readonly source: string = 'en';
  readonly target: string = 'es';
  readonly format?: string = 'text';

  constructor() {}
}


@Injectable()
export class TranslateService {
  constructor(private _http: HttpClient) {}

  translate(obj: GoogleObj) {
    return this._http.post(url + translateKey, obj).pipe(
      map((d: any) => d.data.translations[0].translatedText)
    )
  }
}

