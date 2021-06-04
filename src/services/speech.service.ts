import { Injectable } from '@angular/core';

interface RecommendedVoices {
  [key: string]: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  public sayCommand: string;
  public recommendedVoices: RecommendedVoices;
  public rates: number[];
  public selectedRate: number;
  public selectedVoice: SpeechSynthesisVoice | null;
  public text: string;
  public voices: SpeechSynthesisVoice[];

  constructor() {
    this.voices = [];
    this.rates = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
    this.selectedVoice = null;
    this.selectedRate = 1;
    // Dirty Dancing for the win!
    this.text =
      "Me? ... I'm scared of everything. I'm scared of what I saw, of what I did, of who I am. And most of all, I'm scared of walking out of this room and never feeling the rest of my whole life ... the way I feel when I'm with you.";
    this.sayCommand = '';

    // These are "recommended" in so much as that these are the voices that I (Ben)
    // could understand most clearly.
    this.recommendedVoices = Object.create(null);
    this.recommendedVoices['Alex'] = true;
    this.recommendedVoices['Alva'] = true;
    this.recommendedVoices['Damayanti'] = true;
    this.recommendedVoices['Daniel'] = true;
    this.recommendedVoices['Fiona'] = true;
    this.recommendedVoices['Fred'] = true;
    this.recommendedVoices['Karen'] = true;
    this.recommendedVoices['Mei-Jia'] = true;
    this.recommendedVoices['Melina'] = true;
    this.recommendedVoices['Moira'] = true;
    this.recommendedVoices['Rishi'] = true;
    this.recommendedVoices['Samantha'] = true;
    this.recommendedVoices['Tessa'] = true;
    this.recommendedVoices['Veena'] = true;
    this.recommendedVoices['Victoria'] = true;
    this.recommendedVoices['Yuri'] = true;

    this.voices = speechSynthesis.getVoices();
    console.log(this.voices);
    this.selectedVoice = this.voices[0] || null;

    // The voices aren't immediately available (or so it seems). As such, if no
    // voices came back, let's assume they haven't loaded yet and we need to wait for
    // the "voiceschanged" event to fire before we can access them.
    if (!this.voices.length) {
      speechSynthesis.addEventListener('voiceschanged', () => {
        this.voices = speechSynthesis.getVoices();
        this.selectedVoice = this.voices[0] || null;
      });
    }
  }

  // I synthesize speech from the current text for the currently-selected voice.
  public speak(text?: string, rate?: number, voiceName?: string): void {
    if (!this.selectedVoice || !this.text) {
      return;
    }

    if(voiceName)
      this.selectedVoice = this.voices.find(voice => voice.name === voiceName) || this.selectedVoice;

    this.stop();
    this.synthesizeSpeechFromText(
      this.selectedVoice,
      rate || this.selectedRate,
      text || this.text
    );
  }

  // I stop any current speech synthesis.
  public stop(): void {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
  }

  // I update the "say" command that can be used to generate the a sound file from the
  // current speech synthesis configuration.

  // ---
  // PRIVATE METHODS.
  // ---

  // I perform the low-level speech synthesis for the given voice, rate, and text.
  private synthesizeSpeechFromText(
    voice: SpeechSynthesisVoice,
    rate: number,
    text: string
  ): void {
    var utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = this.selectedVoice;
    utterance.rate = rate;

    speechSynthesis.speak(utterance);
  }
}
