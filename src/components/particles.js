import {getRand} from '../util'

class Particles extends React.PureComponent {
  render(){
    const {isPlaying, isDraggingTime, loading} = this.props
    let particles = [],
        nParticles = window.innerWidth / 8
    for(let i = 0; i < nParticles; i++){
      const left = getRand(1, window.innerWidth),
            height = getRand(40, 60),
            delay = getRand(0, 1000),
            duration = isDraggingTime ? getRand(100, 400) : getRand(500, 1500),
            direction = getRand(1, 1000),
            size = getRand(1, 1000),
            pathStyle = {
              height: `${height}px`, 
              left: `${left}px`, 
              opacity: isPlaying ? 1 : 0,
              transform: `${direction % 2 === 0 ? 'translateY(0%)' : 'translateY(-100%)'}`
            },
            particleStyle = {
              animationName: `${direction % 2 === 0 ? 'particle-down' : 'particle-up'}`,
              animationDelay: `${delay * -1}ms`, 
              animationDuration: `${duration}ms`,
              height: `${size % 2 === 0 ? '4px' : '2px'}`,
              width: `${size % 2 === 0 ? '4px' : '2px'}`
            }
      particles.push(
        <div key={i} className="particle-path" style={pathStyle}>
          <div className="particle" style={particleStyle}/>
        </div>
      )
    }
    return(
      <div id="particles" className={loading ? '' : 'visible'}>
        {particles}
      </div>
    )
  }
}

export default Particles