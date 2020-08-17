import {backendLookup} from '../lookup';


export function apicreateTweet(newTweet, callback) {
    backendLookup("POST", "/tweets/create/", callback, {content: newTweet});
};

export function apiloadTweets(callback) {
    backendLookup("GET", "/tweets", callback);
};

export function apiactionTweets(tweetId, action, callback) {
    const data = {id: tweetId, action: action};
    backendLookup("POST", "/tweets/action/", callback, data);
};
