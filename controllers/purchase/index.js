const User = require('../../models').user;
const Debit = require('../../models').debit;
const Credit = require('../../models').credit;
const ExpenseLog = require('../../models').expense_log;

exports.purchaseItem = async(req,res)=>{

    const {currency,amount,type, card } = req.body;

    const today = new Date();
    const date = JSON.stringify(today).split('T')[0];
    const time = `${date} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    try{

        switch(type){
            case 'creditcard':

                // fetch the details of the credit card 
                let credit_card_details = await Credit.findOne({
                    where:{
                        number:card.number
                    },
                    include:[
                        {
                            model:User,
                            attributes:['id']
                        }
                    ]
                });

                // verify credentials 
                if(!credit_card_details){
                    return res.status(422).json({
                        error:true,
                        message:"WRONG_CREDENTIALS"
                    })
                }

                const credit_expense = ExpenseLog.build({
                    user_id:credit_card_details.user.id,
                    card_type:type,
                    card_number : card.number,
                    currency,
                    amount,
                    auth_code: "SDSD23232333",
                    status:""
                });
            
                if(credit_card_details.cvv != card.cvv || credit_card_details.expiration_month != card.expirationMonth || credit_card_details.expiration_year != card.expirationYear  ){

                    credit_expense.status = "fail";
                    credit_expense.save();
    
                    return res.status(422).json({
                        amount,
                        currency,
                        type,
                        card: {
                            number:card.number
                        },
                        status: "fail",
                        authorization_code: "SDSD23232333",
                        time
                    })

                }

                if(currency != "USD"){

                    credit_expense.status = "fail";
                    credit_expense.save();

                    return res.status(422).json({
                        amount,
                        currency,
                        type,
                        card: {
                            number:card.number
                        },
                        status: "fail",
                        authorization_code: "SDSD23232333",
                        time
                    })
                }

                if(amount < 0 ){

                    credit_expense.status = "fail";
                    credit_expense.save();

                    return res.status(422).json({
                        amount,
                        currency,
                        type,
                        card: {
                            number:card.number
                        },
                        status: "fail",
                        authorization_code: "SDSD23232333",
                        time
                    })
                }


                if(amount > credit_card_details.monthly_limit){
                    return res.status(422).json({
                        amount,
                        currency,
                        type,
                        card: {
                            number:card.number
                        },
                        status: "fail",
                        authorization_code: "SDSD23232333",
                        time
                    })
                }

                const expenditure = credit_card_details.expenditure + parseFloat(amount);
                
                const month_limit = credit_card_details.month_limit - parseFloat(amount);

                await Credit.update({
                    expenditure,
                    month_limit
                },{
                    where:{
                        number:card.number
                    }
                })

                credit_expense.status = "success";
                credit_expense.save();

                return res.status(200).json({
                    amount,
                    currency,
                    type,
                    card: {
                        number:card.number
                    },
                    status: "success",
                    authorization_code: "SDSD23232333",
                    time
                })

            case 'debitcard':

                // fetch the details of the debit card 
                let debit_card_details = await Debit.findOne({
                    where:{
                        number:card.number
                    },
                    include:[
                        {
                            model:User,
                            attributes:['id']
                        }
                    ]
                });

                // verify credentials 
                if(!debit_card_details){
                    return res.status(422).json({
                        error:true,
                        message:"WRONG_CREDENTIALS"
                    })
                }

                const debit_expense = ExpenseLog.build({
                    user_id:debit_card_details.user.id,
                    card_type:type,
                    card_number : card.number,
                    currency,
                    amount,
                    auth_code: "SDSD23232333",
                    status:""
                })


                if(debit_card_details.cvv != card.cvv || debit_card_details.expiration_month != card.expirationMonth || debit_card_details.expiration_year != card.expirationYear  ){

                    debit_expense.status = "fail";
                    debit_expense.save();
    
                    return res.status(422).json({
                        amount,
                        currency,
                        type,
                        card: {
                            number:card.number
                        },
                        status: "fail",
                        authorization_code: "SDSD23232333",
                        time
                    })

                }

                if(currency != "USD"){

                    debit_expense.status = "fail";
                    debit_expense.save();

                    return res.status(422).json({
                        amount,
                        currency,
                        type,
                        card: {
                            number:card.number
                        },
                        status: "fail",
                        authorization_code: "SDSD23232333",
                        time
                    })
                }

                if(amount < 0 ){

                    debit_expense.status = "fail";
                    debit_expense.save();
    
                    return res.status(422).json({
                        amount,
                        currency,
                        type,
                        card: {
                            number:card.number
                        },
                        status: "fail",
                        authorization_code: "SDSD23232333",
                        time
                    })
                }

                
                if(amount > debit_card_details.balance){

                    debit_expense.status = "fail";
                    debit_expense.save();
    
                    return res.status(422).json({
                        amount,
                        currency,
                        type,
                        card: {
                            number:card.number
                        },
                        status: "fail",
                        authorization_code: "SDSD23232333",
                        time
                    })
                }

                const balance = debit_card_details.balance - parseFloat(amount);
                await Debit.update({
                    balance
                },{
                    where:{
                        number:card.number
                    }
                })

                debit_expense.status = "success";
                debit_expense.save();

                return res.status(200).json({
                    amount,
                    currency,
                    type,
                    card: {
                        number:card.number
                    },
                    status: "success",
                    authorization_code: "SDSD23232333",
                    time
                })
        }

    }catch(err){
        console.log(err.message);
        return res.status(500).json({
            error:true,
            message:err.message
        })
    }
}
