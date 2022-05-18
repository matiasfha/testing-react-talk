import { Reply, Retweet, Like, Share } from '../assets/ToolbarImages';

const images = [Reply, Retweet, Like, Share]
const Toolbar = () => {
    return (
        <div className="toolbar">
            {images.map((Item, index) => {
                return <Item key={index} />
            })}
        </div>
    )
}



const Tweet = ({ tweet }: { tweet: Tweet}) => {
    
    return (
        <div className="tweet-card">
            <img src={tweet.avatar} className="avatar" />
            <div className="container">
                <h5 className="author">
                    {tweet.author}
                    <span>@{tweet.tag} {new Date(tweet.date).toLocaleDateString()}</span>
                </h5>
                <p>{tweet.content }</p>
                <Toolbar />
            </div>
        </div>
    )
}

const TweetList = ({ tweets = [] }: { tweets: Tweet[]}) => {
    return (
        <div className="tweets">
            {tweets.map(tweet => {
                return <Tweet key={tweet.id} tweet={tweet} />
            })}
        </div>
    )
}

export default TweetList