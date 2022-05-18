import { build, sequence, perBuild } from '@jackfranklin/test-data-bot'
import { randFullName, randUserName, randRecentDate, randTextRange} from '@ngneat/falso';

const tweetBuilder = build<Tweet>('Tweet', {
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

export const tweets = [...new Array(10)].map(() => tweetBuilder())
export const newTweet = {
  avatar: `https://i.pravatar.cc/100?u=${randUserName()}`,
  author: 'John Doe',
  tag: '@johndoe',
  date: '2020-01-01',
  id: 100,
  content: 'content'
}