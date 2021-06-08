/**
 * @name ReactSlider
 * @author Reinis Makulis <reinis.makulis@gmail.com>
 * @license GPL-3.0
 */

import React, { PureComponent } from 'react'
import ReactSlider from './ReactSlider/Slider'
import Jungle from '../assets/images/jungle.jpg'
import City from '../assets/images/city.jpg'
import Ocean from '../assets/images/ocean.jpg'
import './App.style.scss'

class App extends PureComponent {
    render() {
        return (
            <div className="App">
                <ReactSlider infinityMode={ true } showSlides={ 4 }>
                    <div key="0">
                        <div className="slide-content-example">
                            <h2>Hello World</h2>
                            <br/>
                            <p>This is a random paragraph text</p>
                            <br/><br/>
                            <button>Click me</button>
                        </div>
                    </div>
                    <div key="1">
                        <img src={ Jungle } />
                    </div>
                    <div key="2">
                        <div className="slide-content-example2">
                            <h4>Lorem Ipsum</h4>
                            <br/>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                            <br/><br/>
                            <strong><p>Lorem ipsum dolor sit amet!</p></strong>
                        </div>
                    </div>
                    <div key="3">
                        <img src={ City } />
                    </div>
                    <div key="4">
                        <img src={ Ocean } />
                    </div>
                </ReactSlider>
            </div>
        )
    }
}

export default App
