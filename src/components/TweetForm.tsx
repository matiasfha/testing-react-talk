import React from "react"
import Toolbar from "./Toolbar"

const TweetForm = ( { onSubmit }: {onSubmit: (tweet: string) => void }) => {
  const textRef = React.useRef<HTMLTextAreaElement | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      onSubmit(textRef.current!.value)
      event.currentTarget.reset()
  }
  return (
      <form className="tweet-form" onSubmit={handleSubmit}>
          <img src="" className="avatar" />
          <div className="container">
              <textarea className="tweet-text" placeholder="¿Qué estás pensando?" ref={textRef}></textarea>
              <div className="tools">
                  <Toolbar />
                  <button className="bg-dodger-blue  rounded-full py-3 px-6 h-12 w-56  text-white" type="submit">
                      Twitting
                  </button> 
              </div>
          </div>
      </form>
  )
}

export default TweetForm