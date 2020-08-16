import React, {useState, useEffect} from 'react';

import {apiloadTweets, apicreateTweet} from './lookup';


export function TweetsComponent(props) {
    const textAreaRef = React.createRef();
    const [newTweets, setNewTweets] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newVal = textAreaRef.current.value;

        apicreateTweet(newVal, handleBackendUpdate);
        
        textAreaRef.current.value = '';
    };

    const handleBackendUpdate = (response, status) => {
        // backend api handle response
        let tempNewTweets = [...newTweets];

        if (status === 201) {
            tempNewTweets.unshift(response);
            setNewTweets(tempNewTweets);
        } else {
            console.log(response);
            alert("An error occured please try again");
        };
    };

    return <div className={props.className}>
        <div className='col-12 mb-3'>
            <form onSubmit={handleSubmit}>
                <textarea ref={textAreaRef} required={true} className='form-control' name='tweet'>

                </textarea>
                <button type='submit' className='btn btn-primary my-3'>Tweet</button>
            </form>
        </div>
        <TweetsList newTweets={newTweets} />
    </div>;
};
  
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

    return tweets.map((tweet, idx) => {
        return <Tweet tweet={tweet} key={idx} className='my-5 py-5 border bg-white text-dark' />
    })
}

function ActionParent(props) {
    const {tweet} = props;
    const [likes, setLikes] = useState(tweet.likes ? tweet.likes : 0);
    const [userLiked, setUserLiked] = useState(false);
    
    return <div className='btn btn-group'>
        <ActionBtn tweet={props.tweet} likes={likes} setLikes={setLikes} userLiked={userLiked} setUserLiked={setUserLiked} action={{type: "like", display: "Likes"}} />
        <ActionBtn tweet={props.tweet} likes={likes} setLikes={setLikes} userLiked={userLiked} setUserLiked={setUserLiked} action={{type: "unlike", display: "Unlikes"}} />
        <ActionBtn tweet={props.tweet} action={{type: "retweet", display: "Retweet"}} />
    </div>
}

export function ActionBtn(props) {
    const {action} = props; // shortcut to access props.action and props.tweet directly
    
    const handleClick = (event) => {
        event.preventDefault();
        if (action.type === 'like') {
            if (props.userLiked === false) {
                props.setLikes(props.likes + 1);
                props.setUserLiked(true);
            };
        } else if (action.type === 'unlike') {
            if (props.userLiked === true) {
                props.setLikes(props.likes - 1);
                props.setUserLiked(false);
            };
        };
    };
    
    const display = action.type === 'like' ? `${props.likes} ${action.display}` : action.display;

    return <button className='btn btn-primary btn-sm' onClick={handleClick}>{display}</button>;
  };
  
export function Tweet(props) {
    const className = props.className ? props.className : 'col-10 mx-auto col-md-6';
    return <div className={className}>
        <p key={`id-${props.idx}`}>{props.tweet.content}</p>
        <ActionParent tweet={props.tweet} />
    </div>;
};