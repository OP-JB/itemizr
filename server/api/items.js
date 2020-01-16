const router = require('express').Router()
const {Item} = require('../db')

// True if the model has a non-autogenerated primary key
const has_actual_primary_key = (model) => {
  const attrs = Object.keys(model.attributes)
  const pk_fields = attrs.filter( (x) => {
    return model.attributes[x].primaryKey && !model.attributes[x]._autoGenerated
  })
  return pk_fields.length > 0
}

// Uses true "upsert" if the model has a primary key, otherwise findOrCreate().
const bulk_upsert = (model, rows) => {
  return Promise.all(rows.map( (row) => {
    if(has_actual_primary_key(model)) {
      return model.upsert(row)
    } else {
      return model.findOrCreate({
        where: row,
        defaults: row
      })
    }
  }))
}

// module.exports = bulk_upsert

router.post('/', (req, res, next) => {
  const items = bulk_upsert(Item, req.body)
  res.json(items)
})

module.exports = router
