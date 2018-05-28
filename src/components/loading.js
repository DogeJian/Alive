class Loading extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hide: false
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(prevProps.loading !== this.props.loading && !this.props.loading){
      setTimeout(() => {
        this.setState({hide: true})
      }, 1600)
    }
  }
  render(){
    let classNames = this.props.loading ? 'visible' : 'done'
    if(this.state.hide) classNames = `${classNames} hide`
    
    return(
      <div id="loading" className={classNames}>
        <div id="bars">
          <div className="bar"/>
          <div className="bar"/>
          <div className="bar"/>
        </div>
      </div>
    )
  }
}

export default Loading