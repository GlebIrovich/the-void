import React, {Component} from 'react';
import './Overlay.css';

const levels=[
  {
    level: 'easy',
    grid: 5
  },
  {
    level: 'medium',
    grid: 7
  },
  {
    level: 'hard',
    grid: 9
  },
  {
    level: 'nightmare',
    grid: 15
  }
];

export class Overlay extends Component{
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
    this.handleBackToMenu = this.handleBackToMenu.bind(this);
  }
  returnButton(){
    if(this.props.gameStatus.gameOver){
      return <h1 className='start-button'
        onClick={this.handleBackToMenu}>Main menu</h1>
    }
  }
  handleBackToMenu(){
    this.props.backToMenu()
  }
  handleClick(){
    this.props.startGame()
  }
  handleDifficultyChange(event){
    this.props.setDifficulty(parseInt(event.target.getAttribute('data-grid'), 10))
  }
  score(){
    if(this.props.gameStatus.gameOver){
      return `Number of Attempts: ${this.props.score}`
    }
  }
  message(){
    if (this.props.gameStatus.gameOver) {
      return 'Game Over!';
    } else if (this.props.gameStatus.victory) {
      return 'You won!'
    } else {
      return 'Hi! Click Start to beging playing!'
    }
  }
  button() {
    if (this.props.gameStatus.gameOver) {
      return 'Restart';
    } else {
      return 'Start';
    }
  }
  showLevels() {
    if (!this.props.gameStatus.gameOver) {
      return levels;
    }
    return [];
  }
  isChosen(grid){
    if (grid === this.props.dims.rows){
      return {opacity: 1}
    }
    return {opacity: ''}
  }
  render() {
    const style = {
      gridColumn: `1 / span ${this.props.dims.columns}`,
      gridRow: `1 / span ${this.props.dims.rows}`,
      display: this.props.gameStatus.gameOver || this.props.gameStatus.victory || this.props.overlay ? 'block' : 'none'
    }
    return (
      <div
        style={style}
        className='overlay'>
        <p className='message'>{this.message()} <br/> {this.score()}</p>
        <h1 className='start-button'
          onClick={this.handleClick}>{this.button()}</h1>
        {this.returnButton()}
        {this.showLevels().map(
          level => {
            return <h1 className='difficulty'
              key={level.grid}
              data-grid={level.grid}
              onClick={this.handleDifficultyChange}
              style={this.isChosen(level.grid)}>{level.level}</h1>
          }
        )}
      </div>
    )
  }
}
