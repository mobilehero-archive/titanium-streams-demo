$.index.open();


const apikey = '<INSERT_API_KEY_HERE>';
const streams = require('@titanium/streams');
const jsonPatch = require('fast-json-patch');

const myEventSource = streams.createEventSource('https://stockmarket.streamdata.io/prices', apikey);

let document = {};

myEventSource.onData(data => {
	// initialize your data with the initial snapshot
	console.error('you are here → onData');
	console.info(`data: ${JSON.stringify(data, null, 2)}`);
	document = data;
}).onPatch(patch => {
	// update the data with the provided patch
	console.error('you are here → onPatch');
	console.warn(`patch: ${JSON.stringify(patch, null, 2)}`);
	document = jsonPatch.applyPatch(document, patch).newDocument;
	console.info(`document: ${JSON.stringify(document, null, 2)}`);

}).onError(error => {
	// do whatever you need in case of error
	console.error('you are here → onError');
	console.error(error);
}).onOpen(() => {
	// you can also add custom behavior when the stream is opened
	console.error('you are here → onOpen');
});


myEventSource.open();
