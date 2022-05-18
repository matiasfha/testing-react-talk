import { Image, Gif, Poll, Emoticon, Schedule } from '../assets/ToolbarImages';
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

export default Toolbar;