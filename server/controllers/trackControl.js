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

    getTrack: (req,res) =>{
        const db = req.app.get('db')

        db.get_track()
        .then(data => res.status(200).send(data))
        .catch(error => console.log(error))
    }




    
}