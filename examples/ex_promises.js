'use strict';

// you need to copy chrome driver into directory from which you start this file
// in order to successfully run the example

const webdriver = require('selenium-webdriver');

//const ProxyPlugin = require('selenium-chrome-proxy-plugin');
const ProxyPlugin = require('../');


function startWithProxy(config) {
  //const chrome        = require('selenium-webdriver/chrome');
  //const chromeOptions = new chrome.Options();

  //let plugin;
  return new ProxyPlugin({ proxyConfig: config })
    .then((plugin) => {
      console.log('PLUGIN READY');
      const driver = new webdriver.Builder()
        .forBrowser('chrome')
        .setChromeOptions(plugin.options)
        .build()
      ;
      return driver.get('http://whatismyip.host/')
        .then(_ => {
          plugin.cleanup();
          console.log('DONE');
        })
        ;
    })
    .catch((err) => console.log('ERROR:', err))
    ;
}

module.exports = startWithProxy;

const proxies = require('./credentials.json');
proxies.forEach(proxy => startWithProxy(proxy));

// startWithProxy({ host: '<proxy_host>', port: '<proxy_port>', username: '<proxy_username>', password: '<proxy_password>' });