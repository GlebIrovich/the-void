import React, { Component } from 'react';
import { Tile } from '../Tile/Tile';
import { Overlay } from '../Overlay/Overlay';
import './Grid.css';
import winSound from './win.mp3';
const _ = require('lodash');
//
// const path = ['c2r0', 'c2r1', 'c2r2','c2r3','c2r4'];

export class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dims: {
        columns: 5,
        rows: 5
      },
      path: [],
      gameOver: false,
      victory: false,
      playerPath: [],
      preview: false,
      overlay: true,
      grid: [],
      score: 0
    }
    this.winSound = new Audio(winSound);

    this.gameStatus = this.gameStatus.bind(this);
    this.startGame = this.startGame.bind(this);
    this.generate = this.generate.bind(this);
    this.definePath = this.definePath.bind(this);
    this.setDifficulty = this.setDifficulty.bind(this);
    this.backToMenu = this.backToMenu.bind(this);
    this.setScore = this.setScore.bind(this);
  }
  gameStatus(key){
    let path = this.state.path;
    let playerPath = this.state.playerPath;
    playerPath.push(key)
    // check if tile was save
    if (this.state.path.includes(key)){

      // check if chosen tile led to victory
      if( _.isEqual(_.sortBy(path),_.uniq(_.sortBy(playerPath)) ) ) {
        this.winSound.play();
        this.setScore(false);
        this.setState({
          victory: true
        })
        return;
      }
      // add chosen tile to the players current path
      this.setState({
        playerPath: playerPath
      })
      return;
    }
    // else GameOver
    this.setScore(true);
    this.setState({
      gameOver: true
    })
    return;
  }
  setScore(lose){
    let score = this.state.score;
    score = lose ? score + 1 : 0;
    console.log(score);
    this.setState({
      score: score
    })
  }
  definePath(grid){
    let path = [];
    for (var row = 0; row < grid.length; row++) {
      for (var column = 0; column < grid[0].length; column++) {
        if(grid[row][column]) {
          path.push(`c${column}r${row}`)
        }
      }
    }
    this.setState({
      path: path
    })
  }
  tilePositions() {
    const grid = this.state.grid;
    let positions = [];
    for (var row = 0; row < grid.length; row++) {
      for (var column = 0; column < grid[0].length; column++) {
        positions.push({
          key: `c${column}r${row}`,
          column: column,
          row: row
        })
      }
    }
    return positions;
  }
  // Starts new game
  startGame() {
    // if not game over -> generate new level
    if(!this.state.gameOver){
      this.generate();
    }
    // restart game
    this.setState({
      gameOver: false,
      victory: false,
      playerPath: []
    })
    // hide Overlay
    this.setState({
      overlay:false
    })
    // activate preview
    this.setState({
      preview: true
    })
    setTimeout(function(){
      this.setState({
        preview: false
      })
    }.bind(this), 1000);
  }
  backToMenu(){
    this.setState({
      gameOver: false,
      overlay:true,
      score: 0
    })
  }
  createArray(){
    let grid = [];
    for (var i = 0; i < this.state.dims.rows; i++) {
      grid.push(_.fill(Array(this.state.dims.columns),0))
    }
    return grid;
  }
  random(n){return Math.floor(Math.random()*n)}
  fillMissing(from, to, array){
    for (var i = from; i <= to; i++) {
      array[i] = 1;
    }
  }
  generate(){
    let grid = this.createArray();
    const columns = this.state.dims.columns;
    const start = {
      x:0,
      y: Math.floor(this.state.dims.columns / 2)
    }; // start position

    let currentPosition, prevPosition;
    prevPosition = start;
    for (var i = 1; i < (columns -1) ; i+=2) { // columns -1
      currentPosition = {
        x: i,
        y: this.random(columns - 1)
      };
      grid[i][currentPosition.y] = 1;
      if (prevPosition.y < currentPosition.y) {
        this.fillMissing(prevPosition.y, currentPosition.y, grid[i-1])
      } else {
        this.fillMissing(currentPosition.y, prevPosition.y, grid[i-1])
      }
      prevPosition = currentPosition;
    }
    // finish last row (I take start because start and finish are in the same column)
    if(start.y < prevPosition.y){
      this.fillMissing(start.y, prevPosition.y, grid[columns-1])
    } else {
      this.fillMissing(prevPosition.y, start.y, grid[columns-1])
    }

    this.setState({
      grid: grid
    })
    this.definePath(grid)
  }
  setDifficulty(lvl){
    this.setState({
      dims:
      {
        columns: lvl,
        rows: lvl
      }
    })
  }
  componentWillMount(){
    this.generate()
  }
  render() {
    const gridDim = {
      gridTemplateColumns: `repeat(${this.state.grid[0].length}, 1fr)`,
      gridTemplateRows: `repeat(${this.state.grid.length}, 1fr)`
    }
    return (
      <div className='grid' style={gridDim}>
        <Overlay
          dims = {this.state.dims}
          gameStatus={
            {
              gameOver: this.state.gameOver,
              victory: this.state.victory,
            }
          }
          score={this.state.score}
          backToMenu={this.backToMenu}
          overlay= {this.state.overlay}
          startGame={this.startGame}
          setDifficulty={this.setDifficulty}/>
        {this.tilePositions().map((tilePosition) => {
            return <Tile
              key={tilePosition.key}
              id={tilePosition.key}
              startPreview={this.state.preview}
              isSafe={this.state.path.includes(tilePosition.key)}
              isClicked={this.state.playerPath.includes(tilePosition.key)}
              gameStatus={this.gameStatus} />
          }
        )}
      </div>
    )
  }
}
