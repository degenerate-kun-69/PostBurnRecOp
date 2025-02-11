import {Router} from "express";
const UserRouter=Router();
UserRouter.get('/users',(req,res)=>{        //Get /users ->Get All Users
res.send({title:"Get all Users"})
}) 

//GET /USERS/:ID->ID OF USERS

UserRouter.get('/:id',(req,res)=>{
    res.send({title:"Get Users Details",})
    })



    
    UserRouter.post('/',(req,res)=>{
        res.send({title:"Create new  User"})
        })
        UserRouter.put('/:id',(req,res)=>{
            res.send({title:"Update User"})
            })
            UserRouter.delete('/:id',(req,res)=>{
                res.send({title:"Delete User"})
                })

                 export default UserRouter;