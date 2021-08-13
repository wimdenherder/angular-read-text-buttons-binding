import { SpeechService } from '../services/speech.service';
// Import the core angular services.
import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { TranslateService } from '../services/translate.service';
import { GiphyService } from 'src/services/giphy.service';
import { forkJoin, Observable, BehaviorSubject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, distinctUntilKeyChanged, map, switchMap, share, first } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { uniqueArrayFilterOnKey, sortAlphabeticallyOnKey } from './helper/array';

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface RecommendedVoices {
  [key: string]: boolean;
}

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.less'],
  templateUrl: './app.component.html',
})
export class AppComponent {
  public recommendedVoices: RecommendedVoices;
  public rates: number[];
  public selectedRate: number;
  public inputVoice: SpeechSynthesisVoice | null;
  public outputVoice: SpeechSynthesisVoice | null;
  public text: string = `This is cool`;
  public voices: SpeechSynthesisVoice[];
  public activeVoices: SpeechSynthesisVoice[] = [];
  public showYouglish: boolean = false;
  public showGiphy: boolean = false;
  public queryField: FormControl = new FormControl();
  public readEveryOptions: string[] = ['sentence','word'];
  public readEvery: string = 'sentence';
  private _regExpReadEvery: {[key: string]:  RegExp} = {'sentence': /\?+|!+|\.+ /, 'word': / +/};
  public availableLanguages: {name: string, langCode: string}[] = [];
  public activeLanguageOutput = new BehaviorSubject<string>('ru');

  // I initialize the app component.
  constructor(
    public dialog: MatDialog,
    public translateService: TranslateService,
    public speechService: SpeechService,
  ) {
    this.voices = [];
    this.rates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    this.inputVoice = null;
    this.outputVoice = null;
    this.selectedRate = 1;
    // Dirty Dancing for the win!

    this.recommendedVoices = this.speechService.recommendedVoices;
    this.inputVoice = this.voices[0];
    this.outputVoice = this.voices[0];
  }


  public ngOnInit(): void {
    speechSynthesis.addEventListener('voiceschanged', () => {
      this.voices = speechSynthesis.getVoices().sort((voice1, voice2) => voice2.lang > voice1.lang ? -1 : 1);
      this.availableLanguages = uniqueArrayFilterOnKey(this.voices.map(voice => ({name: this.getNameLang(voice.lang.split("-")[0]), langCode: voice.lang.split("-")[0]})),'langCode').sort(sortAlphabeticallyOnKey('name'));
      // defaults
      this.setActiveLanguage('ru');
      this.inputVoice = this.voices.find(voice => voice.lang === "nl-NL") || null;
    });

    this.queryField.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((text: string): Observable<any[]> =>
        forkJoin(text.split(this._regExpReadEvery[this.readEvery]).map(sentence =>
          this.translateService.translate({
            q: sentence,
            ...this.getSelectedLanguages()}))
        )
      ),
    ).subscribe(response => {
      this.speechService.speak(response.slice(-1)[0] || response.slice(-2)[0], this.selectedRate, this.outputVoice?.name);
    });

