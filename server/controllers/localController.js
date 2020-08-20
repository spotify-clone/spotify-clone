module.exports ={
    getTrack: (req,res) =>{
        const db = req.app.get('db')

        db.get_track()
        .then(data => res.status(200).send(data))
        .catch(error => console.log(error))
    },
    createTrack: (req,res) =>{

        const db = req.app.get('db'),
        { name, song  } = req.body;
        // { user_id } = req.params;

        console.log(name, song)

        try{
            db.add_to_playlist({name: name, track: song})
            res.status(200).send('success')
        }

        catch{
            console.log('we have an error')
        }


        // db.add_to_playlist({name: name, track: song, user_id})
        // let result = await db.query("INSERT INTO mp3_tracks(name, track, user_id) VALUES($1, $2, $3) ", [`${name}`, `${song}`, `${user_id}`])

        // res.status(200).send('success')
 

    },
    getTracks: (req, res) => {
        const db = req.app.get('db');

        db.get_tracks()
        .then(track => {
            console.log(track)
            res.status(200).send(track)
        })
        .catch(err => res.status(500).send(err))

    },
    addName: async (req, res) => {
        const db = req.app.get('db'),
        {id} = req.params,
        {name} = req.body;
console.log(id, name)
        const add = await db.add_name(name, id)
console.log(add)
        res.status(200).send(add)
    },
    updatePic: async (req, res) => {
        const db = req.app.get('db'),
        {pic} = req.body,
        {id} = req.params;

        console.log(pic, id)

        const add = await db.update_profile_pic(pic,id)
        console.log(add)
        res.status(200).send(add)


    },
    sendCount: async (req, res) => {
        const db = req.app.get('db'),
        {id} = req.params,
        {count} = req.body;
        
        const counter = db.add_count(count, id)

        res.status(200).send(counter)
    }
}