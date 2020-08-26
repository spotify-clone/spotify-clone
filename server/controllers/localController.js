module.exports ={
    getTrack: async (req,res) =>{
        const db = req.app.get('db'),

        {id} = req.params;

        const result = await db.get_track(id)
        
       // const count = await db.add_count(id)
        
        res.status(200).send(result)
 


    },
    createTrack: (req,res) =>{

        const db = req.app.get('db'),
        { name, track  } = req.body,
         user_id  = req.params.id;

        // console.log(name, track, user_id)

        try{
            db.add_to_playlist({name: name, track, user_id})
            res.status(200).send('success')
        }

        catch{
            console.log('we have an error')
        }


        // db.add_to_playlist({name: name, track: song, user_id})
        // let result = await db.query("INSERT INTO mp3_tracks(name, track, user_id) VALUES($1, $2, $3) ", [`${name}`, `${song}`, `${user_id}`])

        // res.status(200).send('success')
 

    },
   getTracks: async (req, res) =>{
       const db = req.app.get('db'),
       {user_id} = req.params;
       const result = await db.get_tracks(user_id)
      //  const add = await db.add_count(id)
       res.status(200).send(result)
   },
    // getTracks: (req, res) => {
    //     const db = req.app.get('db');
     

    //     db.get_tracks()
    //     .then(track => {
    //         // console.log(track)
    //         res.status(200).send(track)
    //     })
        
    //     .catch(err => res.status(500).send(err))

    // },
    addName: async (req, res) => {
        const db = req.app.get('db'),
        {id} = req.params,
        {name} = req.body;
    // console.log(id, name)
        const add = await db.add_name(name, id)
    // console.log(add)
        res.status(200).send(add)
    },
    updatePic: async (req, res) => {
        const db = req.app.get('db'),
        { imgURL } = req.body,
        // {imgURL} = req.body,
        {id} = req.params;
    
//console.log(req.body)
        // console.log(pic, id)

        const add = await db.update_profile_pic({imgURL, id})
        res.status(200).send(add)


    },
    sendCount: async (req, res) => {
        const db = req.app.get('db'),
        {id} = req.params,
        {count} = req.body;
        
        const counter = db.add_count(count, id)

        res.status(200).send(counter)
    },

    getUsersTrack: async(req,res)=>{
        const db = req.app.get('db'),
        { id: user_id } = req.params;
 
        const result = await db.get_users_track(user_id)
     //   const count = await db.add_count(id)

//console.log(result)
        res.status(200).send(result)
    }
   
}