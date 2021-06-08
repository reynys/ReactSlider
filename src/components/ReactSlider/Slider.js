/**
 * @name ReactSlider
 * @author Reinis Makulis <reinis.makulis@gmail.com>
 * @license GPL-3.0
 */

import React, { PureComponent } from 'react'
import SlideIndicator from './SlideIndicator'
import LeftArrow from './LeftArrow'
import RightArrow from './RightArrow'
import './Slider.style.scss'

class Slider extends PureComponent {
    constructor(props) {
        super(props);

        this.touchMovement = 0;
        this.isDragging = false;
        this.previousLeft = 0;

        this.state = {
            activeItem: 0,
            sliderWidth: null,
            showSlides: this.props.showSlides,
            infinityMode: this.props.infinityMode,
            showLeftArrow: true,
            showRightArrow: true,
        };

        this.sliderWrapper = React.createRef();
    }

    componentDidMount() {
        const slideCount = React.Children.count(this.props.children);

        this.setState({
            sliderWidth: this.sliderWrapper.current.offsetWidth
        });

        if (!this.state.showSlides) {
            this.setState({
                showSlides: slideCount
            });
        }
    }

    componentDidUpdate() {
        if (!this.state.infinityMode) {
            if (this.state.activeItem === 0 & this.state.showLeftArrow) {
                this.setState({showLeftArrow: false});
            } else if (this.state.activeItem != 0 & !this.state.showLeftArrow) {
                this.setState({showLeftArrow: true});
            }

            if (this.state.activeItem === this.state.showSlides -1 & this.state.showRightArrow) {
                this.setState({showRightArrow: false});
            } else if (this.state.activeItem < this.state.showSlides -1 & !this.state.showRightArrow) {
                this.setState({showRightArrow: true});
            }
        }
    }

    toSlide = index => {
        this.setState({activeItem: index});
    }

    toPrevSlide = e => {
        e.preventDefault();

        let slideIndex = this.state.activeItem;

        if (!this.state.infinityMode | this.state.infinityMode == false && slideIndex == 0) {
            this.setState({ activeItem: slideIndex });
        } else {
            if (slideIndex < 1) {
                this.setState({ activeItem: this.state.showSlides - 1});
            } else {
                slideIndex--
                this.setState({ activeItem: slideIndex });
            }
        }
    }

    toNextSlide = e => {
        e.preventDefault();

        let slideIndex = this.state.activeItem;
        
        if (!this.state.infinityMode | this.state.infinityMode == false && slideIndex === this.state.showSlides -1) {
            this.setState({ activeItem: slideIndex });
        } else {
            if (slideIndex === this.state.showSlides - 1) {
                this.setState({ activeItem: 0 });
            } else {
                slideIndex++
                this.setState({ activeItem: slideIndex});
            }
        }
    }

    onDown = e => {
        this.isDragging = true;
        e.target.setPointerCapture(e.pointerId);
        this.previousLeft = e.pageX;
    }

    onUp = e => {
        this.isDragging = false  ;      
        if (Math.sign(this.touchMovement) === 1) this.toPrevSlide(e);
        else if (Math.sign(this.touchMovement) === -1) this.toNextSlide(e);
        this.touchMovement = 0;
    }

    onSwipe = e => {
        if (!this.isDragging) { return }

        if (e.pageX > this.previousLeft) {
            this.touchMovement += e.pageX - this.previousLeft;
        } else if (e.pageX < this.previousLeft) {
            this.touchMovement -= this.previousLeft - e.pageX;
        }

        this.previousLeft = e.pageX;
    }

    render() {
        const width = {
            width: this.state.sliderWidth,
            maxWidth: this.state.sliderWidth
        };

        const sliderTransitionStyling = {
            width: (this.state.showSlides * this.state.sliderWidth) + "px",
            left: (this.state.activeItem * this.state.sliderWidth * -1) + "px"
        };

        return (
            <div className="Slider-Wrapper" ref={ this.sliderWrapper } style={ width }>
                <div
                  className="Slider-Content"
                  onPointerDown={this.onDown }
                  onPointerMove={ this.onSwipe }
                  onPointerUp={ this.onUp }
                  onPointerCancel={ this.onUp }
                >
                    <div className="Slider-Slides" style={ sliderTransitionStyling } >
                        {this.props.children.slice(0, this.state.showSlides).map((slide) =>
                            React.cloneElement(slide, { className: 'SliderItem-Wrapper', style: width })
                        )}
                    </div>
                </div>
                <div className="Slider-Controls">
                    <LeftArrow onClick={ e=>this.toPrevSlide(e) } showArrow={ this.state.showLeftArrow }/>
                    <ul className="Slide-Indicators">
                        {this.props.children.slice(0, this.state.showSlides).map((item, index) =>
                            <SlideIndicator
                                key={ index }
                                isActive={ this.state.activeItem===index }
                                onClick={ e=>this.toSlide(index) }
                            />
                        )}
                    </ul>
                    <RightArrow onClick={ e=>this.toNextSlide(e) } showArrow={ this.state.showRightArrow }/>
                </div>
            </div>
        )
    }
}

export default Slider
