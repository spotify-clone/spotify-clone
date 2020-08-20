import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Carousel from 'react-simply-carousel'

const MyCarousel2 = (props) => {
    const [activeSlide, setActiveSlide] = useState(0)
    let test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    //console.log(props.albums.images[1].url)

     


    const mappedFeatures = props.featuresList.map((element, index) => {
        return <img key={index} src={element.icons[0].url} />
    })


    //  const mapped = props.list.map(element=>{
    //     return <img src={element.images[1].url}/>
    // })

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

                {props.list.map((item, index) => (
                    <div
                        style={{
                            background: 'red',
                            width: 250,
                            height: 250,
                            border: "30px solid white",
                            textAlign: "center",
                            lineHeight: "240px",
                            boxSizing: "border-box"
                        }}
                        key={index}

                    >
                        {mappedFeatures[index]}
                        {index}
                    </div>
                ))}

            </Carousel>
        </div>
    )
}

export default MyCarousel2
