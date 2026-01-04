import express from 'express'
// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcrypt'
import ecommerceModel from '../models/ecommerceModel.mjs'
import authorize from '../middleware/newAuth.mjs'

const router = express.Router()

router.post('/catalog', authorize(['admin']), async(req,res)=>{
    const {name,category,price,stockQuantity,description} = req.body
    try{
        const newItem = new ecommerceModel({name,category,price,stockQuantity,description})
        await newItem.save()
        if(!newItem)
            return res.status(404).json({message:'Unable to add item'})
        res.status(201).json({message:'Item added sucessfully', item:newItem})
    }
    catch(error)
    {
        res.status(500).json({message:'Internal server error'})
    }
})

router.get('/:category', async (req, res) => {
  try {
    const items = await ecommerceModel.find({category:req.params.category})

    if (items.length === 0) {
      return res.status(404).json({ message: 'No products found' })
    }

    res.status(200).json({
      message: 'Products retrieved successfully',
      items
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.get('/', async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query

    let filter = {}

    // filter by category
    if (category) {
      filter.category = category
    }

    // filter by price range
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    const items = await ecommerceModel.find(filter)

    if (items.length === 0) {
      return res.status(404).json({ message: 'No products found' })
    }

    res.status(200).json({
      message: 'Products retrieved successfully',
      items
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})


router.get('/price/:price', async (req, res) => {
  try {
    const items = await ecommerceModel.find({price:req.params.price})

    if (items.length === 0) {
      return res.status(404).json({ message: 'No products found' })
    }

    res.status(200).json({
      message: 'Products retrieved successfully',
      items
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
})


router.get('/:id',async(req,res)=>{
    try{
        const item = await ecommerceModel.findById(req.params.id)
        if(!item)
            res.status(404).json({message:'Unable to get item'})
        res.status(200).json({message:'item retrieved sucessfully', item:item})
    }
    catch(error){
        res.status(500).json({message:'Internal server error'})
    }
})

router.put('/:id',async(req,res)=>{
    try{
        const item = await ecommerceModel.findByIdAndUpdate(req.params.id, req.body, {new:true})
        if(!item)
            res.status(404).json({message:'Unable to update item'})
        res.status(200).json({message:'item updated sucessfully', item:item})
    }
    catch(error){
        res.status(500).json({message:'Internal server error'})
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const item = await ecommerceModel.findByIdAndDelete(req.params.id)
        if(!item)
            res.status(404).json({message:'Unable to delete item'})
        res.status(200).json({message:'item deleted sucessfully', item:item})
    }
    catch(error){
        res.status(500).json({message:'Internal server error'})
    }
})

export default router