import React, {useState, useEffect} from 'react'
import {useDropzone} from 'react-dropzone'
import {v4 as randomString} from 'uuid'
import axios from 'axios'
import './dropzone.scss';
import {connect} from 'react-redux'
import Delete from '../Delete/Delete'




const DropZone = (props)=>{
    const upload = {
        isUploading: false
      }
      
  //song is going to be the URL from AWS that we will insert into our Heruku DB
  //files is going to be the state representation of file that we bring in from dropzone
  const [isUploading, setUploading] = useState(upload)
    const [song, setSong] = useState('')
    const [files, setFiles] = useState([]) 
    const [trackName, setTrackName] = useState('') 
    const [name, setName] = useState('')
    const [imgURL, setImgURL] = useState('');
    const [imgFiles, setImgFiles] = useState([])
    const [deleteSong, setDeleteSong] = useState([])


    useEffect(()=>{
      console.log('hit')
      axios.get(`/api/user-tracks/${props.music.user.account_id}`)

      .then((res)=>{
         // console.log(res.data)
          setDeleteSong(res.data)
      })
  },[])

  const deleteSongs = (id) => {
    axios.delete(`/api/user-track/${id}`)
    .then(()=>{
     
    })
 }
    useEffect(()=>{
if (imgURL){
 sendProfilePic()
}
 

    },[imgURL])


useEffect(() =>{

if(song){
  sendFile()
}

}, [song])


// const updateName =() =>{

//     axios.put(`/api/local/${props.music.user.account_id}`, {name})
//     .then(() =>{
//       setName('')

//     })
//     .catch(err=>console.log(err))

// }

const sendProfilePic = ( ) =>{
console.log(imgURL,"hit")
    axios.put(`/api/local2/${props.music.user.account_id}`, {imgURL})
    .then(() => {
     console.log('good')
    })
    .catch(err =>console.log(err))


}

 const sendFile=()=>{

  //  const body = {trackName, song}

  console.log(props.music.user.account_id)
  console.log(trackName, song)

   axios.post(`/api/track/${props.music.user.account_id}`, {name: trackName, track: song} )
   .then(()=>{
      console.log('good')
      // setImgURL('')
      
   })
   .catch(error => console.log(error))
 }

 const getSignedRequest2 = ([imgFiles]) => {
  setUploading(!isUploading)
 // console.log(imgFiles)
  const fileName = `${randomString()}-${imgFiles.name.replace(/\s/g, '-')}`
  //Try to get it from service after you get it working with the axios get from here
  axios.get('/sign-s3', {
    params: {
      'file-name': fileName,
      'file-type': imgFiles.type
    }
  }).then((response) => {
    // setTimeout(function(){alert('Wait 3 seconds then hit complete')}, 7000)
    const { signedRequest, url } = response.data
    uploadFile2(imgFiles, signedRequest, url)
  }).catch(err => {
    console.log(err)
  })
}

    const getSignedRequest = ([files]) => {
        setUploading(!isUploading)
      //  console.log(files)
        const fileName = `${randomString()}-${files.name.replace(/\s/g, '-')}`
        //Try to get it from service after you get it working with the axios get from here
        axios.get('/sign-s3', {
          params: {
            'file-name': fileName,
            'file-type': files.type
          }
        }).then((response) => {
          const { signedRequest, url } = response.data
          uploadFile(files, signedRequest, url)
        }).catch(err => {
          console.log(err)
        })
      }
    
      //This second upload file is so I can set the imageURL and send it ot the database seperately
      const uploadFile2 = (files, signedRequest, url) => {
        // console.log(files)
        // console.log(signedRequest)
        // console.log(url)
        const options = {
          headers: {
            'Content-Type': files.type,
          },
        }
        axios
          .put(signedRequest, files, options)
          .then(() => {
            setUploading({ isUploading: false, url });
            if (url) {
              setImgURL(url)
              alert('sending profile pic to db!!')
            // console.log(imgURL)
              // sendProfilePic() 
            }
          })
          .catch(err => {
            setUploading({
              isUploading: false,
            });
            if (err.response.status === 403) {
              alert(
                `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                err.stack
                }`
              );
            } else {
              alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
          })
      }
      
      const uploadFile = (files, signedRequest, url) => {
        // console.log(files)
        // console.log(signedRequest)
        // console.log(url)
        const options = {
          headers: {
            'Content-Type': files.type,
          },
        }
        axios
          .put(signedRequest, files, options)
          .then(() => {
            setUploading({ isUploading: false, url });
            if (url) {
              setSong(url)
              alert('adding song to db!!')
             // sendFile()
            }
          })
          .catch(err => {
            setUploading({
              isUploading: false,
            });
            if (err.response.status === 403) {
              alert(
                `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
                err.stack
                }`
              );
            } else {
              alert(`ERROR: ${err.status}\n ${err.stack}`);
            }
          })
      }
    

      function MyDropzone2() {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
          accept: "image/*, audio/*",
          onDrop: (acceptedFiles) => {
            setImgFiles(
              acceptedFiles.map((file) => Object.assign(file, {
                preview: URL.createObjectURL(file)
              }))
            )
    
          }
        })
    
        const images = imgFiles.map((file) =>
          <div key={file.name} >
            <div>
              <img src={file.preview} style={{ width: "75px" }} alt="preview" />
            </div>
          </div>
        )
// console.log(props)
        return (
          <div id='photos' >
          
            {images}
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Add Image here</p> :
                  <p>Or select the image</p>
              }
            </div>
          </div>
        )
      }

    
     function MyDropzone() {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
          accept: "image/*, audio/*",
          onDrop: (acceptedFiles) => {
            setFiles(
              acceptedFiles.map((file) => Object.assign(file, {
                preview: URL.createObjectURL(file)
              }))
            )
    
          }
        })
    
        const images = files.map((file) =>
          <div key={file.name} >
            <div>
              <img src={file.preview} style={{ width: "75px" }} alt="preview" />
            </div>
          </div>
        )
        // console.log(props)
        return (
          <div id='photos' >
            
            {images}
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Enter image here</p> :
                  <p>or click to drop files</p>
              }
            </div>
          </div>
        )
      }
