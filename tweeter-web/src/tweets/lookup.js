import {backendLookup} from '../lookup';


export function apicreateTweet(newTweet, callback) {
    backendLookup("POST", "/tweets/create/", callback, {content: newTweet});
};

export function apiloadTweets(callback) {
    backendLookup("GET", "/tweets", callback);
};