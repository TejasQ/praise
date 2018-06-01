# Praise 🙌🏿

Praise is a client-side helper that... well, _helps_ do things using your voice in a browser environment. This project uses the [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API), which is still an experimental browser technology and is only currently supported in [Google Chrome](https://www.google.com/intl/en/chrome/demos/speech.html). Use with discretion. At some point, as the Web Speech specification moves closer to finalization and inclusion, Praise aims to keep up with the changes.

> Disclaimer: the current [SpeechRecognition API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) (part of the Web Speech API) supported in Chrome requires an internet connection and connects to Google's Web Speech service under the hood.

## Motivation

I created this project on a Saturday afternoon in just a few hours in order to demonstrate the welcoming, efficient nature of JavaScript for [my talk at JSConf EU](https://2018.jsconf.eu/speakers/tejas-kumar-from-you-can-t-to-you-can-the-welcoming-nature-of-javascript.html).

## Getting Started

To get up and running with Praise, it's pretty standard: simply install it with [`yarn`](https://yarnpkg.com/).

- `yarn add praise`

... done.

Of course, you may also use [`npm`](https://www.npmjs.com/) if you are so inclined (`npm i praise --save`).

## Basic Usage

Praise exports a `createPraise` function that returns a `Praise` instance that can be started and stopped at your leisure, in a browser that _can_ and _wants to_ listen. Here's how a simple project can be set up.

Be sure to include the compiled version of this file in a HTML file, using [Parcel](https://parceljs.org/), [Webpack](https://webpack.js.org/), [Poi](https://poi.js.org/) or a similar bundler.

```js
import { createPraise } from "praise";

const whenISay = {
    "ooga": () => alert("booga");
    "am i pretty": () => alert("the prettiest!");
}

const myPraiseListener = createPraise(whenISay); // for customizing, use createPrase(whenISay, myOptions)
myPraiseListener.start();
```

Starting this app in a browser, and then saying either _"ooga"_ or _"am I pretty"_ will execute their respective functions. Pretty cool, eh? This allows you to do _literally anything_ that you can do programatically with your voice.

### Options

`createPraise` takes an optional second argument specifying the following configuration options for more fine-grained control. Here are the defaults, when everything is left blank:

```js
{
  /** Indicates whether Praise should keep listening or stop listening after the first match. */
  keepListening: true;

  /** Indicates whether Praise should return results _as you speak_ or after you stop speaking. */
  onlyWhenIStop: false;

  /** A minimum threshold of confidence for matches. A higher number hear means more accurate, but fewer matches. */
  confidence: 0.8;

  /** A callback executed on successful execution of a phrase callback that gets the result of the callback for a phrase. */
  onSuccess: () => undefined;
}
```

## Usage with [React](https://reactjs.org/)

Praise also has React bindings! [react-praise](https://github.com/tejasq/react-praise) can do some nifty things in a React app, like [change presentation slides](https://github.com/tejasq/jsconf-eu-2018-slides) or other things. Feel free to submit Pull Requests that demonstrate your cool idea/use case!

## Contributing

Open issues and make PRs as you wish.
