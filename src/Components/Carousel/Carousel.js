import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Carousel from 'react-simply-carousel'

const MyCarousel = (props) => {
    const [activeSlide, setActiveSlide] = useState(0)
    let test = [1,2,3,4,5,6,7,8,9,10]
    console.log(props.albums.images)

 

    return (
        <div>
            <Carousel
                containerProps={{
                    style: {
                        width: '100%',
                        justifyContent: 'space-between'
                    }
                }}
                activeSlideIndex={activeSlide}
                activeSlideProps={{
                    style: {
                        background: 'blue'
                    }
                }}
                onRequestChange={setActiveSlide}
                forwardBtnProps={{
                    children: '>',
                    style: {
                        width: 30,
                        height: 30,
                        minWidth: 30,
                        alignSelf: 'center'
                    }
                }}
                backwardBtnProps={{
                    children: '<',
                    style: {
                        width: 30,
                        height: 30,
                        minWidth: 30,
                        alignSelf: 'center'

                    }
                }}

                itemsToShow={7}
                speed={400}
            >
                {test.map((item, index) => (
                    <div
                        style={{
                            background: "red",
                            width: 150,
                            height: 150,
                            border: "30px solid white",
                            textAlign: "center",
                            lineHeight: "240px",
                            boxSizing: "border-box"
                        }}
                        key={index}
                    >
                        {index}
                    </div>
                ))}

            </Carousel>
        </div>
    )
}

export default MyCarousel
