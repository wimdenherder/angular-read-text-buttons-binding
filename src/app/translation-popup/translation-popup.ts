import { Inject } from '@angular/core';
import { GiphyService } from 'src/services/giphy.service';
import { TranslateService } from './../../services/translate.service';
import { SpeechService } from './../../services/speech.service';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../app.component';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';


interface TranslationAndOriginal {
  word: string;
  translatedWord: string;
}

@Component({
  selector: 'translation-popup',
  templateUrl: 'translation-popup.html',
  styleUrls: ['translation-popup.less']
})
export class TranslationPopup {
  words: string[] = [];
  sentences: string[] = [];
  translatedWords: string[] = [];
  hasSentence: boolean = false;
  gif: any;
  constructor(
    public dialogRef: MatDialogRef<TranslationPopup>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public speechService: SpeechService,
    public translateService: TranslateService,
    public giphyService: GiphyService
  ) {}

  ngOnInit() {
    this.words = this.getWords();
    this.sentences = this.getSentences();
    this.hasSentence = this.words.length > 1;
    this.gif = this.giphyService.getGif(this.data.translatedWord).toPromise();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getWords() {
    return this.data.translatedWord.split(" ");
  }

  getSentences() {
    return this.data.translatedWord.split(/\.\s+/).filter((x) => x.length > 0);
  }

  speak(word: string, word2?: string) {
    this.speechService.speak(word, 1, 'Google русский');
  }

  translateWord = forkJoin(
    this.getWords().map((word:string) =>{
      const options = {q: word, source: 'ru', target: 'en'};
      return this.translateService.translate(options).pipe(
        map(
          (translatedText:string): TranslationAndOriginal => (
              {
                word,
                translatedWord: translatedText
              }
            )
          )
      )}
    )
  )
}
