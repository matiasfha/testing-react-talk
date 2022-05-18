import React from 'react';
import { Image, Gif, Poll, Emoticon, Schedule } from '../assets/ToolbarImages';
import TweetList from './TweetList'


const images = [Image, Gif, Poll, Emoticon, Schedule]
const Toolbar = () => {
    return (
        <div className="tools-content">
            {images.map((Item, index) => {
                return <Item key={index} />
            })}
        </div>
    )
}

const Header = () => {
    return (
        <div className="header">
            <h2>Inicio</h2>
        </div>
    )
}


const TweetForm = ( { onSubmit }: {onSubmit: (tweet: string) => void }) => {
    const textRef = React.useRef<HTMLTextAreaElement | null>(null)

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(textRef.current!.value)
    }
    return (
        <form className="tweet-form" onSubmit={handleSubmit}>
            <img src="" className="avatar" />
            <div className="container">
                {/* 💡 Aqui debes agregar el elemento textarea para capturar el texto del usuario */}
                <textarea className="tweet-text" placeholder="¿Qué estás pensando?" ref={textRef}></textarea>
                <div className="tools">
                    <Toolbar />
                    <button className="bg-dodger-blue  rounded-full py-3 px-6 h-12 w-56  text-white">
                        Twittear
                    </button> 
                </div>
            </div>
        </form>
    )
}

interface State {
    status: 'pending' | 'resolved' | 'rejected',
    responseData: Tweet[],
    errorMessage: string | null
}

type ActionType = { type: 'START' } | { type: 'RESOLVE', responseData: Tweet[] } | { type: 'REJECT', error: Error }

function fetchReducer(state: State, action: ActionType): State {
    switch(action.type) {
        case 'START': 
            return {status: 'pending', responseData: [], errorMessage: null}
        case 'RESOLVE':
            return {status: 'resolved', responseData: action.responseData, errorMessage: null}
        case 'REJECT':
            return {status: 'rejected', responseData: [], errorMessage: action.error.message}
        default:
            return state
    }
}

const initialState: State = {
    status: 'pending',
    responseData: [],
    errorMessage: null
}
const Main = () => {
    const [state, dispatch] = React.useReducer(fetchReducer, initialState)

    React.useEffect(() => {
        fetch('/api/tweets')
            .then(response => response.json())
            .then(responseData => {
                dispatch({type: 'RESOLVE', responseData})
            })
            .catch(error => {
                dispatch({type: 'REJECT', error})
            })
    }, [])

    const onSubmit = (tweet: string) => {
        dispatch({ type: 'START'})
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
            dispatch({type: 'RESOLVE', responseData})
        })
        .catch(error => {
            dispatch({type: 'REJECT', error})
        })          
    }
    
    return (
        <main className="main">
            <Header />
            <TweetForm onSubmit={onSubmit}/>
            {state.status === 'pending' ? 'Loading...' : <TweetList tweets={state.responseData} /> }
        </main>
    )
}



export default Main