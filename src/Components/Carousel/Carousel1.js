import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Carousel from 'react-simply-carousel'

const MyCarousel1 = (props) => {
    const [activeSlide, setActiveSlide] = useState(0)
    
    //console.log(props.albums.images[1].url)
     
    console.log(props )
      
    const mappedPlay = props.playlist.map((element,index)=>{
        return <div style={{width: "60vw"}} >
                <img  style={{display: "flex", justifyContent:"center", height: "25vh", width: "25vw"}} key={index} src={element.images[0].url}/>
            </div>
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
                            width: 200,
                            height: 200,
                            border: "30px solid white",
                            textAlign: "center",
                            lineHeight: "240px",
                            boxSizing: "border-box"
                        }}
                        key={index}
                    
                    >
                    {mappedPlay[index]} 
                        {index}
                    </div>
                ))}

            </Carousel>
        </div>
    )
}

export default MyCarousel1
