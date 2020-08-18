module.exports ={
    getTrack: (req,res) =>{
        const db = req.app.get('db')

        db.get_track()
        .then(data => res.status(200).send(data))
        .catch(error => console.log(error))
    }
}