module.exports ={

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

    }




    
}