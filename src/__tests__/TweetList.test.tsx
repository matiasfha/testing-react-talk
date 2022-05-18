import { render, screen } from '@testing-library/react';
import { tweets, newTweet} from '../mocks/tweetsBuilder';
import TweetList, { Tweet} from '../components/TweetList';


describe('TweetList', () => {
  test('should render the list container with tweets', () => {
    render(<TweetList tweets={tweets} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    const items = screen.getAllByRole("listitem")
    expect(items).toHaveLength(tweets.length);
    expect(items[0]).toHaveTextContent(tweets[0].content);
    
  })
  
  test('should render an empty list', () => {
    render(<TweetList tweets={[]} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    const list = screen.queryAllByRole("listitem")
    expect(list).toHaveLength(0);
  })

  test('should push a new tweet in the list', () => {
    const { rerender } = render(<TweetList tweets={tweets} />);
    expect(screen.getByRole("list")).toBeInTheDocument();
    let items = screen.getAllByRole("listitem")
    expect(items).toHaveLength(tweets.length);
    const data = [newTweet, ...tweets]
    rerender(<TweetList tweets={data} />)
    expect(screen.getAllByRole("listitem")).toHaveLength(data.length);
    items = screen.getAllByRole("listitem")
    expect(items[0]).toHaveTextContent(data[0].content); 
       
  })
})

describe('Tweet', () => {
  test('should render a tweet', () => {
    render(<Tweet tweet={tweets[0]} />);
    expect(screen.getByRole("listitem")).toBeInTheDocument();
    expect(screen.getByText(tweets[0].content)).toBeInTheDocument();
    expect(screen.getByText(tweets[0].author)).toBeInTheDocument();
  })
})
