import { rest } from 'msw';
import { build, sequence, perBuild } from '@jackfranklin/test-data-bot'
import { randFullName, randUserName, randRecentDate, randTextRange, seed } from '@ngneat/falso';

const delay = import.meta.env.NODE_ENV === 'test' ? 0 : 1500;

const tweetBuilder = build('Tweet', {
  fields:
  {
    avatar: perBuild(() => `https://i.pravatar.cc/100?u=${randUserName()}`),
    author: perBuild(() => randFullName()),
    tag: perBuild(() => randUserName()),
    date: perBuild(() => randRecentDate()),
    content: perBuild(() => randTextRange({ min: 10, max: 280 })),
    id: sequence()
  },
})

const tweets = [...new Array(10)].map(() => tweetBuilder())


export const handlers = [
  rest.get('/api/tweets', async (req, res, ctx) => {
    return res(ctx.delay(delay), ctx.json(tweets))
  }),
  rest.post('/api/tweets', async (req, res, ctx) => {
    // @ts-ignore
    if (req.body.tweet) {
      const newTweet = {
        avatar: 'https://pbs.twimg.com/profile_images/1410605776171790343/H2oHr9kW_400x400.jpg',
        author: 'CleverTech',
        tag: 'clevertech',
        date: new Date(),
        // @ts-ignore
        content: req.body.tweet,
        id: sequence() 
      }
      
      return res(ctx.delay(delay), ctx.json(newTweet))
    }
    return res(ctx.delay(delay), ctx.status(400), ctx.json({ error: 'No tweet provided' }))
  })
]
