const Debit = require('../../models').debit;
const Credit = require('../../models').credit;

exports.purchaseItem = async(req,res)=>{

    const {currency,amount,type, card } = req.body;

    const today = new Date();
    const date = JSON.stringify(today).split('T')[0];
    const time = `${date} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}` 

    try{

        switch(type){
            case 'creditcard':

                // fetch the details of the credit card 
                let credit_card_details = await Credit.findOne({
                    where:{
                        number:card.number
                    }
                });

                // verify credentials 
                if(!credit_card_details){
                    return res.status(422).json({
                        error:true,
                        message:"WRONG_CREDENTIALS"
                    })
                }

                if(credit_card_details.cvv != card.cvv || credit_card_details.expiration_month != card.expirationMonth || credit_card_details.expiration_year != card.expirationYear  ){
                    return res.status(422).json({
                        error:true,
                        message:"CARD_DENIED"
                    })

                }

                if(currency != "USD"){
                    return res.status(422).json({
                        error:true,
                        message:"ONLY_USD_ALLOWED"
                    })
                }

                if(amount < 0 ){
                    return res.status(422).json({
                        error:true,
                        message:"AMOUNT_NEGATIVE"
                    })
                }


                if(amount > credit_card_details.monthly_limit){
                    return res.status(422).json({
                        error:true,
                        message:"AMOUNT_LIMIT_CROSSED"
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
                    }
                });

                // verify credentials 
                if(!debit_card_details){
                    return res.status(422).json({
                        error:true,
                        message:"WRONG_CREDENTIALS"
                    })
                }


                if(debit_card_details.cvv != card.cvv || debit_card_details.expiration_month != card.expirationMonth || debit_card_details.expiration_year != card.expirationYear  ){
                    return res.status(422).json({
                        error:true,
                        message:"CARD_DENIED"
                    })

                }

                if(currency != "USD"){
                    return res.status(422).json({
                        error:true,
                        message:"ONLY_USD_ALLOWED"
                    })
                }

                if(amount < 0 ){
                    return res.status(422).json({
                        error:true,
                        message:"AMOUNT_NEGATIVE"
                    })
                }

                
                if(amount > debit_card_details.balance){
                    return res.status(422).json({
                        error:true,
                        message:"AMOUNT_LIMIT_CROSSED"
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
