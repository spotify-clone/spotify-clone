import React, { useState } from 'react'
import Carousel from 'react-simply-carousel'

const MyCarousel2 = (props) => {
    const [activeSlide, setActiveSlide] = useState(0)
    let test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    //console.log(props.albums.images[1].url)

     


    const mappedFeatures = props.featuresList.map((element, index) => {
        return <img style={{display: "flex", justifyContent:"center", height: "150px", width: "150px"}} key={index} src={element.icons[0].url} alt='hot album covers' />
    })


    

    return (
        <div>
            <Carousel
                containerProps={{
                    style: {
                        width: '100%',
                        justifyContent: 'space-evenly'
                    }
                }}
                activeSlideIndex={activeSlide}
                activeSlideProps={{
                    style: {
                        background: ''
                    }
                }}
                onRequestChange={setActiveSlide}
                forwardBtnProps={{
                    children: '>',
                    style: {
                        width: 30,
                        height: 30,
                        minWidth: 30,
                        alignSelf: 'center',
                        background: 'black',
                        color: "white"
                    }
                }}
                backwardBtnProps={{
                    children: '<',
                    style: {
                        width: 30,
                        height: 30,
                        minWidth: 30,
                        alignSelf: 'center',
                        background: 'black',
                        color: "white"

                    }
                }}

                itemsToShow={6}
                speed={400}
            >

                {props.list.map((item, index) => (
                    <div
                        style={{
                            width: 160,
                            height: 150,
                            textAlign: "center",
                            boxSizing: "border-box"
                        }}
                        key={index}

                    >
                        {mappedFeatures[index]}
                        {/* {index} */}
                    </div>
                ))}

            </Carousel>
        </div>
    )
}

export default MyCarousel2
