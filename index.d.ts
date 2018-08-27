import express = require("express");

declare namespace oldrod {
  export interface Defaults {
    readonly [key: string]: any;
  }

  export interface Rod {
    readonly cast: (defaults?: Defaults) => express.RequestHandler;
    readonly notfound: () => express.RequestHandler;
    readonly wrap: (fn: express.RequestHandler) => express.RequestHandler;
  }
}

declare const rod: oldrod.Rod;

export = rod;
