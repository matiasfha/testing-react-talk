import { rest } from 'msw';
import { sequence } from '@jackfranklin/test-data-bot'
import { tweets } from './tweetsBuilder'
const delay = process.env.NODE_ENV === 'test' ? 0 : 1500;


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
