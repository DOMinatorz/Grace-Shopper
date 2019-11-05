'use strict'

const db = require('../server/db')
const {User, Bracelet} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'cody',
      lastName: 'thePug',
      email: 'cody@email.com',
      address: '123 main st',
      password: '123'
    }),
    User.create({
      firstName: 'murphy',
      lastName: 'theNotPug',
      email: 'murphy@email.com',
      password: '123'
    })
  ])

  const bracelets = await Promise.all([
    Bracelet.create({
      style: 'solitary',
      material: 'leather',
      color: 'black',
      qty: 100,
      price: 100.0,
      image:
        'https://images.selfridges.com/is/image/selfridges/852-10134-B6035500_M?$PDP_M_ZOOM$'
    }),
    Bracelet.create({
      style: 'solitary',
      material: 'suede',
      color: 'teal',
      qty: 100,
      price: 100.0,
      image:
        'https://images.selfridges.com/is/image/selfridges/852-10134-B6035500_M?$PDP_M_ZOOM$'
    }),
    Bracelet.create({
      style: 'solitary',
      material: 'leather',
      color: 'tan',
      qty: 100,
      price: 100.0,
      image:
        'https://images.selfridges.com/is/image/selfridges/852-10134-B6035500_M?$PDP_M_ZOOM$'
    }),
    Bracelet.create({
      style: 'solitary',
      material: 'leather',
      color: 'tan',
      qty: 100,
      price: 100.0,
      image:
        'https://images.selfridges.com/is/image/selfridges/852-10134-B6035500_M?$PDP_M_ZOOM$'
    }),
    Bracelet.create({
      style: 'solitary',
      material: 'leather',
      color: 'tan',
      qty: 100,
      price: 100.0,
      image:
        'https://images.selfridges.com/is/image/selfridges/852-10134-B6035500_M?$PDP_M_ZOOM$'
    }),
    Bracelet.create({
      style: 'solitary',
      material: 'leather',
      color: 'tan',
      qty: 100,
      price: 100.0,
      image:
        'https://images.selfridges.com/is/image/selfridges/852-10134-B6035500_M?$PDP_M_ZOOM$'
    }),
    Bracelet.create({
      style: 'double',
      material: 'leather',
      color: 'black',
      qty: 100,
      price: 200.0,
      image:
        'https://images.selfridges.com/is/image/selfridges/852-10134-B6035500_M?$PDP_M_ZOOM$'
    }),
    Bracelet.create({
      style: 'double',
      material: 'suede',
      color: 'teal',
      qty: 100,
      price: 200.0,
      image:
        'https://images.selfridges.com/is/image/selfridges/852-10134-B6035500_M?$PDP_M_ZOOM$'
    }),
    Bracelet.create({
      style: 'double',
      material: 'leather',
      color: 'tan',
      qty: 100,
      price: 200.0,
      image:
        'https://images.selfridges.com/is/image/selfridges/852-10134-B6035500_M?$PDP_M_ZOOM$'
    }),
    Bracelet.create({
      style: 'triple',
      material: 'leather',
      color: 'black',
      qty: 100,
      price: 300.0,
      image:
        'https://images.selfridges.com/is/image/selfridges/852-10134-B6035500_M?$PDP_M_ZOOM$'
    }),
    Bracelet.create({
      style: 'triple',
      material: 'suede',
      color: 'teal',
      qty: 100,
      price: 300.0,
      image:
        'https://images.selfridges.com/is/image/selfridges/852-10134-B6035500_M?$PDP_M_ZOOM$'
    }),
    Bracelet.create({
      style: 'triple',
      material: 'leather',
      color: 'tan',
      qty: 100,
      price: 300.0,
      image:
        'https://images.selfridges.com/is/image/selfridges/852-10134-B6035500_M?$PDP_M_ZOOM$'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${bracelets.length} bracelets`)

  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
