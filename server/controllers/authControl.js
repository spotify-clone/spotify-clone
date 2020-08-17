module.exports = {
    logMeIn: async(req,res)=>{
        const db = req.app.get('db')
          const me = await db.get_user_id(req.session.account_id)
          res.status(200).send(me[0]) 
        
    },
    logOut: (req, res)=>{
        req.session.destroy()
        res.sendStatus(200)
    },
    saveLocalUser: async(req,res) =>{
        const db = req.app.get('db')
        const  username  = req.params.user 
        console.log(req.params)
        
        const result = await db.register_user({username}) 
        res.status(200).send(result)
        
    }

}