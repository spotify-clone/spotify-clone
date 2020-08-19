const bcrypt = require('bcryptjs');
module.exports = {
  NewUser: async (req, res)=>{
    // this is what it needs to add a new user
    
    const {password, email } = req.body,
        db = req.app.get('db');
    // //check to see if user exists
    const foundUser = await db.check_user({email});  
    if(foundUser[0]){
        return res.status(400).send(`user already exists`)
    }
    // // Hashing the Password
    let salt = bcrypt.genSaltSync(10),
        hash= bcrypt.hashSync(password, salt);  
    
    // //Creating new user
    const newUser = await db.register_local_user(hash,email)
    // console.log(newUser)
    
    req.session.user = newUser[0]
    res.status(201).send(req.session.user)


},
LoginUser: async (req,res)=>{
  //this is what i need to log in
  const {email, password} = req.body,
      db = req.app.get('db');
  //check to see if user exists
  const foundUser = await db.check_user({email})
  console.log(foundUser[0])
  if(!foundUser[0]){
    return res.status(401).send(`User Not Found`)
  }
  //Compare passwords
  const authenticated = bcrypt.compareSync(password, foundUser[0].password);
  if(!authenticated){
    return res.status(401).send(`User E-mail or password incorrect`)
  }
  
  //Set user on session , send it to client-side
  delete foundUser[0].password;
  req.session.user = foundUser[0]
  res.status(202).send(req.session.user)
  console.log(req.session.user)


},
    logMeIn: async(req,res)=>{
        const db = req.app.get('db')
        
          const me = await db.get_user_id(req.session.account_id)
          console.log(me, "log me in")
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