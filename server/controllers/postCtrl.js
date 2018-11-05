const newPost = (req, res) => {
  console.log('req.body', req.body)
  const { userId, postSubject, postBody } = req.body
  const db = req.app.get('db')
  db.posts.newPost([userId, postSubject, postBody]).then(response => {
    console.log('response', response)
  })
  return res.status(200).send('okie dokie')
}

const newImagePost = async (req, res) => {
  console.log('req.body', req.body)
  const { userId, postSubject, imageCaption, imageURL, postId } = req.body
  const db = req.app.get('db')
  const post = await db.posts.newPostForImage([userId, postSubject])
  console.log('POST', post)
  db.posts.newImagePost([imageCaption, imageURL, postId])
  return res.status(200).send('okie dokie')
}

module.exports = {
  newPost,
  newImagePost,
}

// const addItem = async (req, res) => {
//   // console.log('req.body', req.body)
//   const { itemName, itemDescription, imageUrls, userId } = req.body
//   const db = req.app.get('db')
//   const item = await db.items.addItem([itemName, itemDescription, userId])
//   // console.log('item', item)
//   // console.log('item[0].items_id, imageUrls', item[0].items_id, imageUrls)

//   imageUrls.forEach(async url => {
//     await db.items.addImage(item[0].items_id, url)
//   })
//   return res.status(200).send('okie dokie')
// }
