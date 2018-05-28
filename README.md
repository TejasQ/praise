# Praise 🙌🏿

Praise is a client-side helper that... well, helps _do things_ using your voice in a browser environment. This project uses the [SpeechRecognition API](), which is still an experimental browser technology and is only currently supported in [Google Chrome](). Use with discretion. At some point, as the SpeechRecognition specification moves closer to finalization and inclusion, Praise aims to keep up with the changes.

## Getting Started

To get up and running with Praise, it's pretty standard: simply install it with [`yarn`]().

- `yarn add praise`

... done.

Of course, you may also use [`npm`]() if you are so inclined (`npm i praise --save`).

## Basic Usage

Praise exports a `createPraise` function that returns a `Praise` instance that can be started and stopped at your leisure, in a browser that _can_ and _wants to_ listen. Here's how a simple project can be set up.

Be sure to include the compiled version of this file in a HTML file, using [Parcel](), [Webpack](), [Poi]() or a similar bundler.

```js
import { createPraise } from "praise";

const whenISay = {
    "ooga": () => alert("booga");
    "am i pretty": () => alert("the prettiest!");
}

const myPraiseListener = createPraise(whenISay);
myPraiseListener.start();
```

Starting this app in a browser, and then saying either _"ooga"_ or _"am I pretty"_ will execute their respective functions. Pretty cool, eh? This allows you to do _literally anything_ that you can do programatically with your voice – including render specific [React]() components! [More on that later...]()

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

## Usage with React

[react-praise]() can do some nifty things in a React app, like [change presentation slides]() or [change the color of your app]() or other things. Feel free to submit Pull Requests that demonstrate your cool idea/use case!

## Contributing

Open issues and make PRs as you wish.
