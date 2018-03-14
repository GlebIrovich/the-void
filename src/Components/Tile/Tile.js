import React, {Component} from 'react';
import './Tile.css';

export class Tile extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  changeColor(){
    let name = 'tile';
    if(this.props.isSafe && this.props.isClicked) {
      return name += ' safe';
    } else if (!this.props.isSafe && this.props.isClicked) {
      return name += ' hell';
    } else if (this.props.isSafe && this.props.startPreview) {
      return name += ' safe';
    } else if (!this.props.isSafe && this.props.startPreview) {
      return name += ' hell';
    }
    return name;
  }
  handleClick(){
    if(!this.props.startPreview){
      this.props.gameStatus(this.props.id);
    }
  }
  render(){
    const name = this.changeColor();
    return (
      <div
        className={name}
        onClick={this.handleClick}/>
    )
  }
}
