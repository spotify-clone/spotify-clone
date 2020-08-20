import React, {useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {v4 as randomString} from 'uuid'
import axios from 'axios'
import './dropzone.scss';
import {connect} from 'react-redux'




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



const updateName =() =>{

    axios.put(`/api/local/${props.user.account_id}`, name)
    .then(() =>{
      setName('')
    })
    .catch(err=>console.log(err))

}

const sendProfilePic = () =>{

    axios.put(`/api/local2/${props.user.account_id}`, imgURL)
    .then(() => {
     
    })
    .catch(err =>console.log(err))


}

 const sendFile=()=>{

  //  const body = {trackName, song}

  console.log(props.user.account_id)

   axios.put(`/api/track/${props.user.account_id}`, {name: trackName, song} )
   .then(()=>{
      console.log('good')
      setImgURL('')
      
   })
   .catch(error => console.log(error))
 }

 const getSignedRequest2 = ([imgFiles]) => {
  setUploading(!isUploading)
  console.log(imgFiles)
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
        console.log(files)
        const fileName = `${randomString()}-${files.name.replace(/\s/g, '-')}`
        //Try to get it from service after you get it working with the axios get from here
        axios.get('/sign-s3', {
          params: {
            'file-name': fileName,
            'file-type': files.type
          }
        }).then((response) => {
          // setTimeout(function(){alert('Wait 3 seconds then hit complete')}, 7000)
          const { signedRequest, url } = response.data
          uploadFile(files, signedRequest, url)
        }).catch(err => {
          console.log(err)
        })
      }
    
      //This second upload file is so I can set the imageURL and send it ot the database seperately
      const uploadFile2 = (files, signedRequest, url) => {
    
        const options = {
          headers: {
            'Content-Type': files.type,
          },
        }
        axios
          .put(signedRequest, files, options)
          .then(() => {
            setUploading({ isUploading: false, url });
            setImgURL(url)
            if (url) {
              alert('ready!!')
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
    
        const options = {
          headers: {
            'Content-Type': files.type,
          },
        }
        axios
          .put(signedRequest, files, options)
          .then(() => {
            setUploading({ isUploading: false, url });
            setSong(url)
            if (url) {
              alert('ready!!')
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
       // console.log(files)
        return (
          <div id='photos' >
            <h1>UPLOAD</h1>
            {images}
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drag 'n' drop, or click to select files</p>
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
       // console.log(files)
        return (
          <div id='photos' >
            <h1>UPLOAD</h1>
            {images}
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drag 'n' drop, or click to select files</p>
              }
            </div>
          </div>
        )
      }
//     console.log(files)
// console.log(imgURL)
//  console.log(props)
// console.log(song)
return(
  <div>
    <div className='dropbox-container'>
    <div className='name-box'>
    <input className='name' type="text" placeholder="Add Name"></input>
    </div>
        <div className='add-photo'>
            <p>Add image then click send</p>
              {MyDropzone2()}
                <input value={imgURL} onChange={(e) => setImgURL(e.target.value)} type="text" placeholder="Drop Image"/>
                <button className='btns' onClick={sendProfilePic}>Send to db</button>
              <button className='btns'onClick={() => getSignedRequest2(files)} >Send </button>
        </div>
        <div className='add-music'>
           <p>Add mp3 then click send </p>
              {MyDropzone()}
                <input value={trackName} onChange={(e) => setTrackName(e.target.value)} type="text" placeholder="Drop Music"/>
                <button className='btns' onClick={sendFile}>Send to db</button>
              <button className='btns' onClick={() => getSignedRequest(files)} >Send </button>
        </div>
        </div>
      </div>        
    )
}

const mapStateToProps = redux => redux;

export default connect(mapStateToProps)(DropZone)