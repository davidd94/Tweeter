import React, {useState, useEffect} from 'react';

import {apiloadTweets} from './lookup';
import {Tweet} from './detail';


export function TweetsList(props) {
    const [tweetsInit, setTweetsInit] = useState(props.newTweets ? props.newTweets : []);
    const [tweets, setTweets] = useState([]);
    const [tweetsDidSet, setTweetsDidSet] = useState(false);
    
    useEffect(() => {
        const final = [...props.newTweets].concat(tweetsInit);
        if (final.length !== tweets.length) {
            setTweets(final);
        };
        
    }, [props.newTweets, tweets, tweetsInit]);

    useEffect(() => {
        if (tweetsDidSet === false) {
            const handleTweetsListLookup = (response, status) => {
                setTweetsInit(response);
                setTweetsDidSet(true);
            };
            apiloadTweets(handleTweetsListLookup);
        };
    }, [tweetsInit, tweetsDidSet, setTweetsDidSet]);

    const handleDidRetweets = (newTweet) => {
        const updateTweetsInit = [...tweetsInit];
        updateTweetsInit.unshift(newTweet);
        setTweetsInit(updateTweetsInit);

        const updateFinalTweets = [...tweets];
        updateFinalTweets.unshift(tweets);
        setTweets(updateFinalTweets);
    };

    return tweets.map((tweet, idx) => {
        return <Tweet tweet={tweet} 
                      key={idx} 
                      className='my-5 py-5 border bg-white text-dark'
                      didRetweet={handleDidRetweets} />
    })
};