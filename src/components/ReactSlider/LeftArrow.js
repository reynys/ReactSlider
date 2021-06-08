/**
 * @name ReactSlider
 * @author Reinis Makulis <reinis.makulis@gmail.com>
 * @license GPL-3.0
 */

import React from 'react'
import './Slider.style.scss'

function LeftArrow(props) {
  let display = {}

  if (!props.showArrow) {
    display = { visibility: 'hidden' }
  } else {
    display = { visibility: 'visible' }
  }

  return (
    <span
      className="Slider-Arrow Slider-Arrow_left"
      onClick={props.onClick}
      style={display}
    />
  )
}

export default LeftArrow