//      console.log(props.music.user.account_id)
// console.log(imgURL)
//    console.log(props)
//  console.log(name)
return(
  <div className="main-div">
    <div className='dropbox-container'>
      <h2>Profile Access</h2>
    <div className='name-box'>
      <h6>Update Name</h6>

    <input className='name'
     type="text"
      placeholder="Add Name" 
       onChange={(e) => setName(e.target.value)} /> 

    <button className='btns' onClick={name.length?() => props.updateName(name):null}>Add It</button>
    </div>
        <div className='add-photo'>
            <p>Add image then click send</p>
              {MyDropzone2()}
                <input  value={imgURL} onChange={(e) => setImgURL(e.target.value)} type="text" placeholder="Drop Image"/>
                {/* <button className='btns' onClick={sendProfilePic}>Send to db</button> */}
              <button className='btns'onClick={imgFiles.length?() => getSignedRequest2(imgFiles):null} >Send </button>
        </div>
        <div className='add-music'>
           <p>Add mp3 then click send </p>
              {MyDropzone()}
                <input value={trackName} onChange={(e) => setTrackName(e.target.value)} type="text" placeholder="Enter Track Title"/>
                {/* <button className='btns' onClick={sendFile}>Send to db</button> */}
              <button className='btns' onClick={files.length?() => getSignedRequest(files):null} >Send </button>
        </div>
        </div>
        <Delete 
          deleteSong={deleteSong}
        />
      </div>        
    )
}

 

const mapStateToProps = state => {
  return{
      music: state.music,
      user: state.user
  }
}

export default connect(mapStateToProps)(DropZone)