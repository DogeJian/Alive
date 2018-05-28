import TopBar from './topBar'
import {SoundWaves} from './soundWaves'
import Particles from './particles'
import ControlBar from './controlBar'
import Loading from './loading'

class MusicApp extends React.Component {
  constructor(props){
    super(props)
    this.initAudio = this.initAudio.bind(this)
    this.togglePlaying = this.togglePlaying.bind(this)
    this.toggleMute = this.toggleMute.bind(this)
    this.setSongEnded = this.setSongEnded.bind(this)
    this.restartSong = this.restartSong.bind(this)
    this.setDraggingTime = this.setDraggingTime.bind(this)
    this.setOverridePercentage = this.setOverridePercentage.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleMouseAway = this.handleMouseAway.bind(this)
    this.setAudioTime = this.setAudioTime.bind(this)
    this.setDefaultAudioSettings = this.setDefaultAudioSettings.bind(this)
    const nLines = Math.floor(window.innerWidth / 20)
    this.state = {
      title: {
        main: 'Alive',
        sub: 'Simon More'
      },
      loading: true,
      isDraggingTime: false,
      isPlaying: false,
      mute: false,
      end: false,
      tCount: 0,
      nLines,
      waves: [
        { id: "wave-1", nLines: nLines, wHeight: 150, wWidth: 5, duration: 150, range: {start: 0.1, end: 0.3}, peakFreq: 5},
        { id: "wave-2", nLines: nLines, wHeight: 150, wWidth: 5, duration: 150, range: {start: 0.6, end: 0.9}, peakFreq: 5},
        { id: "wave-3", nLines: nLines, wHeight: 50, wWidth: 7, duration: 100, range: {start: 0, end: 1}, peakFreq: 7}
      ],
      audio: null,
      overridePercentage: -1
    }
  }
  componentDidMount(){
    this.initAudio()
  }
  initAudio(){
    let audio = new Audio('link\SimonMoreAlive.mp3')
    if(audio){
      try{
        audio.addEventListener('loadedmetadata', () => {
          setTimeout(() => {
            audio.muted = this.state.mute
            audio.play()
            this.setState({audio, tCount: Math.round(audio.duration), loading: false})
            this.restartSong()
          }, 1000)
        })
        audio.addEventListener('error', () => {
          this.setDefaultAudioSettings()
        })
      }
      catch(err){
        this.setDefaultAudioSettings()
      }
    }
    else{
      this.setDefaultAudioSettings()
    }
  }
  setDefaultAudioSettings(){
    this.setState({tCount: 240, isPlaying: true, loading: false})
  }
  togglePlaying(isPlaying){
    if(this.state.audio){
      if(isPlaying){
        this.state.audio.play()
      }
      else{
        this.state.audio.pause()
      }
    }
    this.setState({isPlaying})
  }
  toggleMute(isMuted){
    if(this.state.audio) this.state.audio.muted = isMuted
    this.setState({mute: isMuted})
  }
  setSongEnded(isEnded){
    this.setState({end: isEnded})
    this.togglePlaying(!isEnded)
  }
  restartSong(){
    this.setState({end: false, isPlaying: true, mute: false})
    if(this.state.audio){
      this.state.audio.muted = false
      this.state.audio.currentTime = 0
      this.state.audio.play()
    }
  }
  handleMouseMove(e){
    if(this.state.isDraggingTime){
      const percentage = Math.round((e.clientX / window.innerWidth).toFixed(2) * 100)
      this.setOverridePercentage(percentage)
    }
  }
  handleMouseAway(){
    this.setDraggingTime(false)
  }
  setDraggingTime(isDraggingTime){
    this.setState({isDraggingTime})
  }
  setOverridePercentage(percentage){
    this.setState({overridePercentage: percentage})
  }
  setAudioTime(time){
    if(this.state.audio){
      this.state.audio.currentTime = time
    }
  }
  render(){
    return(
      <div id="music-app" onMouseMove={this.handleMouseMove} onMouseUp={this.handleMouseAway} onMouseLeave={this.handleMouseAway}>
        <Loading loading={this.state.loading}/>
        <TopBar title={this.state.title}/>
        <SoundWaves 
          waves={this.state.waves}
          nLines={this.state.nLines}
          isPlaying={this.state.isPlaying}
          mute={this.state.mute}
          end={this.state.end}
          loading={this.state.loading}
        />
        <Particles 
          isPlaying={this.state.isPlaying} 
          loading={this.state.loading}
          isDraggingTime={this.state.isDraggingTime}
        />
        <ControlBar 
          tCount={this.state.tCount} 
          isPlaying={this.state.isPlaying} 
          togglePlaying={this.togglePlaying}
          mute={this.state.mute} 
          toggleMute={this.toggleMute}
          setSongEnded={this.setSongEnded}
          restartSong={this.restartSong}
          end={this.state.end}
          isDraggingTime={this.state.isDraggingTime}
          setDraggingTime={this.setDraggingTime}
          overridePercentage={this.state.overridePercentage}
          setOverridePercentage={this.setOverridePercentage}
          setAudioTime={this.setAudioTime}
        />
      </div>
    )
  }
}

export default MusicApp