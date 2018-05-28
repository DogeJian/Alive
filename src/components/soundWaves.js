const SoundWaves = ({waves, nLines, isPlaying, mute, end, loading}) => {
  const soundWaves = waves.map(wave => (
    <SoundWave 
      id={wave.id} 
      key={wave.id}
      wHeight={wave.wHeight}
      wMinHeight={wave.wMinHeight}
      wWidth={wave.wWidth}
      duration={wave.duration}
      range={wave.range}
      peakFreq={wave.peakFreq}
      nLines={nLines}
      isPlaying={isPlaying}
      mute={mute}
      end={end}
    />
  ))
  
  return(
    <div id="sound-waves" className={loading ? '' : 'visible'}>
      {soundWaves}
    </div>
  )
}

class SoundWave extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      lineHeights: [],
      interval: 0
    }
  }
  componentDidMount(){
    const {duration, peakFreq} = this.props
    this.setLineHeights(true, false)
    setInterval(() => {
      const up = this.state.interval % 2 === 0,
            bump = this.state.interval % peakFreq === 0
      this.setLineHeights(up, bump)
      this.setState({interval: ++this.state.interval})
    }, duration)
  }
  getNearestInterval(interval, number, start){
    let offset = start ? 0 : -1
    return Math.ceil(number / interval) * interval + offset
  }
  setLineHeights(up, bump) {
    const {nLines, wHeight, wMinHeight, wWidth, range, isPlaying, mute, end} = this.props
    let lineHeights = [],
        minHeight = 2,
        height = 0,
        rand = 0,
        maxHeight = up ? wHeight : Math.round(wHeight * (Math.random() + 0.01)),
        half = (wWidth - 1) / 2,
        inc = 1 / (half + 1),
        startLine = this.getNearestInterval(wWidth, Math.round(nLines * range.start), true),
        endLine = this.getNearestInterval(wWidth, Math.round(nLines * range.end), false)
    
    if(bump) maxHeight *= 2
    for(let i = 0; i < nLines; i += wWidth){
      rand = Math.floor(Math.random() * maxHeight)
      if(wMinHeight) rand += wMinHeight
      else rand += minHeight
      for(let j = 0; j < wWidth; j++){
        height = 0
        if(end || !isPlaying || i + j < startLine || i + j > endLine){
          height = minHeight
        }
        else if(j < half){
          height += (rand * inc * (j + 1))
        }
        else if(j === half){
          height += rand
        }
        else{
          height += (rand * (1 - (inc * (j - half))))
        }
        lineHeights.push(Math.round(height))
      }
    }
    this.setState({lineHeights})
  }
  getSoundLines() {
    let lines = []
    const {nLines, interval} = this.props
    for(let i = 0; i < nLines; i++){
      const style = { height: this.state.lineHeights[i] + 'px' },
            line = <div key={i} className="sound-line" style={style}/>
      lines.push(line)
    }
    return lines
  }
  render(){
    const {id} = this.props,
          soundLines = this.getSoundLines()
    return(
      <div id={id} className="sound-wave">
        {soundLines}
      </div>
    )
  }
}

export  {SoundWaves}