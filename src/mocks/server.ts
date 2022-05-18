import {setupWorker} from 'msw'
import {handlers} from './server-handlers'
console.log(handlers)
export const server = setupWorker(...handlers)
