const User = require('../../models').user;
const Credit = require('../../models').credit;
const Debit = require('../../models').debit;
const ExpenseLog = require('../../models').expense_log;
exports.addUser = async(req,res)=>{
    try{

        const { first_name,last_name,email,phone_number } = req.body;
        
        // check if the email exists
        const existing_user = await User.findOne({
            where:{
                email
            }
        });

        if(existing_user){
            return res.status(409).json({
                error:true,
                message:"USER_EXISTS"
            })
        }

        // create a new user body
        const new_user = User.build({
            first_name,
            last_name,
            email,
            phone_number
        });

        //save the new user credentials 
        const saved_user = await new_user.save();

        //create debit card body
        const new_debit_card = Debit.build({
            user_id:saved_user.id,
            number:(Math.random()+' ').substring(2,10)+(Math.random()+' ').substring(2,10),
            cvv:Math.floor(Math.random()*(999-100+1)+100)
        });

        const new_credit_card = Credit.build({
            user_id:saved_user.id,
            number:(Math.random()+' ').substring(2,10)+(Math.random()+' ').substring(2,10),
            cvv:Math.floor(Math.random()*(999-100+1)+100)
        })

        await new_debit_card.save();
        await new_credit_card.save();
        return res.status(201).json({
            error:false,
            message:"USER_CREATED"
        })


    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            message:err.message,
            error:true
        })
    }
}



exports.viewUser = async(req,res)=>{
    try{
        const { email } = req.body;

        const user = await User.findOne({
            where:{
                email
            },
            attributes:{
                exclude:['createdAt','updatedAt']
            },
            include:[
                {
                    model:Credit,
                    attributes:{
                        exclude:['createdAt','updatedAt']
                    }
                },
                {
                    model:Debit,
                    attributes:{
                        exclude:['createdAt','updatedAt']
                    }
                },
                {
                    model:ExpenseLog,
                    attributes:{
                        exclude:['createdAt','updatedAt']
                    }
                }
            ]
        })

        if(!user) return res.status(404).json({
            error:true,
            message:"NOT_FOUND"
        })

        return res.status(200).json({
            error:false,
            message:"USER_DETAILS",
            data:user,
        })

    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            error:true,
            message:err.message
        })
    }
}
