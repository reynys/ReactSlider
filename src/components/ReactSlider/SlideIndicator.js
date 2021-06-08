/**
 * @name ReactSlider
 * @author Reinis Makulis <reinis.makulis@gmail.com>
 * @license GPL-3.0
 */

import React from 'react'
import './Slider.style.scss'

function SlideIndicator(props) {
  let className;

  if (props.isActive) {
    className = "Slide-Indicator Slide-Indicator_isActive"
  } else {
    className = "Slide-Indicator"
  }

  return (
    <li className={ className } onClick={ props.onClick }/>
  )
}

export default SlideIndicator
