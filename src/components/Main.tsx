import React from 'react';
import Header from './Header';
import TweetForm from './TweetForm';

import TweetList from './TweetList'


interface State {
    status: 'pending' | 'resolved' | 'rejected',
    responseData: Tweet[],
    errorMessage: string | null
}

type ActionType = { type: 'START' } | { type: 'RESOLVE', responseData: Tweet[] } | { type: 'REJECT', error: Error } | { type: 'TWEETED', tweet: Tweet }

function tweetsReducer(state: State, action: ActionType): State {
    switch(action.type) {
        case 'START': 
            return {status: 'pending', responseData: [], errorMessage: null}
        case 'RESOLVE':
            return {status: 'resolved', responseData: action.responseData, errorMessage: null}
        case 'REJECT':
            return {status: 'rejected', responseData: [], errorMessage: action.error.message}
        case 'TWEETED':
            console.log({ state, action })
            return {...state, responseData: [action.tweet, ...state.responseData]}
        default:
            return state
    }
}

const initialState: State = {
    status: 'pending',
    responseData: [],
    errorMessage: null
}

interface UseFetchTweetsArgs  {
    onResolve: (responseData: Tweet[]) => void, onReject: (error: Error) => void
}
const useFetchTweets = ({ onResolve, onReject }: UseFetchTweetsArgs) => {
    React.useEffect(() => {
        fetch('/api/tweets')
            .then(response => response.json())
            .then(responseData => {
                onResolve(responseData)
            })
            .catch(error => {
                onReject(error)
            })
    }, [])
}

interface UseSubmitTweetArgs { onStart: () => void, onResolve: (tweet: Tweet) => void, onReject: (error: Error) => void }
const useSubmitTweet = ({ onStart, onResolve, onReject }: UseSubmitTweetArgs) => {
    return (tweet: string ) => {
        onStart()
        fetch('/api/tweets', {
            method: 'POST',
            body: JSON.stringify({
                tweet,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(responseData => {
            onResolve(responseData)
        })
        .catch(error => {
            onReject(error)
        })    
    }
          
}

const Main = () => {
    const [state, dispatch] = React.useReducer(tweetsReducer, initialState)
    
    useFetchTweets({
        onResolve: responseData => dispatch({type: 'RESOLVE', responseData}),
        onReject: error =>  dispatch({type: 'REJECT', error})
    })
    
    const onSubmit = useSubmitTweet({
        onStart: () => {},
        onResolve: tweet => { dispatch({type: 'TWEETED', tweet }) },
        onReject: error => { dispatch({type: 'REJECT', error}) } 
    })
    
    
    return (
        <main className="main">
            <Header />
            <TweetForm onSubmit={onSubmit}/>
            {state.status === 'pending' ? 'Loading...' : <TweetList tweets={state.responseData} /> }
        </main>
    )
}

     

export default Main