    this.activeLanguageOutput.subscribe(langCode => {
      this.activeVoices = this.voices.filter(voice => voice.lang.split('-')[0] === langCode);
    });
  }

  public getNameLang(langCode: string | undefined) {
    if(!langCode) return langCode;
    const lib: any = {
      'nl': 'Dutch',
      'en': 'English',
      "it": 'Italian',
      "sv": 'Swedish',
      "fr": 'French',
      "de": 'German',
      "es": 'Spanish',
      "ro": 'Romanian',
      "ja": 'Japanese',
      'he': 'Hebrew',
      'id': 'Indonesian',
      'pt': 'Portugese',
      'th': 'Thai',
      'sk': 'Slovak',
      'hi': 'Hindi',
      'ar': 'Arabic',
      'hu': 'Hungarian',
      'zh': 'Chinese',
      'el': 'Greek',
      'nb': 'Norway',
      'da': 'Danish',
      'fi': 'Finnish',
      'tr': 'Turkish',
      'ko': 'Korean',
      'pl': 'Polish',
      'cs': 'Czech',
      'ru': 'Russian'
    }
    return lib[langCode.split('-')[0]]
  }

  public setActiveLanguage(langCode: string) {
    this.activeLanguageOutput.next(langCode);
    this.outputVoice = this.voices.find(voice => voice.lang.split('-')[0] === langCode) || null;
    this.outputVoiceChanged();
  }

  public outputVoiceChanged() {
    this.translateService.translate({
      q: this.text,
      ...this.getSelectedLanguages()}).subscribe(translatedText =>
    this.speechService.speak(translatedText, this.selectedRate, this.outputVoice?.name));
  }

  public getSelectedLanguages = () => ({ source: this.inputVoice?.lang, target: this.outputVoice?.lang})

  public getSentences() {
    return this.text.split(this._regExpReadEvery['sentence']).filter((x) => x.length > 0);
  }

  public getWords() {
    return this.text.split(/\s+/).filter((x) => x.length > 0);
  }

  public openTranslationDialog(word: string): void {
    if (!this.text) {
      return;
    }
    const $translation = this.translateService.translate({
      q: word,
      ...this.getSelectedLanguages()
    });


    $translation.subscribe((translation: any) => {
      this.speechService.speak(translation, this.selectedRate, this.outputVoice?.name);
      const dialogRef = this.dialog.open(TranslationPopup, {
        data: {
          word,
          translatedWord: translation,
          showYouglish: this.showYouglish,
          showGiphy: this.showGiphy,
          languageOutput: this.getNameLang(this.outputVoice?.lang),
          selectedRate: this.selectedRate,
          outputVoiceName: this.outputVoice?.name,
          ...this.getSelectedLanguages()
        },
      });
    });
  }
}



interface TranslationSentenceAndOriginal {
  sentence: string;
  translatedSentence: string;
}

interface TranslationAndOriginal {
  word: string;
  translatedWord: string;
}


export interface PopupData {
  word: string;
  translatedWord: string;
  showYouglish: boolean;
  showGiphy: boolean;
  source: string;
  target: string;
  languageOutput: string;
  selectedRate: number;
  outputVoiceName: string;
}

@Component({
  selector: 'translation-popup',
  templateUrl: 'translation-popup/translation-popup.html',
  styleUrls: ['translation-popup/translation-popup.less']
})
export class TranslationPopup {
  words: string[] = [];
  sentences: string[] = [];
  translatedWords: string[] = [];
  hasSentence: boolean = false;
  gif: any;
  constructor(
    public translationPopupRef: MatDialogRef<TranslationPopup>,
    @Inject(MAT_DIALOG_DATA) public data: PopupData,
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
    this.translationPopupRef.close();
  }

  getWords() {
    return this.data.translatedWord.split(" ");
  }

  getSentences() {
    return this.data.translatedWord.split(/\.\s+/).filter((x) => x.length > 0);
  }

  focus(word: string) {
    this.speak(word); /// add new popup here
  }

  speak(word: string, word2?: string) {
    // this.speechService.speak(word, 1, 'Google русский');
    this.speechService.speak(word, this.data.selectedRate, this.data.outputVoiceName);
  }

  translateWord = forkJoin(
    this.getWords().map((word:string) =>{
      const options = {q: word, source: this.data.target, target: this.data.source};
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

  translateSentence = forkJoin(
    this.getSentences().map((sentence:string) =>{
      const options = {q: sentence, source: this.data.target, target: this.data.source};
      return this.translateService.translate(options).pipe(
        map(
          (translatedSentence:string): TranslationSentenceAndOriginal => (
              {
                sentence,
                translatedSentence
              }
            )
          )
      )}
    )
  )
}
