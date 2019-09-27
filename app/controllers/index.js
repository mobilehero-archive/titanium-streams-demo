$.index.open();

// const apikey = '<INSERT_API_KEY_HERE>';
const apikey = 'ZTU0YmRmZDAtNGVjYi00ZmM0LWFiNDctMGIwMGQzM2U3MTFh';

const streams = require('@titanium/streams');
const jsonPatch = require('fast-json-patch');

// add whatever header required by your API
// header array is not required, but if used, is passed in to the createEventSource function (as seen below)
// const headers = ['Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ=='];
const headers = [];

// Example using fake stock market data
// const myEventSource = streams.createEventSource('https://stockmarket.streamdata.io/prices', apikey, headers);

// Example using fake name generator API
// const myEventSource = streams.createEventSource('https://uinames.com/api/?region=united%20states', apikey);


const myEventSource = streams.createEventSource('https://api.twitter.com/1.1/search/tweets.json?q=trump&result_type=recent&count=100', apikey);

let document = {};

myEventSource
	.onData(data => {
		// initialize your data with the initial snapshot
		console.error('you are here → onData');
		console.info(`data: ${JSON.stringify(data, null, 2)}`);
		document = data;
		// updateView();
	})
	.onPatch(patch => {
		// update the data with the provided patch
		console.error('you are here → onPatch');
		console.warn(`patch: ${JSON.stringify(patch, null, 2)}`);
		document = jsonPatch.applyPatch(document, patch).newDocument;
		console.info(`document: ${JSON.stringify(document, null, 2)}`);

		updateView();
	})
	.onError(error => {
		// do whatever you need in case of error
		console.error('you are here → onError');
		console.error(error);
	})
	.onOpen(() => {
		// you can also add custom behavior when the stream is opened
		console.error('you are here → onOpen');
	});

function updateView() {
	$.firstname.text = document.name;
	$.lastname.text = document.surname;
	$.gender.text = document.gender;
	$.region.text = document.region;
}

myEventSource.open();
