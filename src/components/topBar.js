class TopBar extends React.Component{
  render(){
    return(
      <div id="top-bar">
        <Title title={this.props.title}/>
      </div>
    )
  }
}

const Title = ({title}) => (
  <div id="title">
    <h1 id="main-title">{title.main}</h1>
    <h1 id="sub-title">{title.sub}</h1>
  </div>
)

export default TopBar