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
      style: 'Solitary',
      material: 'Leather',
      color: 'Black',
      longname: 'Solitary in Black Pebbled Leather and Iridescent Silver',
      description:
        'Single row leather bracelet with acrylic studs and metal hardware.',
      inventory: 100,
      price: 10000,
      image: 'https://i.imgur.com/boDLWbr.png'
    }),
    Bracelet.create({
      style: 'Solitary',
      material: 'Suede',
      color: 'Ocean',
      longname: 'Solitary in Ocean Suede and Dark Gold',
      description:
        'Single row leather bracelet with acrylic studs and metal hardware.',
      inventory: 100,
      price: 10000,
      image: 'https://i.imgur.com/P4YtcYo.png'
    }),
    Bracelet.create({
      style: 'Solitary',
      material: 'Leather',
      color: 'Tan',
      longname: 'Solitary in Tan and Dark Gold',
      description:
        'Single row leather bracelet with acrylic studs and metal hardware.',
      inventory: 100,
      price: 10000,
      image: 'https://i.imgur.com/IsMSZQ0.png'
    }),
    Bracelet.create({
      style: 'Solitary',
      material: 'Leather',
      color: 'Cerise',
      longname: 'Solitary in Cerise Leather and Metallic Lavender',
      description:
        'Single row leather bracelet with acrylic studs and metal hardware.',
      inventory: 100,
      price: 10000,
      image: 'https://i.imgur.com/mNJysfA.png'
    }),
    Bracelet.create({
      style: 'Solitary',
      material: 'Suede',
      color: 'Gray',
      longname: 'Solitary in Hazy Gray Suede and Iridescent Dusk',
      description:
        'Single row leather bracelet with acrylic studs and metal hardware.',
      inventory: 100,
      price: 10000,
      image: 'https://i.imgur.com/7aveEPK.png'
    }),
    Bracelet.create({
      style: 'Pair',
      material: 'Leather',
      color: 'Cerise',
      longname: 'Pair in Cerise and Metallic Blue',
      description:
        'The traditional bracelet but twice as nice. Adjustable strap, fits most wrists.',
      inventory: 100,
      price: 20000,
      image: 'https://i.imgur.com/gVJSlWi.png'
    }),
    Bracelet.create({
      style: 'Pair',
      material: 'Leather',
      color: 'Tan',
      longname: 'Pair in Tan with Metallic Blue and Gold',
      description:
        'The traditional bracelet but twice as nice. Adjustable strap, fits most wrists.',
      inventory: 100,
      price: 20000,
      image: 'https://i.imgur.com/2FlFW7G.png'
    }),
    Bracelet.create({
      style: 'Trio',
      material: 'Leather',
      color: 'Black',
      longname: 'Trio in Black Pebbled Leather',
      description:
        'The traditional bracelet but thrice as nice and thrice as bold. Adjustable strap, fits most wrists.',
      inventory: 100,
      price: 30000,
      image: 'https://i.imgur.com/1WOiUiN.png'
    }),
    Bracelet.create({
      style: 'Trio',
      material: 'Suede',
      color: 'Ocean',
      longname: 'Trio in Ocean Suede',
      description:
        'The traditional bracelet but thrice as nice and thrice as bold. Adjustable strap, fits most wrists.',
      inventory: 100,
      price: 30000,
      image: 'https://i.imgur.com/rwkcDTj.png'
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
