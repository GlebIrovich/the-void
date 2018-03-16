import React, {Component} from 'react';
import ReactTouchEvents from "react-touch-events";
import './Tile.css';
import clickOkSound from './click.mp3';
import clickFailSound from './fail.mp3';
// let clickSound = new Audio('click.mp3');

export class Tile extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.clickOkSound = new Audio(clickOkSound);
    this.clickFailSound = new Audio(clickFailSound);
    this.playSound = this.playSound.bind(this);
  }
  playSound(){
    if(this.props.isSafe) {
      this.clickOkSound.play();
      return
    }
    this.clickFailSound.play();
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
      this.playSound();
      this.props.gameStatus(this.props.id);
    }
  }
  render(){
    const name = this.changeColor();
    return (
      <ReactTouchEvents
            onTap={ this.handleClick }
            >

            <div
              className={name}
              onClick={this.handleClick}/>

      </ReactTouchEvents>
    )
  }
}
