import React, {useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {v4 as randomString} from 'uuid'
import axios from 'axios'




const DropZone = ()=>{
    const upload = {
        isUploading: false
      }
      
  //song is going to be the URL from AWS that we will insert into our Heruku DB
  //files is going to be the state representation of file that we bring in from dropzone
  const [isUploading, setUploading] = useState(upload)
    const [song, setSong] = useState('')
    const [files, setFiles] = useState([])  

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
    
    
      function MyDropzone() {
        const { getRootProps, getInputProps, isDragActive } = useDropzone({
          accept: "image/*",
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
              <img src={file.preview} style={{ width: "150px" }} alt="preview" />
            </div>
          </div>
        )
        console.log(files)
        return (
          <div id='photos' >
            <h1>Upload</h1>
            {images}
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drag 'n' drop some files here, or click to select files</p>
              }
            </div>
          </div>
        )
      }
    

 
console.log(song)
return(
        <div>
        <p>Add a image or mp3 and then click send to send it to aws </p>
{MyDropzone()}
 <button onClick={() => getSignedRequest(files)} >Send </button>
        </div>
    )
}
export default DropZone