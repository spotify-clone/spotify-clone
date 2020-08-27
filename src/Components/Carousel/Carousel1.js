import React, { useState } from 'react'
import Carousel from 'react-simply-carousel'

const MyCarousel1 = (props) => {
    const [activeSlide, setActiveSlide] = useState(0)
    
    //console.log(props.albums.images[1].url)
     
  //  console.log(props )
      
    const mappedPlay = props.playlist.map((element,index)=>{
  
   
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

                itemsToShow={10}
                speed={100}
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
                    {mappedPlay[index]} 
                        {/* {index} */}
                    </div>
                ))}

            </Carousel>
        </div>
    )
}

export default MyCarousel1
