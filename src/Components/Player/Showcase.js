import React from 'react'



export default function Showcase(props) {
    let track;

    let sound = new Audio(track)

    const start = (value) => {
        track = value
        sound.play()
    }

    const mappedTracks = props.covers.map((element,index)=>{
        let image;
        let audio;

        if(element.preview_url !==null){
            image = element.album.images[1].url
            audio = element.preview_url
        }

        return <div key={index}>
                {index === props.id 
                ?
                <div>
                    <img src={image} alt="" onClick={start(audio)}/>
                </div>
                :
                null}
            </div>

    })



    return (
        <div >
            <div>
                {mappedTracks}
            </div>
            <audio>
                
            </audio>
        </div>
    )
}
