const express = require('express');
const router = express.Router();
const Person = require('./../models/Person')
// post route to add person data
router.post('./', async (req,res)=>{
    try {
     const data = req.body // req.body contain the person data and we stored it in data
    
     // creating a new peron with the  above data using mongoose person model;
     const newPerson = new Person(data); // all the data feilds come too newPerson now save it in database
     // save funnction return callback // but now a days we avoid callback and uses async and await
     const response = await newPerson.save();
     console.log('data saved');
     res.status(200).json(response); // in this we direct send the data as if any error comr it itself go to catch block
 
    } catch (error) {
     console.log(err);
     res.status(500).json({error:'internal server error'})
    }
 })

 router.get('./', (req,res)=>{
     try {
         const data = Person.find();
         console.log('data fetched');
         res.status(200).json(data);
     } catch (error) {
         console.log(err);
         res.status(500).json({error:'internal server error'})
     }
 })
 router.get('.//:workType',async(req,res)=>{
     try {
         const workType = req.params.workType // extract the work type from url parameter
         if(workType == 'chef' || workType=='manager' || workType=='waiter'){
               
             const response = await Person.find({work:workType});
             console.log('response fetched');
             res.status(200).json(response);
         }else{
             res.status(404).json({error:'internal work type'})
         }
     } catch (error) {
         console.log(err);
         res.status(500).json({error:'internal server error'})
     }
 })
router.put('/:id',async(req,res)=>{
    try {
        const personId = req.params.id;//extract the id fron url parameter
        const updatedPersonData = req.body; // updataed data for the person

        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new : true, // return the updated document
            runValidators : true,

        })
        if(!response){
            return res.status(404).json({error:'person not found'})
        }
        console.log('data updated');
        res.status(200).json(response);
    } catch (error) {
        console.log(err);
        res.status(500).json({error:'internal server error'});
    }
})
router.delete('./:id',async(req,res)=>{
    try {
        const personId= req.params.id ;
        const response = await Person.findByIdAndDelete(personId);
        if(!response){
            res.status(404).json({error:'person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message:'person deleted successfully'});
    } catch (error) {
        console.log(err);
        res.status(500).json({error:'internal server error'})
    }
})

// comment is added for testing purpose
 module.exports= router;