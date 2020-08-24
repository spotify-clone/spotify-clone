import React, { useState } from 'react'
import Carousel from 'react-simply-carousel'

const MyCarousel = (props) => {
    const [activeSlide, setActiveSlide] = useState(0)
    //console.log(props.albums.images[1].url)
     
   
      
 
   
 
 const mapped = props.list.map(element=>{
    return <img style={{display: "flex", justifyContent:"center", height: "150px", width: "150px"}} src={element.images[0].url} alt='Hot Album Covers'/>
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
                    {mapped[index]}
                        {/* {index} */}
                    </div>
                ))}

            </Carousel>
        </div>
    )
}

export default MyCarousel;
