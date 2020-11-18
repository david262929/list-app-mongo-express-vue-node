const { Router } = require('express');
const BucketListItem = require('../../models/BucketListItem')

const router = Router();

router.get('/', async (req, res) => {
  try {
    const bucketListItems = await BucketListItem.find();
    if(!bucketListItems || !bucketListItems.length){
      throw "No bucketListItems"
    }

    const sorted = bucketListItems.sort( (a, b) => (new Date(a.date).getTime() - new Date(b.date).getTime()))
    res.status(200).send(sorted);
  }catch (error) {
    console.log(error)
    res.status(500).send()
  }
})

module.exports = router
