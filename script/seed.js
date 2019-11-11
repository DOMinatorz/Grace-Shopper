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
        'Featuring five gorgeous bracelets that show off your love for the outdoors, this pack includes a mountain charm bracelet, a seed bead beauty, a gorgeous woven design, a pine tree bitty braid charm bracelet, and a bright red original. Each style represents Courtney’s amazing sense of adventure, and is designed to inspire you to explore the world!',
      inventory: 0,
      price: 10000,
      image:
        'https://images.selfridges.com/is/image/selfridges/852-10134-B6035500_M?$PDP_M_ZOOM$'
    }),
    Bracelet.create({
      style: 'Solitary',
      material: 'Suede',
      color: 'Ocean',
      longname: 'Solitary in Black Pebbled Leather and Iridescent Silver',
      description:
        'Make your mark on the universe — shine so bright that you change the world with your light. Adorned with Swarovski Crystals, this Star Charm Bangle Bracelet, crafted in a Shiny Silver Finish, will help you sparkle this winter season.',
      inventory: 0,
      price: 10000,
      image:
        'https://images.unsplash.com/photo-1571859939884-50b51d4cbc90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'
    }),
    Bracelet.create({
      style: 'Solitary',
      material: 'Leather',
      color: 'Tan',
      longname: 'Solitary in Black Pebbled Leather and Iridescent Silver',
      description:
        'The love we have for our pets is like no other. Animals are a reminder of what unconditional love means. Celebrate your pet with this Pavé Paw Print Symbol Charm Bangle Bracelet, adorned with Swarovski Crystals, in a unique Shiny Rose Gold Finish.',
      inventory: 0,
      price: 10000,
      image:
        'https://images.unsplash.com/photo-1508022909583-69228d7b2f8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80'
    }),
    Bracelet.create({
      style: 'Solitary',
      material: 'Leather',
      color: 'Tan',
      longname: 'Solitary in Black Pebbled Leather and Iridescent Silver',
      description:
        'Single row leather bracelet with acrylic studs and metal hardware...etc. Carry it this holiday season with this Pavé Heart Symbol Bead Charm Bangle, adorned with Swarovski Crystals, in a Shiny Silver Finish.',
      inventory: 0,
      price: 10000,
      image:
        'https://images.unsplash.com/photo-1571859939884-50b51d4cbc90?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80'
    }),
    Bracelet.create({
      style: 'Solitary',
      material: 'Leather',
      color: 'Tan',
      longname: 'Solitary in Black Pebbled Leather and Iridescent Silver',
      description:
        'The heart is an emblem of love, sorrow, joy, affection, and compassion. Carry it this holiday season with this Pavé Heart Symbol Bead Charm Bangle, adorned with Swarovski Crystals, in a Shiny Silver Finish.',
      inventory: 0,
      price: 10000,
      image:
        'https://images.unsplash.com/photo-1550572017-ff489f87b5fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80'
    }),
    Bracelet.create({
      style: 'Solitary',
      material: 'Leather',
      color: 'Tan',
      longname: 'Solitary in Black Pebbled Leather and Iridescent Silver',
      description:
        'Make the holidays merry and bright with pieces that reflect sunny days and snowy nights. Color Infusion Holiday Snowman Expandable Wire Bangle in Shiny Silver Finish features a colorful charm of a snowman decked out with holiday lights, a Santa had and sunglasses. No matter where you are in the world, the spirit of the holidays is with you.',
      inventory: 0,
      price: 10000,
      image:
        'https://images.unsplash.com/photo-1517857399767-a9dc28f5a734?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }),
    Bracelet.create({
      style: 'Pair',
      material: 'Leather',
      color: 'Black',
      longname: 'Solitary in Black Pebbled Leather and Iridescent Silver',
      description:
        'Trio Ornaments Expandable Wire Bangle in Shiny Silver Finish features three two-tone silver and gold ornament charms. This bracelet benefits Baby 2 Baby, an organization that provides children living in poverty with diapers, clothing and basic necessities.',
      inventory: 0,
      price: 20000,
      image:
        'https://images.unsplash.com/photo-1518603651734-34dfe67da4d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=747&q=80'
    }),
    Bracelet.create({
      style: 'Pair',
      material: 'Suede',
      color: 'Ocean',
      longname: 'Solitary in Black Pebbled Leather and Iridescent Silver',
      description:
        'Two-Tone Angel Expandable Wire Bangle in Shiny Silver Finish features a charm with a silver angel with gold wings. This bracelet benefits Stomp Out Bullying, an organization that stands up against hate, racism and discrimination by changing the culture with inclusion, equality, civility, and unity.',
      inventory: 0,
      price: 20000,
      image:
        'https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=701&q=80'
    }),
    Bracelet.create({
      style: 'Pair',
      material: 'Leather',
      color: 'Tan',
      longname: 'Solitary in Black Pebbled Leather and Iridescent Silver',
      description:
        'With bold hues and stunning brilliant stones, this collection embodies the soul of the holiday season, capturing the warmth of the fire in your home and your heart, the cool silver like the frost on the trees, and the dazzling sparkles found in nature and in the stones that adorn you. Wear this Starlight Fine Rocks Mesh Cuff, adorned with blue Swarovski® crystals in RAFAELIAN SILVER Finish, and carry a little bit of the season’s light with you always.',
      inventory: 0,
      price: 20000,
      image:
        'https://images.unsplash.com/photo-1563417994873-225b17d024af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
    }),
    Bracelet.create({
      style: 'Trio',
      material: 'Leather',
      color: 'Black',
      longname: 'Solitary in Black Pebbled Leather and Iridescent Silver',
      description:
        'With bold hues and stunning brilliant stones, this collection embodies the soul of the holiday season, capturing the warmth of the fire in your home and your heart, the cool silver like the frost on the trees, and the dazzling sparkles found in nature and in the stones that adorn you. Wear this Pearl and Crystal Stretch Bracelet, adorned with pearl and clear Swarovski® crystals in Shiny Rose Gold Finish, and carry a little bit of the season’s light with you always.',
      inventory: 0,
      price: 30000,
      image:
        'https://images.unsplash.com/photo-1558642911-0ff0aa858deb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80'
    }),
    Bracelet.create({
      style: 'Trio',
      material: 'Suede',
      color: 'Ocean',
      longname: 'Solitary in Black Pebbled Leather and Iridescent Silver',
      description:
        'With bold hues and stunning brilliant stones, this collection embodies the soul of the holiday season, capturing the warmth of the fire in your home and your heart, the cool silver like the frost on the trees, and the dazzling sparkles found in nature and in the stones that adorn you. Wear this Arm Party Emerald Crystal Drop Pull Chain Adjustable Bracelet, with green and clear Swarovski® crystals in Shiny Silver Finish, and carry a little bit of the season’s light with you always.',
      inventory: 0,
      price: 30000,
      image:
        'https://images.unsplash.com/photo-1567140978314-b2f0a1637b84?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }),
    Bracelet.create({
      style: 'Trio',
      material: 'Leather',
      color: 'Tan',
      longname: 'Solitary in Black Pebbled Leather and Iridescent Silver',
      description:
        'With bold hues and stunning brilliant stones, this collection embodies the soul of the holiday season, capturing the warmth of the fire in your home and your heart, the cool silver like the frost on the trees, and the dazzling sparkles found in nature and in the stones that adorn you. Sky Blue Luminous Stretch Bracelet in Shiny Silver Finish features glittering blue beads and stretches to fit most wrists. Wear it and carry a little bit of the season’s light with you always.',
      inventory: 0,
      price: 30000,
      image:
        'https://images.unsplash.com/photo-1565645289095-a5d91c9f9e0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80'
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
