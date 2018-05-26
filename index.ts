// Interfaces

/**
 * A Praise instance.
 *
 * @method start - Start listening.
 * @method hear - Manually hear and respond to a phrase.
 * @method stop - Stop listening.
 */
export interface Praise {
  /**
   * Start listening.
   */
  start: () => Praise;
  /**
   * Manually hear a phrase.
   */
  hear: () => void;
  /**
   * Stop listening.
   */
  stop: () => void;
}

/**
 * An object whose keys are strings of phrases to respond to,
 * the values of which are functions to execute upon
 * recognizing the phrase.
 */
export interface Phrases {
  /**
   * Any string can be a phrase,
   * and any function can be called in response.
   *
   * The function receives the phrase
   * in order to use it internally however it
   * wishes.
   */
  [key: string]: (phrase: string) => any;
}

/**
 * The Praise configuration object.
 *
 * @property {boolean} keepListening - indicates whether Praise should keep listening or stop listening after the first match.
 * @property {boolean} onlyWhenIStop - indicates whether Praise should return results _as you speak_ or after you stop speaking.
 * @property {number} confidence - a minimum threshold of confidence for matches. A higher number hear means more accurate, but fewer matches.
 * @property {function} onSuccess - a callback executed on successful execution of a phrase callback that gets the result of the callback for a phrase.
 */
export interface Config {
  /** Indicates whether Praise should keep listening or stop listening after the first match. */
  keepListening?: boolean;

  /** Indicates whether Praise should return results _as you speak_ or after you stop speaking. */
  onlyWhenIStop?: boolean;

  /** A minimum threshold of confidence for matches. A higher number hear means more accurate, but fewer matches. */
  confidence?: number;

  /** A callback executed on successful execution of a phrase callback that gets the result of the callback for a phrase. */
  onSuccess?: (outputFromPhrases: any) => any;
}

// Polyfill interfaces for browsers.
export interface SpeechRecognitionEvent {
  readonly emma: string;
  readonly interpretation: string;
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResult[];
}

export interface SpeechRecognitionResult {
  readonly isFinal: boolean;
  readonly length: number;
  item: (index: number) => SpeechRecognitionAlternative;
}

export interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

/**
 * Creates a Praise when provided a dictionary of phrases
 * and an optional configuration object.
 *
 * @returns Praise
 * @param phrases An object whose keys are strings of phrases to respond to, the values of which are functions to execute upon recognizing the phrase.
 * @param config An optional configuration object for Praise.
 */
export const createPraise = (
  phrases: Phrases,
  {
    keepListening = true,
    onlyWhenIStop = false,
    confidence = 0.8,
    onSuccess = (outputFromPhrases: any): undefined => undefined // noop
  }: Config = {}
): Praise => {
  const SpeechRecognition =
    // @ts-ignore
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    throw Error(`Praise cannot initialize in this environment because there is no Speech Recognition API available.
Please use a browser that supports it.

More info: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition`);
  }

  const Praise = Object.create(null);

  Praise.start = () => recognition.start();
  Praise.hear = (input: string) => {
    const functionToCall = Object.keys(phrases).find(
      phrase => phrase === "*" || input.toLowerCase().includes(phrase)
    );
    functionToCall && onSuccess(phrases[functionToCall](input));
  };
  Praise.stop = () => recognition.stop();

  const recognition = new SpeechRecognition();
  recognition.interimResults = !onlyWhenIStop;

  recognition.addEventListener(
    "result",
    ({ results }: SpeechRecognitionEvent) => {
      const response = Object.values(results)
        .map((result: SpeechRecognitionResult) => result.item(0))
        .filter(
          (result: SpeechRecognitionAlternative) =>
            result.confidence >= confidence
        )[0];
      return response === undefined || Praise.hear(response.transcript);
    }
  );

  keepListening && recognition.addEventListener("end", recognition.start);
  return Praise;
};
