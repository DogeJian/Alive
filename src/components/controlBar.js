import {getTime} from '../util'

class ControlBar extends React.Component{
  constructor(props){
    super(props)
    this.setDraggingTime = this.setDraggingTime.bind(this)
    this.getCountFromPercentage = this.getCountFromPercentage.bind(this)
    this.handlePercentageOverride = this.handlePercentageOverride.bind(this)
    this.state = {
      count: 0,
      interval: null
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.isPlaying !== this.props.isPlaying){
      if(!this.props.isPlaying)
        this.stopTime()
      else
        this.startTime()
    }
  }
  startTime(){
    const interval = setInterval(() => {
      this.setState({count: ++this.state.count})
    }, 1000)
    this.setState({interval})
  }
  stopTime(){
    clearInterval(this.state.interval)
  }
  getCountFromPercentage(){
    return Math.round((this.props.overridePercentage / 100) * this.props.tCount)
  }
  getPercentage(){
    if(this.props.isDraggingTime){
      return this.props.overridePercentage
    }
    else{
      if(this.props.overridePercentage >= 0){
        const percentage = this.props.overridePercentage
        this.handlePercentageOverride()
        return percentage
      }
      else if(this.props.end){
        return 100
      }
      let percentage = (this.state.count / this.props.tCount) * 100
      return Math.min(percentage, 100)
    }
  }
  handlePercentageOverride(){
    const count = this.getCountFromPercentage()
    this.setState({count})
    this.props.setOverridePercentage(-1)
    this.props.setAudioTime(count)
    if(this.props.end) this.props.setSongEnded(false)
  }
  setDraggingTime(isDraggingTime){
    this.props.setDraggingTime(isDraggingTime)
  }
  render(){
    const percentage = this.getPercentage(),
          {count} = this.state,
          time = this.props.end ? this.props.tCount : count,
          currTime = getTime(time, false),
          endTime = getTime(this.props.tCount, false),
          {isPlaying, togglePlaying, mute, isDraggingTime, toggleMute, restartSong, setSongEnded, end} = this.props
    if(this.props.tCount !== 0 && count >= this.props.tCount){
      this.setState({count: 0})
      this.stopTime()
      setSongEnded(true)
    }
    
    const classNames = isDraggingTime ? 'dragging' : ''
    return(
      <div id="control-bar" className={classNames}>
        <ProgressBar percentage={percentage} setDraggingTime={this.setDraggingTime}/>
        <PlayToggle isPlaying={isPlaying} togglePlaying={togglePlaying} end={end}/>
        <Restart restartSong={() => {
          restartSong()
          this.setState({count: 0})
        }}/>
        <Volume mute={mute} toggleMute={toggleMute}/>
        <Time time={currTime} endTime={endTime}/>
      </div>
    )
  }
}

const ProgressBar = ({percentage, setDraggingTime}) => (
  <div id="progress-bar" className="button">
    <div id="filled" style={{width: `${percentage}%`}}>
      <div id="dragger" onMouseDown={() => {setDraggingTime(true)}}/>
    </div>
  </div>
)

const PlayToggle = ({isPlaying, togglePlaying, end}) => (
  <div id="play-toggle" className={isPlaying ? "button toggled" : "button"} onClick={() => {
        if(!end){
          togglePlaying(!isPlaying)
        }
    }}>
    <div id="play">
      <i className="fa fa-play"/>
    </div>
    <div id="pause">
      <i className="fa fa-pause"/>
    </div>
  </div>
)

const Restart = ({restartSong}) => (
  <div id="restart" className="button" onClick={restartSong}>
    <i className="fa fa-undo"/>
  </div>
)

const Volume = ({mute, toggleMute}) => (
  <div id="volume-toggle" className={mute ? "button toggled" : "button"} onClick={() => {toggleMute(!mute)}}>
    <div id="volume-on">
      <i className="fa fa-volume-up"/>
    </div>
    <div id="volume-off">
      <i className="fa fa-volume-off"/>
    </div>
  </div>
)

const Time = ({time, endTime}) => (
  <div id="control-bar-time">
    <h1><span id="current-time">{time}</span> / <span id="end-time">{endTime}</span></h1>
  </div>
)

export default ControlBar