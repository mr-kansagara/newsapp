import React, { Component } from 'react'
import loading from './loading3.gif'


export class LoadingCircle extends Component {
  render() {
    return (
      <div className='text-center'>
        <img id="loading" src={loading} alt="loading Circle"/>
      </div>
    )
  }
}

export default LoadingCircle
