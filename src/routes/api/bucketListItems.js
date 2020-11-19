const { Router } = require('express');
const BucketListItem = require('../../models/BucketListItem')

const router = Router();

router.get('/', async (req, res) => {
  try {
    const bucketListItems = await BucketListItem.find();
    if(!bucketListItems || !bucketListItems.length){
      return res.status(200).send([]);
    }

    const sorted = bucketListItems.sort( (a, b) => (new Date(a.date).getTime() - new Date(b.date).getTime()))
    res.status(200).send(sorted);
  }catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

router.post('/', async (req, res) => {
  try {
    const bucketListItem = await new BucketListItem(req.body).save();
    if( !bucketListItem ){
      throw "Not saved bucketListItem"
    }

    res.status(200).send(bucketListItem);
  }catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  try {

    const bucketListItem = new BucketListItem.findByIdAndUpdate(id, req.body);
    if( !bucketListItem ){
      throw "Not updated bucketListItem"
    }
    const updated = { ...bucketListItem._doc, ...req.body }

    res.status(200).send(updated);
  }catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {

    const bucketListItem = await BucketListItem.findByIdAndDelete(id);
    if( !bucketListItem ){
      throw "Not deleted bucketListItem"
    }

    res.status(200).send(bucketListItem);
  }catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

module.exports = router
