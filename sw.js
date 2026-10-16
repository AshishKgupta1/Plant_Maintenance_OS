/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-7e5eb42b'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "registerSW.js",
    "revision": "1872c500de691dce40960bb85481de07"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "3f096210332a40e1330b920df6c14dba"
  }, {
    "url": "pwa-512x512.png",
    "revision": "3f096210332a40e1330b920df6c14dba"
  }, {
    "url": "pwa-192x192.png",
    "revision": "1396b97974bf3f53afd05503ad7138e5"
  }, {
    "url": "index.html",
    "revision": "d736f5e1ed6b3cabb03ec45d60e96d9a"
  }, {
    "url": "icon.svg",
    "revision": "fdd1eca1699cb047875db0c5f4c59bb3"
  }, {
    "url": "favicon.ico",
    "revision": "6c74cf0e872749313d983183e71b65db"
  }, {
    "url": "apple-touch-icon.png",
    "revision": "17087b901a4e8418537f798cb6941f7a"
  }, {
    "url": "assets/index-kBWYx4oS.js",
    "revision": null
  }, {
    "url": "assets/index-B_WALUcm.css",
    "revision": null
  }, {
    "url": "apple-touch-icon.png",
    "revision": "17087b901a4e8418537f798cb6941f7a"
  }, {
    "url": "favicon.ico",
    "revision": "6c74cf0e872749313d983183e71b65db"
  }, {
    "url": "icon.svg",
    "revision": "fdd1eca1699cb047875db0c5f4c59bb3"
  }, {
    "url": "pwa-192x192.png",
    "revision": "1396b97974bf3f53afd05503ad7138e5"
  }, {
    "url": "pwa-512x512.png",
    "revision": "3f096210332a40e1330b920df6c14dba"
  }, {
    "url": "pwa-maskable-512x512.png",
    "revision": "3f096210332a40e1330b920df6c14dba"
  }, {
    "url": "manifest.webmanifest",
    "revision": "19c4435e9b260409fcd5bd2e582d03d0"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));

}));
