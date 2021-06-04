import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { key as giphyKey } from '/credentials/apiKeyGiphy'; // replace this with your API Key
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  constructor(private _http: HttpClient) { }

  getFirstGif(search: string) {
    const url = "http://api.giphy.com/v1/gifs/search?api_key=" + giphyKey + "&q=" + search;
    return this._http.get<{data: any}>(url).pipe(
      map(x => x.data[0].images.fixed_height.url)
    )
  }

  getGif(search: string) {
    const url = "http://api.giphy.com/v1/gifs/search?api_key=" + giphyKey + "&q=" + search;
    return this._http.get<{data: any}>(url).pipe(
      map(x => {
        const data = x.data;
        return data[this.randomIntFromInterval(0,data.length)].images.fixed_height.url
      })
    )
  }

  randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
