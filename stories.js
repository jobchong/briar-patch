/* stories.js: the books on the shelves.
 *
 * HOW TO WRITE A PAGE
 *   text   The words on the page. Put a word in [square brackets] to make it a
 *          blank the child types. Use \n for a new line.
 *   art    The picture: a list of [sprite, x, y, size, options].
 *          The picture is 300 wide and 360 tall; y is where the sprite's feet are.
 *          Options: flip, rot (degrees), noShadow, plus a few per sprite
 *          (cat: hat/sleep/sad, rabbit: jacket/sleep/laugh/hare, bed: rabbit/pip/ears,
 *          star: face/sleep, house: kind ('straw', 'sticks', 'brick')/down/smoke,
 *          wolf: blow/ouch, troll: roar/wet, pot: lid/fire, goat: fat/happy, clock: one/bong, ...).
 *   bg     The background: day, farm, night, indoor, sea, nightsea, nightbeach, wood,
 *          garden, hill, dusk, pond, river.
 *   after  Optional { text, art, bg }: shown once every blank on the page is filled.
 *
 * HOW THE TWO SHELVES DIFFER
 *   little  Every letter is shown faintly and the matching key glows. The child
 *           just finds the key. (Learning letter names and where keys live.)
 *   big     Only empty letter slots. The picture and the spoken word are the clue.
 *           If they get stuck, the next letter fades in and its key lights up.
 *
 * Rename the shelves to the children's names if you like. The labels are read aloud.
 */
window.SHELVES = [
  { id: 'little', label: 'The Little Shelf', icon: 'mouse' },
  { id: 'big', label: 'The Big Shelf', icon: 'owl' }
];

window.BOOKS = [
  /* ================= THE LITTLE SHELF (about age 3) ================= */
  {
    id: 'macdonald', shelf: 'little', cloth: '#7b2d26',
    title: 'Old MacDonald Had a Farm',
    byline: 'A farmyard song',
    source: 'A traditional folk song.',
    cover: { bg: 'farm', art: [['barn', 150, 270, 1.6], ['hen', 62, 322, 0.75], ['pig', 238, 326, 0.8, { flip: true }]] },
    pages: [
      { bg: 'farm', text: 'Old MacDonald had a farm,\n[E]-[I]-[E]-[I]-[O]!', art: [['sun', 245, 100, 0.7], ['barn', 140, 300, 1.7]] },
      {
        bg: 'farm', text: 'And on that farm he had a [cow],\nE-I-E-I-O!', art: [['cow', 150, 310, 1.75]],
        after: { text: 'With a moo-moo here,\nand a moo-moo there!' }
      },
      {
        bg: 'farm', text: 'And on that farm he had a [pig],\nE-I-E-I-O!', art: [['pig', 150, 310, 1.7]],
        after: { text: 'With an oink-oink here,\nand an oink-oink there!' }
      },
      {
        bg: 'farm', text: 'And on that farm he had a [duck],\nE-I-E-I-O!', art: [['duck', 150, 310, 1.7]],
        after: { text: 'With a quack-quack here,\nand a quack-quack there!' }
      },
      {
        bg: 'farm', text: 'And on that farm he had a [hen],\nE-I-E-I-O!', art: [['hen', 150, 310, 1.7]],
        after: { text: 'With a cluck-cluck here,\nand a cluck-cluck there!' }
      },
      {
        bg: 'farm', text: 'Old MacDonald had a farm,\n[E]-[I]-[E]-[I]-[O]!',
        art: [['barn', 150, 262, 1.25], ['cow', 70, 318, 0.85], ['pig', 238, 320, 0.8, { flip: true }], ['duck', 130, 332, 0.6], ['hen', 185, 334, 0.6, { flip: true }]]
      }
    ]
  },
  {
    id: 'diddle', shelf: 'little', cloth: '#23395b',
    title: 'Hey Diddle Diddle',
    byline: 'An old nursery rhyme',
    source: 'From The Real Mother Goose (1916), Project Gutenberg eBook #10607.',
    cover: { bg: 'night', art: [['moon', 175, 230, 1.15], ['cow', 140, 168, 1.1, { rot: -14, noShadow: true }]] },
    pages: [
      { bg: 'night', text: 'Hey, diddle, diddle!\nThe [cat] and the fiddle,', art: [['moon', 235, 120, 0.7], ['cat', 125, 310, 1.65], ['fiddle', 222, 280, 0.95]] },
      { bg: 'night', text: 'The [cow] jumped over the [moon];', art: [['moon', 160, 270, 1.3], ['cow', 150, 178, 1.3, { rot: -14, noShadow: true }]] },
      { bg: 'night', text: 'The little [dog] laughed\nTo see such sport,', art: [['moon', 240, 110, 0.6], ['dog', 150, 312, 1.75]] },
      { bg: 'night', text: 'And the [dish] ran away\nwith the [spoon].', art: [['moon', 240, 105, 0.6], ['dish', 105, 312, 1.3], ['spoon', 205, 312, 1.35]] }
    ],
    end: { bg: 'night', art: [['moon', 150, 210, 1.2], ['star', 60, 90, 0.25], ['star', 250, 70, 0.3], ['star', 220, 160, 0.2]] }
  },
  {
    id: 'rabbit', shelf: 'little', cloth: '#3f5a36',
    title: 'Where Is Little Rabbit?',
    byline: 'A hide-and-seek story',
    source: 'A new story for this library.',
    cover: { bg: 'indoor', art: [['rabbit', 150, 318, 1.9]] },
    pages: [
      {
        bg: 'indoor', text: 'Little Rabbit is hiding.\nIs Little Rabbit in the [box]?', art: [['box', 150, 312, 1.8]],
        after: { text: 'No! It is a frog.\nRibbit!', art: [['box', 175, 312, 1.7], ['frog', 78, 318, 1.05, { pop: true }]] }
      },
      {
        bg: 'indoor', text: 'Is Little Rabbit in the [hat]?', art: [['hat', 150, 312, 1.8]],
        after: { text: 'No! It is a mouse.\nSqueak!', art: [['hat', 175, 312, 1.7], ['mouse', 72, 318, 0.95, { pop: true }]] }
      },
      {
        bg: 'indoor', text: 'Is Little Rabbit in the [tub]?', art: [['tub', 150, 312, 1.75]],
        after: { text: 'No! It is a duck.\nQuack!', art: [['duck', 140, 238, 1, { noShadow: true, pop: true }], ['tub', 150, 312, 1.75]] }
      },
      {
        bg: 'indoor', text: 'Is Little Rabbit in the [bed]?', art: [['bed', 150, 312, 2, { ears: true }]],
        after: { text: 'Yes! Here is Little Rabbit.\nGoodnight, Little Rabbit!', art: [['bed', 150, 312, 2, { rabbit: true }]] }
      }
    ],
    end: { bg: 'night', art: [['moon', 150, 200, 1.1], ['star', 70, 100, 0.25], ['star', 235, 150, 0.22]] }
  },
  {
    id: 'twinkle', shelf: 'little', cloth: '#2e3566',
    title: 'Twinkle, Twinkle, Little Star',
    byline: 'by Jane Taylor',
    source: 'From "The Star" in Rhymes for the Nursery (1806). These are the first two of its five verses, with the first sung again at the end.',
    cover: { bg: 'night', art: [['star', 150, 262, 1.6, { face: true }], ['star', 55, 80, 0.22], ['star', 250, 70, 0.28]] },
    pages: [
      { bg: 'night', text: 'Twinkle, twinkle, little [star],\nHow I wonder what you are!', art: [['star', 150, 262, 1.75, { face: true }], ['star', 48, 70, 0.22], ['star', 255, 92, 0.28]] },
      { bg: 'night', text: 'Up above the world so high,\nLike a diamond in the [sky].', art: [['star', 205, 110, 0.55, { face: true }], ['tree', 70, 310, 1.5, { seed: 3 }], ['rabbit', 185, 322, 1.05]] },
      { bg: 'dusk', text: 'When the blazing [sun] is gone,\nWhen he nothing shines upon,', art: [['sun', 150, 252, 1.25, { sleep: true }]] },
      {
        bg: 'night', text: 'Then you show your little [light],\nTwinkle, twinkle, all the night.',
        art: [['moon', 62, 130, 0.55], ['star', 170, 225, 1.25, { face: true }], ['star', 250, 70, 0.2], ['star', 125, 62, 0.16], ['star', 262, 200, 0.18], ['star', 42, 228, 0.15]]
      },
      { bg: 'night', text: 'Twinkle, twinkle, little [star],\nHow I wonder what you are!', art: [['star', 228, 108, 0.6, { face: true }], ['bed', 150, 322, 2, { rabbit: true }]] }
    ],
    end: { bg: 'night', art: [['star', 150, 250, 1.4, { face: true, sleep: true }], ['star', 60, 80, 0.22], ['star', 245, 95, 0.26]] }
  },
  {
    id: 'hickory', shelf: 'little', cloth: '#7c5a2e',
    title: 'Hickory, Dickory, Dock',
    byline: 'An old nursery rhyme',
    source: 'From The Real Mother Goose (1916), Project Gutenberg eBook #10607.',
    cover: { bg: 'indoor', art: [['clock', 150, 318, 2.65], ['mouse', 168, 83, 0.62, { noShadow: true }]] },
    pages: [
      { bg: 'indoor', text: 'Hickory, dickory, [dock]!', art: [['clock', 120, 318, 2.65], ['mouse', 240, 322, 0.95, { flip: true }]] },
      { bg: 'indoor', text: 'The [mouse] ran up the clock;', art: [['clock', 165, 318, 2.65], ['mouse', 128, 236, 0.85, { rot: -90, noShadow: true }]] },
      {
        bg: 'indoor', text: 'The clock struck [one],', art: [['clock', 150, 318, 2.65, { one: true }], ['mouse', 168, 83, 0.62, { noShadow: true }]],
        after: { text: 'Bong!', art: [['clock', 150, 318, 2.65, { one: true, bong: true }], ['mouse', 176, 58, 0.62, { noShadow: true, rot: -12, pop: true }]] }
      },
      { bg: 'indoor', text: 'And down he [run],', art: [['clock', 105, 318, 2.65, { one: true }], ['mouse', 232, 324, 1]] },
      { bg: 'indoor', text: 'Hickory, dickory, [dock]!', art: [['clock', 120, 318, 2.65, { one: true }], ['mouse', 232, 324, 0.85, { flip: true }]] }
    ]
  },
  {
    id: 'count', shelf: 'little', cloth: '#8e3b52',
    title: 'One Red Bug',
    byline: 'A counting book',
    source: 'A new story for this library.',
    cover: { bg: 'garden', art: [['bug', 150, 300, 1.5]] },
    pages: [
      { bg: 'garden', text: 'One red [bug].', art: [['bug', 150, 306, 1.6]] },
      {
        bg: 'pond', text: 'Two green [frogs].',
        art: [['lily', 88, 318, 1.5], ['frog', 88, 308, 1.05, { noShadow: true }], ['lily', 212, 338, 1.5], ['frog', 212, 328, 1.05, { noShadow: true }]]
      },
      {
        bg: 'pond', text: 'Three white [ducks].',
        art: [['duck', 70, 306, 1.05, { noShadow: true }], ['duck', 160, 336, 1.1, { noShadow: true }], ['duck', 240, 302, 1.05, { noShadow: true }]]
      },
      {
        bg: 'farm', text: 'Four pink [pigs].',
        art: [['mud', 150, 354, 2.6], ['pig', 88, 294, 0.72], ['pig', 212, 296, 0.72, { flip: true }], ['pig', 92, 344, 0.78], ['pig', 210, 346, 0.78, { flip: true }]]
      },
      {
        bg: 'indoor', text: 'Five grey [mice].',
        art: [['mouse', 55, 300, 0.7], ['mouse', 150, 300, 0.7], ['mouse', 245, 300, 0.7, { flip: true }], ['mouse', 100, 344, 0.75, { flip: true }], ['mouse', 200, 344, 0.75]]
      },
      {
        bg: 'farm', text: 'And one big [cow],\nwith one red bug on her nose!', art: [['cow', 140, 320, 2.25], ['bug', 233, 224, 0.3, { noShadow: true }]],
        after: { text: 'Moo!' }
      }
    ],
    end: {
      bg: 'farm',
      art: [['cow', 150, 300, 1.3], ['bug', 204, 248, 0.18, { noShadow: true }], ['frog', 40, 336, 0.5], ['duck', 94, 340, 0.5], ['pig', 210, 338, 0.5, { flip: true }], ['mouse', 262, 340, 0.45, { flip: true }]]
    }
  },
  {
    id: 'pea', shelf: 'little', cloth: '#4f6b3a',
    title: 'The Princess and the Pea',
    byline: 'by Hans Christian Andersen',
    source: 'After "The Real Princess" in Andersen\'s Fairy Tales, Project Gutenberg eBook #1597. Andersen\'s own Danish has one pea; this old English translation has three, and so does this book.',
    cover: { bg: 'indoor', art: [['mattresses', 150, 342, 2.9, { princess: 'sleep', peas: true }]] },
    pages: [
      {
        bg: 'storm', text: 'One stormy night, the rain came pouring down.\nKnock, knock! Who is at the [door]?',
        art: [['castledoor', 150, 334, 2.5]],
        after: {
          text: 'It was a princess,\nwet from top to toe!',
          art: [['castledoor', 112, 334, 2.2, { open: true }], ['princess', 220, 338, 1.8, { mouth: 'sad' }], ['drops', 220, 196, 0.75, { pop: true }]]
        }
      },
      {
        bg: 'indoor', text: 'The old queen put three little [peas]\non the bed.',
        art: [['queen', 62, 304, 1.6, { arms: 'reach' }], ['bed', 178, 326, 2, { bare: true }], ['pea', 140, 288, 0.75, { noShadow: true }], ['pea', 178, 288, 0.75, { noShadow: true }], ['pea', 216, 288, 0.75, { noShadow: true }]]
      },
      {
        bg: 'indoor', text: 'Then she piled up twenty mattresses,\nand twenty feather [beds] on top.',
        art: [['queen', 48, 340, 1.35], ['mattresses', 172, 342, 2.9, { peas: true }]]
      },
      {
        bg: 'indoor', text: 'The princess climbed up, up, up to the [top],\nand lay down for the night.',
        art: [['mattresses', 150, 342, 2.9, { princess: true, peas: true }], ['arrow', 262, 300, 0.75, { up: true }]]
      },
      {
        bg: 'indoor', text: '"How did you sleep?" asked the queen.\n"Oh, very badly! There was something hard in my [bed].\nI am black and blue all over!"',
        art: [['mattresses', 222, 342, 2.3, { peas: true }], ['queen', 62, 338, 1.6], ['princess', 140, 342, 1.7, { mouth: 'sad' }]],
        after: {
          text: 'Only a real princess could feel three little peas\nthrough all those beds!\nSo the prince married her.',
          art: [['prince', 105, 338, 1.9], ['princess', 195, 338, 1.9], ['hearts', 150, 150, 0.75, { pop: true }]]
        }
      },
      {
        bg: 'indoor', text: 'And the three peas were put in a glass [box],\nwhere you may see them still,\nif they have not been lost!',
        art: [['glasscase', 150, 332, 2.7]]
      }
    ],
    end: { bg: 'night', art: [['moon', 150, 200, 1.1], ['star', 70, 100, 0.25], ['star', 235, 150, 0.22]] }
  },

  {
    id: 'frozen-ice-boat', shelf: 'little', cloth: '#39758b',
    title: 'Frozen: Snow in the Castle',
    byline: 'Anna and Elsa as children',
    source: 'Retold from the opening of Disney’s Frozen (2013).',
    cover: { bg: 'hall', art: [['elsa', 69, 315, 1.35], ['olaf', 150, 329, 1.2], ['anna', 230, 315, 1.25]] },
    pages: [
      { bg: 'indoor', text: 'Anna could not sleep.\nShe woke Elsa in [bed].', art: [['bed', 145, 314, 2, { princess: true, head: { crown: false, hair: '#f3e6c8' } }], ['anna', 226, 322, 1.2]] },
      { bg: 'hall', text: 'Downstairs, Elsa made a little [ball] of snow between her hands.', art: [['anna', 79, 315, 1.3], ['elsa', 185, 317, 1.65, { arms: 'hold' }], ['snowball', 185, 265, 0.4]] },
      { bg: 'hall', text: 'Up it went! Soft [snow] fell all around the girls.', art: [['anna', 79, 320, 1.35, { arms: 'up' }], ['elsa', 207, 320, 1.5, { arms: 'up' }], ['snowball', 58, 150, 0.13], ['snowball', 128, 170, 0.11], ['snowball', 193, 123, 0.13], ['snowball', 244, 200, 0.12], ['snowball', 143, 228, 0.13]] },
      { bg: 'hall', text: 'The girls made a snowman. Elsa moved his twig arm.\nAnna gave Olaf a big [hug].', art: [['elsa', 98, 314, 1.55, { arms: 'reach' }], ['olaf', 161, 320, 1.1], ['anna', 200, 323, 1.25, { arms: 'reach', flip: true }]] }
    ]
  },
  {
    id: 'cinderella', shelf: 'little', cloth: '#526796',
    title: 'Cinderella and the Glass Slipper',
    byline: 'Midnight at the ball',
    source: 'Retold from Disney’s Cinderella (1950).',
    cover: { bg: 'hall', art: [['cinderella', 99, 317, 1.8], ['slipper', 209, 326, 1.3]] },
    pages: [
      { bg: 'hall', text: 'At the ball, Cinderella danced with the prince.\nThen the [clock] began to strike twelve.', art: [['clock', 215, 310, 1.95, { midnight: true, bong: true }], ['cinderella', 80, 323, 1.65]] },
      { bg: 'hall', text: 'She ran down the steps.\nOne glass [shoe] slipped off!', art: [['stepslab', 155, 329, 2.25], ['slipper', 175, 262, 0.92], ['cinderella', 62, 327, 1.3]] },
      { bg: 'night', text: 'Away sped her coach. At the last bong, it was a [pumpkin] again.', art: [['pumpkin', 153, 315, 1.8], ['mouse', 64, 327, 0.72], ['mouse', 241, 322, 0.68]] },
      { bg: 'night', text: 'Cinderella still had one glass slipper on her [foot].', art: [['slipperfoot', 150, 307, 1.95]],
        after: { text: 'The other slipper was back at the palace.' } }
    ]
  },
  {
    id: 'rapunzel', shelf: 'little', cloth: '#725681',
    title: 'Rapunzel and the Floating Lights',
    byline: 'Lantern night on the water',
    source: 'Retold from Disney’s Tangled (2010).',
    cover: { bg: 'nightsea', art: [['lantern', 83, 143, 0.7], ['lantern', 204, 105, 0.55], ['rapunzel', 138, 286, 1.27], ['boat', 149, 316, 2.2]] },
    pages: [
      { bg: 'night', text: 'Each year on her birthday, Rapunzel saw lights from her tall [tower].', art: [['tower', 143, 315, 2.2], ['lantern', 233, 134, 0.42], ['lantern', 66, 100, 0.32]] },
      { bg: 'nightsea', text: 'This year Flynn took her out in a [boat].\nThey waited on the water.', art: [['rapunzel', 106, 292, 1.28], ['flynn', 190, 293, 1.28], ['boat', 149, 316, 2.3]] },
      { bg: 'night', text: 'At the castle, the [king] and queen let the first lantern go.', art: [['king', 104, 313, 1.6, { arms: 'up' }], ['queen', 196, 313, 1.55], ['lantern', 128, 141, 0.9]] },
      { bg: 'nightsea', text: 'Soon the whole [sky] was full of lights.\nRapunzel let a lantern float up from her hands.', art: [['lantern', 50, 132, 0.41], ['lantern', 86, 79, 0.27], ['lantern', 150, 109, 0.5], ['lantern', 226, 76, 0.36], ['lantern', 248, 163, 0.54], ['lantern', 101, 184, 0.74], ['rapunzel', 109, 289, 1.3, { arms: 'up' }], ['flynn', 192, 291, 1.26], ['boat', 151, 317, 2.32]] }
    ]
  },
  {
    id: 'ariel', shelf: 'little', cloth: '#357076',
    title: 'The Little Mermaid to the Rescue',
    byline: 'Ariel saves Prince Eric',
    source: 'Retold from Disney’s The Little Mermaid (1989).',
    cover: { bg: 'nightsea', art: [['boatsail', 204, 239, 1.3], ['boat', 204, 250, 1.6], ['ariel', 102, 325, 1.75]] },
    pages: [
      { bg: 'nightsea', text: 'Ariel swam up to a [ship].\nPrince Eric was on board.', art: [['boatsail', 166, 252, 2.1], ['eric', 115, 253, 1.05], ['boat', 153, 283, 2.45], ['ariel', 64, 331, 1.1]] },
      { bg: 'nightsea', text: 'A storm came. The ship caught fire!\nEric went back for his [dog], Max.', art: [['fire', 202, 267, 1.1], ['eric', 144, 262, 1.22, { arms: 'reach' }], ['dog', 88, 265, 1.08], ['boat', 149, 296, 2.5]] },
      { bg: 'nightsea', text: 'Max was safe, but Eric fell into the [sea].\nAriel swam to him.', art: [['eric', 189, 301, 1.12, { sleep: true, rot: 48, noShadow: true }], ['ariel', 104, 316, 1.3, { arms: 'reach' }], ['splash', 156, 314, 0.58]] },
      { bg: 'beach', text: 'Ariel brought Eric to shore.\nAs he woke, he heard her [song].', art: [['eric', 179, 323, 1.38, { rot: 75, sleep: true }], ['ariel', 103, 317, 1.65], ['notes', 160, 185, 0.75]] }
    ]
  },
  /* ================= THE BIG SHELF (about age 5) ================= */
  {
    id: 'hen', shelf: 'big', cloth: '#8a5a1c',
    title: 'The Little Red Hen',
    byline: 'Retold from an old English folk tale',
    source: 'After the 1918 telling by Florence White Williams, Project Gutenberg eBook #18735.',
    cover: { bg: 'farm', art: [['wheat', 230, 318, 1.1], ['hen', 130, 318, 1.6]] },
    pages: [
      { bg: 'farm', text: 'Once upon a time there was a little red [hen].\nOne day she found some wheat.', art: [['hen', 130, 312, 1.6], ['wheat', 238, 312, 0.7, { n: 3 }]] },
      { bg: 'farm', text: '"Who will plant this wheat?" said the hen.\n"Not I," said the [pig].', art: [['pig', 150, 312, 1.7]] },
      { bg: 'farm', text: '"Not I," said the [cat].', art: [['cat', 150, 312, 1.7]] },
      { bg: 'farm', text: '"Not I," said the [rat].', art: [['mouse', 150, 312, 1.8, { rat: true }]] },
      { bg: 'farm', text: '"Well, then, I will," said the little red hen.\nAnd she did. She [dug] a hole, and planted the wheat.', art: [['hen', 92, 318, 1.35], ['dig', 210, 324, 1.35]] },
      { bg: 'farm', text: 'The wheat grew tall and gold in the [sun].', art: [['sun', 225, 105, 0.95], ['wheat', 95, 315, 1.5], ['wheat', 190, 318, 1.3]] },
      {
        bg: 'farm', text: '"Who will [cut] the wheat?"\n"Not I," said the pig, the cat and the rat.\nSo the little red hen did it all by herself.',
        art: [
          ['pig', 42, 272, 0.45], ['cat', 88, 272, 0.45, { sleep: true }], ['mouse', 128, 274, 0.45, { rat: true }], ['zzz', 104, 226, 0.4],
          ['wheat', 246, 326, 1.2], ['wheat', 112, 344, 0.85, { rot: -84, n: 4 }], ['hen', 142, 330, 1.2], ['sickle', 196, 312, 0.75, { rot: 10 }]
        ]
      },
      { bg: 'farm', text: 'She took the wheat to the mill.\nThen she baked a [big] loaf of bread.', art: [['bread', 182, 322, 2.3], ['hen', 52, 326, 0.72]] },
      {
        bg: 'farm', text: '"Who will [eat] this bread?" said the hen.\n"I will!" said the pig, the cat and the rat.',
        art: [
          ['mouse', 150, 286, 0.62, { rat: true }], ['cutlery', 150, 228, 0.36],
          ['pig', 56, 320, 0.78], ['cutlery', 56, 252, 0.4], ['cat', 246, 322, 0.78, { happy: true }], ['cutlery', 246, 238, 0.4],
          ['bread', 150, 340, 0.8]
        ]
      },
      {
        bg: 'farm', text: '"No, you won\'t," said the little red hen.\n"I will!"\nAnd she did. She [ate] it all up.',
        art: [['pig', 48, 322, 0.62], ['cat', 258, 322, 0.62, { sad: true }], ['hen', 140, 322, 1.35, { rot: 16 }], ['crumbs', 200, 330, 0.7]]
      }
    ]
  },
  {
    id: 'briar', shelf: 'big', cloth: '#1f4b3a',
    title: 'Brer Rabbit and the Briar Patch',
    byline: 'Retold from an African American folk tale',
    source: 'A trickster tale from African American storytelling, first written down by Joel Chandler Harris in Uncle Remus: His Songs and His Sayings (1880), Project Gutenberg eBook #2306. These are his "The Wonderful Tar-Baby Story" and "How Mr. Rabbit Was Too Sharp for Mr. Fox", told in plain words.',
    cover: { bg: 'wood', art: [['rabbit', 150, 262, 1.3, { jacket: true, noShadow: true }], ['briar', 150, 322, 2]] },
    pages: [
      {
        bg: 'wood', text: 'Brer Rabbit lived in the wood.\nHe could [hop], and he could [run]!',
        art: [['arrow', 74, 346, 0.95], ['rabbit', 84, 262, 1.15, { jacket: true, noShadow: true }], ['lines', 168, 300, 0.75], ['rabbit', 228, 330, 1.15, { jacket: true, rot: 16 }], ['dust', 196, 344, 0.55]]
      },
      { bg: 'wood', text: 'Brer Fox was a sly old [fox].\nHe wanted to catch Brer Rabbit.', art: [['fox', 150, 314, 1.8]] },
      {
        bg: 'wood', text: 'One day Brer Fox got some [tar], and mixed it with turpentine,\nand made it into a figure he called a Tar-Baby.',
        art: [['tarbaby', 90, 320, 1.6], ['bucket', 168, 332, 0.75], ['fox', 244, 318, 1.2, { flip: true, happy: true }]]
      },
      {
        bg: 'wood', text: 'He set the Tar-Baby in the middle of the big road,\nand then he [hid] in the bushes to see what would happen.',
        art: [['tarbaby', 92, 320, 1.4], ['fox', 232, 320, 1.05, { flip: true }], ['bush', 226, 348, 1.55]]
      },
      {
        bg: 'wood', text: 'By and by, along came Brer Rabbit, hopping down the road.\n"Good morning!" he said. "Nice weather this morning!"\nThe Tar-Baby said nothing, and Brer Fox, he lay [low].',
        art: [['rabbit', 62, 320, 1.1, { jacket: true }], ['tarbaby', 150, 320, 1.15], ['bush', 252, 318, 0.95], ['fox', 240, 344, 0.85, { low: true, flip: true }]]
      },
      {
        bg: 'wood', text: '"Are you deaf?" said Brer Rabbit. "If you are, I can holler louder."\n"You\'re stuck up, that\'s what you are! Take off your [hat]\nand say howdy, or I\'ll bust you wide open!"\nThe Tar-Baby said nothing, and Brer Fox, he lay low.',
        art: [['rabbit', 76, 322, 1.15, { jacket: true }], ['tarbaby', 172, 320, 1.2], ['fox', 266, 304, 0.7, { flip: true }], ['bush', 266, 338, 0.8], ['say', 112, 214, 0.95, { art: [['hat', 50, 72, 0.52]] }]]
      },
      {
        bg: 'wood', text: 'So Brer Rabbit drew back his fist, and blip! He hit the Tar-Baby.\nHis fist stuck fast. He hit it with his other hand, and that stuck.\nHe kicked it, and his feet stuck. He butted it, and his [head] stuck.',
        art: [['rabbit', 104, 330, 1.35, { jacket: true, rot: 30 }], ['tarbaby', 186, 326, 1.6, { goo: true }], ['alarm', 138, 214, 0.55]]
      },
      {
        bg: 'wood', text: 'Then out came Brer Fox, as innocent as you please.\n"Howdy, Brer Rabbit. You look sort of [stuck] up this morning!"\nAnd he rolled on the ground, and laughed and laughed.',
        art: [['rabbit', 78, 322, 1.05, { jacket: true, rot: 18 }], ['tarbaby', 126, 320, 1.15, { goo: true }], ['fox', 238, 318, 1.25, { flip: true, happy: true, rot: -14 }]]
      },
      {
        bg: 'wood', text: '"I\'ve got you this time, Brer Rabbit," said Brer Fox.\n"I\'ll pile up some brush and set it on [fire], and roast you!"',
        art: [['rabbit', 64, 322, 0.95, { jacket: true, rot: 18 }], ['tarbaby', 104, 320, 1.05, { goo: true }], ['house', 172, 344, 1, { kind: 'sticks', down: true }], ['fire', 172, 340, 0.95], ['fox', 248, 318, 1.15, { flip: true, happy: true }]],
        after: { text: '"Roast me, Brer Fox," said Brer Rabbit,\n"but please don\'t throw me in the briar patch!"' }
      },
      {
        bg: 'wood', text: '"It\'s too much trouble to light a fire," said Brer Fox,\n"so I\'ll have to [hang] you."',
        art: [['rabbit', 82, 322, 1, { jacket: true, rot: 18 }], ['tarbaby', 122, 320, 1.1, { goo: true }], ['fox', 238, 318, 1.25, { flip: true }], ['think', 150, 206, 1.3, { tail: 'right', art: [['rope', 50, 74, 0.62]] }]],
        after: { text: '"Hang me as high as you please, Brer Fox," said Brer Rabbit,\n"but please don\'t throw me in the briar patch!"' }
      },
      {
        bg: 'wood', text: '"I haven\'t got any string," said Brer Fox,\n"so I\'ll have to [drown] you."',
        art: [['rabbit', 82, 322, 1, { jacket: true, rot: 18 }], ['tarbaby', 122, 320, 1.1, { goo: true }], ['fox', 238, 318, 1.25, { flip: true }], ['think', 150, 206, 1.3, { tail: 'right', art: [['waves', 50, 76, 0.8], ['splash', 50, 62, 0.42]] }]],
        after: { text: '"Drown me as deep as you please, Brer Fox," said Brer Rabbit,\n"but please don\'t throw me in the briar patch!"' }
      },
      {
        bg: 'wood', text: '"There\'s no water near," said Brer Fox,\n"so I\'ll have to [skin] you."',
        art: [['rabbit', 82, 322, 1, { jacket: true, rot: 18 }], ['tarbaby', 122, 320, 1.1, { goo: true }], ['fox', 238, 318, 1.25, { flip: true, happy: true }], ['think', 150, 206, 1.3, { tail: 'right', art: [['pelt', 50, 74, 0.56]] }]],
        after: { text: '"Skin me, Brer Fox," said Brer Rabbit. "Pull out my eyes,\ntear out my ears by the roots, and cut off my legs,\nbut please, PLEASE don\'t throw me in the briar patch!"' }
      },
      {
        bg: 'wood', text: 'Brer Fox wanted to hurt Brer Rabbit as badly as he could.\nSo he caught him by the hind legs, and flung him\nright into the middle of the briar [patch].',
        art: [['rabbit', 126, 168, 0.85, { jacket: true, noShadow: true, rot: 185 }], ['briar', 120, 320, 1.9], ['fox', 240, 318, 1.15, { flip: true, happy: true }]],
        after: { text: 'There was a great flutter in the bushes where Brer Rabbit landed,\nand Brer Fox hung around to see what would happen.' }
      },
      {
        bg: 'hill', text: 'By and by, somebody called Brer Fox. Way up the hill sat Brer Rabbit on a [log],\ncombing the tar out of his fur with a chip.\n"Bred and born in a briar patch, Brer Fox! Bred and born in a briar patch!"\nAnd he skipped off, as lively as a cricket in the embers.',
        art: [['log', 150, 170, 1.3], ['rabbit', 140, 144, 0.85, { jacket: true, laugh: true, noShadow: true }], ['briar', 240, 346, 1.1], ['fox', 72, 334, 1.1, { cross: true }]]
      }
    ]
  },
  {
    id: 'owl', shelf: 'big', cloth: '#5a3550', verse: true,
    title: 'The Owl and the Pussy-Cat',
    byline: 'by Edward Lear',
    source: 'From Nonsense Songs (1871), Project Gutenberg eBook #13647. The words are Lear\'s own.',
    cover: { bg: 'nightsea', art: [['moon', 240, 110, 0.7], ['boatsail', 150, 268, 1.6], ['owl', 110, 252, 0.8, { noShadow: true }], ['cat', 185, 254, 0.75, { noShadow: true }], ['boat', 150, 290, 1.6]] },
    pages: [
      {
        bg: 'sea', text: 'The Owl and the Pussy-Cat went to [sea]\nIn a beautiful pea-green [boat]:\nThey took some honey, and plenty of money\nWrapped up in a five-pound note.',
        art: [['boatsail', 150, 268, 1.6], ['owl', 110, 252, 0.8, { noShadow: true }], ['cat', 185, 254, 0.75, { noShadow: true }], ['boat', 150, 290, 1.6]]
      },
      {
        bg: 'nightsea', text: 'The Owl looked up to the stars above,\nAnd sang to a small guitar,\n"O lovely Pussy, O Pussy, my [love],\nWhat a beautiful Pussy you are,\nYou are,\nYou are!\nWhat a beautiful Pussy you are!"',
        art: [['hearts', 200, 196, 0.75], ['notes', 92, 188, 0.5], ['star', 60, 80, 0.22], ['star', 240, 60, 0.28], ['star', 200, 130, 0.18], ['owl', 105, 262, 1, { noShadow: true }], ['fiddle', 140, 262, 0.55, { noShadow: true, rot: 10 }], ['cat', 205, 262, 0.85, { noShadow: true, happy: true }], ['boat', 150, 292, 1.75]]
      },
      {
        bg: 'nightsea', text: 'Pussy said to the Owl, "You elegant fowl,\nHow charmingly sweet you sing!\nOh! let us be married; too long we have tarried:\nBut what shall we do for a [ring]?"',
        art: [['ring', 225, 130, 0.55], ['owl', 100, 262, 1, { noShadow: true }], ['cat', 195, 262, 0.85, { noShadow: true }], ['boat', 150, 292, 1.75]]
      },
      {
        bg: 'day', text: 'They sailed away, for a year and a day,\nTo the land where the bong-tree grows;\nAnd there in a wood a Piggy-wig stood,\nWith a ring at the end of his [nose],\nHis nose,\nHis nose,\nWith a ring at the end of his nose.',
        art: [['bongtree', 70, 300, 2.3], ['bongtree', 250, 290, 1.8], ['pig', 165, 318, 1.5, { ring: true }]]
      },
      {
        bg: 'hill', text: '"Dear [Pig], are you willing to sell for one shilling\nYour ring?" Said the Piggy, "I will."\nSo they took it away, and were married next day\nBy the Turkey who lives on the [hill].',
        art: [['turkey', 150, 160, 0.8], ['owl', 70, 330, 0.85], ['pig', 160, 334, 0.75, { ring: true }], ['cat', 238, 332, 0.75, { flip: true }]]
      },
      {
        bg: 'nightbeach', text: 'They dined on mince and slices of quince,\nWhich they ate with a runcible [spoon];\nAnd hand in hand, on the edge of the sand,\nThey danced by the light of the [moon],\nThe moon,\nThe moon,\nThey danced by the light of the moon.',
        art: [['moon', 150, 150, 1.1], ['owl', 112, 322, 1.15], ['cat', 192, 322, 1.05, { happy: true }], ['spoon', 252, 334, 0.75, { legs: false, rot: 14 }]]
      }
    ],
    end: { bg: 'nightsea', art: [['moon', 150, 190, 1.2], ['star', 60, 80, 0.25], ['star', 250, 70, 0.3]] }
  },
  {
    id: 'pip', shelf: 'big', cloth: '#2e5e63',
    title: 'Pip and the Word Tree',
    byline: 'A story about words that come true',
    source: 'A new story for this library.',
    cover: { bg: 'garden', art: [['wordtree', 160, 318, 2.6], ['pip', 70, 330, 0.95]] },
    pages: [
      { bg: 'garden', text: 'At the end of Pip\'s garden there was a little green door.\nOne morning, the door was open.\nSo Pip went [in].', art: [['door', 150, 300, 2.8, { noShadow: true }], ['pip', 150, 302, 0.95, { back: true, noShadow: true }], ['arrow', 150, 360, 0.6, { up: true }]] },
      {
        bg: 'garden', text: 'Inside grew a tree. But it did not grow apples or pears.\nIt grew words!\nPip picked one. It said [cat].',
        art: [['wordtree', 160, 318, 2.6, { words: ['hat', 'sun', 'bug', 'jam', 'bed'] }], ['pip', 60, 330, 0.95, { tag: 'cat' }]],
        after: { text: 'Pop! Out jumped a cat!', art: [['wordtree', 160, 318, 2.6, { words: ['hat', 'sun', 'bug', 'jam', 'bed'] }], ['pip', 60, 330, 0.95], ['cat', 228, 334, 0.9, { pop: true }]] }
      },
      {
        bg: 'garden', text: 'Pip picked another word. It said [hat].',
        art: [['wordtree', 160, 318, 2.6, { words: ['sun', 'bug', 'jam', 'bed'] }], ['pip', 60, 330, 0.95, { tag: 'hat' }], ['cat', 228, 334, 0.9]],
        after: { text: 'Pop! A hat landed on the cat.', art: [['wordtree', 160, 318, 2.6, { words: ['sun', 'bug', 'jam', 'bed'] }], ['pip', 60, 330, 0.95], ['cat', 228, 334, 0.9, { hat: true, happy: true, pop: true }]] }
      },
      {
        bg: 'garden', text: 'The next word said [sun].',
        art: [['wordtree', 160, 318, 2.6, { words: ['bug', 'jam', 'bed'] }], ['pip', 60, 330, 0.95, { tag: 'sun' }], ['cat', 228, 334, 0.9, { hat: true }]],
        after: { text: 'Pop! Out came the sun, warm and yellow.', art: [['sun', 245, 80, 0.75, { pop: true }], ['wordtree', 160, 318, 2.6, { words: ['bug', 'jam', 'bed'] }], ['pip', 60, 330, 0.95], ['cat', 228, 334, 0.9, { hat: true, happy: true }]] }
      },
      {
        bg: 'garden', text: 'Then Pip found a tiny word. It said [bug].',
        art: [['pip', 132, 330, 1.9, { tag: 'bug' }]],
        after: { text: 'Pop! A little red bug landed on Pip\'s nose.\nA-a-a-CHOO!', art: [['pip', 150, 330, 1.9, { sneeze: true }], ['bug', 151, 243, 0.22, { noShadow: true, pop: true }]] }
      },
      {
        bg: 'garden', text: 'Pip felt hungry. The next word said [jam].',
        art: [['wordtree', 160, 318, 2.6, { words: ['bed'] }], ['pip', 60, 330, 0.95, { tag: 'jam' }], ['cat', 238, 334, 0.9, { hat: true }]],
        after: { text: 'Pop! A jar of jam, sticky and sweet. Yum!', art: [['wordtree', 160, 318, 2.6, { words: ['bed'] }], ['pip', 60, 330, 0.95], ['jam', 122, 338, 0.62, { pop: true }], ['cat', 238, 334, 0.9, { hat: true, happy: true }]] }
      },
      {
        bg: 'night', text: 'The sun went down, and Pip gave a big yawn.\nThere was one last word on the tree.\nIt said [bed].',
        art: [['moon', 240, 100, 0.6], ['wordtree', 160, 318, 2.6, { words: [] }], ['pip', 60, 330, 0.95, { tag: 'bed' }]],
        after: { text: 'Pop! A little bed, as soft as moss.\nGoodnight, Pip.', art: [['moon', 240, 100, 0.6], ['bed', 150, 318, 2, { pip: true, pop: true }]] }
      }
    ]
  },
  {
    id: 'pigs', shelf: 'big', cloth: '#a4472f',
    title: 'The Three Little Pigs',
    byline: 'Retold from an old English folk tale',
    source: 'After the telling in Joseph Jacobs\' English Fairy Tales (1890), Project Gutenberg eBook #7439, without the turnips, the apples and the fair. Jacobs\' second pig builds with furze; here it is sticks.',
    cover: { bg: 'day', art: [['house', 150, 300, 1.7, { kind: 'brick', smoke: true }], ['pig', 58, 332, 0.6], ['pig', 245, 334, 0.6, { flip: true }]] },
    pages: [
      { bg: 'day', text: 'Once upon a time there were three little [pigs].\nOne day they set off to build houses of their own.', art: [['pig', 65, 322, 0.8], ['pig', 155, 326, 0.8], ['pig', 245, 330, 0.8]] },
      { bg: 'day', text: 'The first little pig built a house of [straw].\nHe was done in no time at all.', art: [['house', 100, 316, 1.75, { kind: 'straw' }], ['bale', 212, 334, 0.6], ['pig', 262, 334, 0.6, { flip: true }]] },
      {
        bg: 'day', text: 'Along came a big bad [wolf].\n"Little pig, little pig, let me come in!"\n"No, no! Not by the hair of my chinny chin [chin]!"',
        art: [['house', 92, 318, 1.9, { kind: 'straw' }], ['wolf', 236, 330, 1.25, { flip: true }], ['say', 172, 236, 0.95, { art: [['pighead', 50, 80, 0.6]] }]]
      },
      {
        bg: 'day', text: '"Then I\'ll [huff], and I\'ll [puff],\nand I\'ll blow your house in!"',
        art: [['house', 92, 318, 1.9, { kind: 'straw' }], ['gust', 164, 270, 0.7, { flip: true }], ['wolf', 230, 326, 1.3, { flip: true, blow: true }]],
        after: {
          text: 'So he huffed, and he puffed, and he blew the house in,\nand he ate up the little pig.',
          art: [['house', 108, 326, 1.9, { kind: 'straw', down: true }], ['wolf', 230, 326, 1.3, { flip: true }]]
        }
      },
      {
        bg: 'day', text: 'The second little pig built a house of sticks.\n"Little pig, little pig, let me come in!"\n"No, no! Not by the hair of my chinny chin [chin]!"',
        art: [['house', 92, 318, 1.9, { kind: 'sticks' }], ['wolf', 236, 330, 1.25, { flip: true }], ['say', 172, 236, 0.95, { art: [['pighead', 50, 80, 0.6]] }]]
      },
      {
        bg: 'day', text: '"Then I\'ll [huff], and I\'ll [puff],\nand I\'ll blow your house in!"',
        art: [['house', 92, 318, 1.9, { kind: 'sticks' }], ['gust', 164, 270, 0.7, { flip: true }], ['wolf', 230, 326, 1.3, { flip: true, blow: true }]],
        after: {
          text: 'So he huffed, and he puffed, and he blew the house in,\nand he ate up the second little pig, too.',
          art: [['house', 108, 326, 1.9, { kind: 'sticks', down: true }], ['wolf', 230, 326, 1.3, { flip: true }]]
        }
      },
      {
        bg: 'day', text: 'The third little pig built his house of [red] bricks.\n"Little pig, little pig, let me come in!"\n"No, no! Not by the hair of my chinny chin chin!"',
        art: [['house', 92, 318, 1.9, { kind: 'brick', smoke: true }], ['wolf', 230, 326, 1.3, { flip: true }]]
      },
      {
        bg: 'day', text: '"Then I\'ll huff, and I\'ll puff, and I\'ll blow your house in!"\nWell, he huffed, and he [puffed], and he puffed and he huffed,\nbut he could not get the house down.',
        art: [['house', 92, 318, 1.9, { kind: 'brick' }], ['gust', 164, 270, 0.7, { flip: true }], ['wolf', 230, 326, 1.3, { flip: true, blow: true }], ['drops', 236, 196, 0.45]]
      },
      {
        bg: 'indoor', text: 'The wolf was very angry. "I will come down the chimney and eat you up!"\nSo the little pig hung a big [pot] of water on a blazing fire.',
        art: [['pot', 140, 332, 1.7], ['pig', 255, 336, 0.6, { flip: true }]],
        after: {
          text: 'Just as the wolf was coming down, the pig took off the lid,\nand in fell the wolf. SPLASH!',
          art: [['wolf', 140, 168, 0.95, { rot: 180, noShadow: true }], ['pot', 140, 332, 1.7], ['splash', 140, 252, 0.8, { pop: true }], ['pig', 255, 336, 0.6, { flip: true }]]
        }
      },
      {
        bg: 'indoor', text: 'The little pig put the lid on again, and boiled him up,\nand [ate] him for supper.\nAnd he lived happily ever after.',
        art: [['pot', 82, 332, 1.45, { lid: true }], ['bowl', 172, 348, 0.6], ['pig', 238, 340, 0.85, { flip: true }]]
      }
    ],
    end: { bg: 'day', art: [['house', 150, 300, 1.7, { kind: 'brick', smoke: true }], ['pig', 245, 334, 0.6, { flip: true }]] }
  },
  {
    id: 'goats', shelf: 'big', cloth: '#45607a',
    title: 'The Three Billy Goats Gruff',
    byline: 'Retold from a Norwegian folk tale',
    source: 'After the translation by George Webbe Dasent in Popular Tales from the Norse (1859), Project Gutenberg eBook #8933. The big billy goat\'s rhyme is Dasent\'s own.',
    cover: { bg: 'river', art: [['troll', 150, 345, 1.15, { noShadow: true }], ['bridge', 150, 330, 2.9], ['goat', 150, 212, 0.75]] },
    pages: [
      {
        bg: 'hill', text: 'Once upon a time there were three billy goats,\nand the name of all three was Gruff.\nThey wanted to go up the [hill] to eat the sweet green grass.',
        art: [['goat', 62, 330, 0.55], ['goat', 142, 336, 0.8], ['goat', 238, 344, 1.1]]
      },
      {
        bg: 'river', text: 'On the way there was a bridge over a river.\nUnder the bridge lived a great ugly [Troll],\nwith eyes as big as saucers and a nose as long as a poker.',
        art: [['troll', 150, 345, 1.15, { noShadow: true }], ['bridge', 150, 330, 2.9]]
      },
      {
        bg: 'river', text: 'First came the littlest billy goat Gruff.\n[Trip], trap! Trip, trap! went the bridge.',
        art: [['troll', 150, 345, 1.15, { noShadow: true }], ['bridge', 150, 330, 2.9], ['goat', 100, 213, 0.6], ['sound', 100, 218, 0.7]]
      },
      {
        bg: 'river', text: '"WHO is that tripping over my bridge?" roared the Troll.\n"Now I\'m coming to gobble you [up]!"',
        art: [['bridge', 150, 330, 2.9], ['goat', 85, 213, 0.6], ['troll', 205, 300, 1.35, { roar: true, noShadow: true }], ['arrow', 266, 266, 0.55, { up: true }]]
      },
      {
        bg: 'river', text: '"Oh, no! Don\'t eat me. I\'m too [little]," said the littlest goat.\n"Wait for the second billy goat Gruff. He\'s much bigger."\n"Well, be off with you!" said the Troll.',
        art: [['bridge', 150, 330, 2.9], ['goat', 92, 213, 0.42], ['troll', 210, 318, 1.6, { noShadow: true }]]
      },
      {
        bg: 'river', text: 'Then came the second billy goat Gruff.\nTRIP, TRAP! TRIP, TRAP! "WHO is that?" roared the Troll.\n"Don\'t [eat] me!" said the second goat.\n"Wait for the big billy goat Gruff."',
        art: [['bridge', 150, 330, 2.9], ['goat', 88, 213, 0.8], ['troll', 210, 332, 1.35, { roar: true, bib: true, noShadow: true }], ['cutlery', 270, 262, 0.48]]
      },
      {
        bg: 'river', text: 'Then came the big billy goat Gruff.\nTRIP, TRAP! TRIP, TRAP!\nThe bridge creaked and groaned, for he was so [big].',
        art: [['troll', 150, 345, 1.15, { noShadow: true }], ['bridge', 150, 330, 2.9], ['goat', 150, 212, 1.15]]
      },
      {
        bg: 'river', text: '"WHO is that tramping over my bridge?" roared the Troll.\n"It is I, the big billy goat Gruff!"\n"Now I\'m coming to gobble you [up]!"',
        art: [['bridge', 150, 330, 2.9], ['goat', 96, 213, 1.1], ['troll', 222, 300, 1.3, { roar: true, noShadow: true }], ['arrow', 266, 266, 0.55, { up: true }]]
      },
      {
        bg: 'river', text: '"Well, come along! I\'ve got two spears,\nAnd I\'ll poke your eyeballs out at your ears;\nI\'ve got besides two curling-stones,\nAnd I\'ll crush you to bits,\nbody and [bones]."',
        art: [['bridge', 150, 330, 2.9], ['goat', 92, 213, 1.15, { rot: 8 }], ['troll', 232, 332, 1.25, { roar: true, noShadow: true }], ['say', 184, 128, 0.95, { art: [['bones', 50, 76, 0.6]] }]]
      },
      {
        bg: 'river', text: 'And he flew at the Troll. [Bump]!',
        art: [['bridge', 150, 330, 2.9], ['burst', 204, 214, 0.95], ['goat', 150, 213, 1.15, { rot: 8 }], ['troll', 236, 250, 1.1, { roar: true, rot: 35, noShadow: true }]],
        after: {
          text: 'He poked his eyes out with his horns,\nand crushed him to bits, body and bones,\nand tossed him out into the river.',
          art: [['bridge', 150, 330, 2.9], ['splash', 150, 362, 1.5, { pop: true }], ['goat', 150, 212, 1.15, { happy: true }]]
        }
      },
      {
        bg: 'hill', text: 'Then the three billy goats went up the hill.\nThey ate and ate, until they were so [fat]\nthey could hardly walk home again.',
        art: [['sun', 245, 95, 0.7], ['goat', 62, 330, 0.6, { fat: true, happy: true }], ['goat', 142, 338, 0.85, { fat: true, happy: true }], ['goat', 238, 346, 1.12, { fat: true, happy: true }]],
        after: { text: 'Snip, snap, snout.\nThis tale\'s told out.' }
      }
    ]
  },
  {
    id: 'race', shelf: 'big', cloth: '#5e6b2a',
    title: 'The Tortoise and the Hare',
    byline: 'A fable by Aesop',
    source: 'Retold from The Aesop for Children (1919), Project Gutenberg eBook #19994.',
    cover: { bg: 'day', art: [['flag', 250, 290, 0.8], ['rabbit', 95, 318, 1.3, { hare: true, laugh: true }], ['tortoise', 205, 324, 1.05]] },
    pages: [
      {
        bg: 'day', text: 'Hare could run very fast. One day he was making fun of Tortoise.\n"You are so [slow]!" he said. "Do you ever get anywhere?"',
        art: [['rabbit', 82, 320, 1.35, { hare: true, laugh: true }], ['snail', 168, 340, 0.42, { flip: true }], ['tortoise', 236, 326, 0.95, { flip: true }]]
      },
      {
        bg: 'day', text: '"Yes, I do," said Tortoise.\n"I will [run] a race with you, and you will see."\nHare laughed and laughed.',
        art: [['tortoise', 78, 330, 1.1], ['rabbit', 244, 330, 1.05, { hare: true, laugh: true }], ['think', 148, 218, 1.35, { art: [['flag', 80, 72, 0.5], ['lines', 28, 62, 0.42], ['tortoise', 52, 70, 0.5]] }]]
      },
      {
        bg: 'day', text: 'Fox was the judge. He set a flag at the end of the race.\n"Ready, steady... [go]!"',
        art: [['fox', 222, 300, 1.05, { flip: true }], ['flag', 168, 302, 0.85, { color: '#86a456' }], ['alarm', 252, 196, 0.5], ['rabbit', 62, 326, 0.95, { hare: true }], ['tortoise', 128, 336, 0.8], ['dust', 40, 344, 0.5]]
      },
      {
        bg: 'day', text: 'Off ran Hare, as fast as the wind.\nOff went Tortoise, one slow [step] at a time.',
        art: [['rabbit', 250, 292, 0.7, { hare: true }], ['steps', 58, 350, 0.95], ['tortoise', 150, 336, 1.05]]
      },
      {
        bg: 'day', text: 'Hare was so far ahead that he lay down under a tree.\n"I have lots of time," he said.\n"I will have a little [nap]."',
        art: [['tree', 150, 300, 2.3, { seed: 5 }], ['rabbit', 160, 330, 1.1, { hare: true, sleep: true }], ['zzz', 214, 250, 0.6]]
      },
      {
        bg: 'day', text: 'But Tortoise did not stop.\nStep, step, step. On and on he went,\nright [past] the sleeping Hare.',
        art: [['tree', 100, 300, 2.1, { seed: 5 }], ['rabbit', 100, 330, 1, { hare: true, sleep: true }], ['zzz', 146, 254, 0.45], ['arrow', 168, 352, 0.85], ['tortoise', 240, 340, 0.9]]
      },
      {
        bg: 'day', text: 'At last Hare woke [up].\nWhere was Tortoise? He was nearly at the flag!',
        art: [['tree', 75, 296, 1.7, { seed: 5 }], ['rabbit', 85, 330, 1.05, { hare: true }], ['alarm', 85, 232, 0.6], ['flag', 262, 288, 0.75], ['tortoise', 222, 292, 0.45]]
      },
      {
        bg: 'day', text: 'Hare ran as fast as he could.\nBut it was too late. Tortoise had [won]!',
        art: [['flag', 150, 300, 1.15], ['tortoise', 150, 332, 1.05, { happy: true }], ['rosette', 150, 282, 0.42], ['fox', 255, 320, 0.9, { flip: true, happy: true }], ['rabbit', 48, 326, 0.85, { hare: true }]],
        after: { text: 'Slow and steady wins the race.' }
      }
    ]
  },
  {
    id: 'frog', shelf: 'big', cloth: '#2f5e4a',
    title: 'The Frog Prince',
    byline: 'Retold from a German folk tale',
    source: 'After "The Frog-King, or Iron Henry" in the Brothers Grimm\'s Household Tales, translated by Margaret Hunt (1884), Project Gutenberg eBook #5314. As in the Grimms\' telling, the princess throws the frog against the wall; there is no kiss.',
    cover: { bg: 'wood', art: [['well', 150, 330, 1.9], ['frog', 150, 276, 0.8, { crown: true, noShadow: true }], ['ball', 232, 342, 0.5]] },
    pages: [
      {
        bg: 'garden', text: 'In the old days, when wishing still helped, there lived a king\nwhose youngest daughter was so lovely that the [sun] itself,\nwhich has seen so much, was astonished\nwhenever it shone on her face.',
        art: [['sun', 220, 128, 1.15, { wow: true }], ['princess', 110, 338, 2.2]]
      },
      {
        bg: 'wood', text: 'Near the castle was a great dark wood,\nand under an old tree in the wood was a [well].\nWhen the day was hot, the princess sat by the cool well,\nand threw her golden ball up high, and caught it.',
        art: [['tree', 236, 262, 1.7, { seed: 9 }], ['well', 188, 336, 1.7], ['princess', 72, 338, 1.8, { arms: 'up' }], ['ball', 72, 160, 0.85, { noShadow: true }]]
      },
      {
        bg: 'wood', text: 'But one day the ball fell, and rolled straight into the well,\nand the well was so deep that the bottom could not be seen.\nThe princess began to [cry].',
        art: [['tree', 236, 262, 1.7, { seed: 9 }], ['well', 188, 336, 1.7], ['splash', 188, 284, 0.45], ['princess', 76, 338, 1.85, { cry: true }], ['drops', 76, 232, 0.4]]
      },
      {
        bg: 'wood', text: '"What is the matter, princess?" said a voice.\nShe looked round, and there was a [frog],\nstretching his thick, ugly head out of the water.\n"I can help you. But what will you give me if I bring your ball back?"',
        art: [['tree', 236, 262, 1.7, { seed: 9 }], ['well', 188, 336, 1.7], ['frog', 188, 290, 0.85, { noShadow: true }], ['princess', 72, 338, 1.8, { mouth: 'o' }]]
      },
      {
        bg: 'wood', text: '"Whatever you like, dear frog," she said.\n"My clothes, my pearls and jewels,\nand even the golden [crown] I am wearing!"',
        art: [['well', 210, 336, 1.5], ['frog', 210, 296, 0.75, { noShadow: true }], ['princess', 92, 338, 1.9, { arms: 'offer', crown: false }], ['crown', 92, 262, 0.62]]
      },
      {
        bg: 'wood', text: '"I don\'t want your clothes, or your jewels, or your crown," said the frog.\n"But if you will let me eat from your little golden plate,\nand drink from your little [cup], and sleep in your little [bed],\nI will bring your ball back up again."',
        art: [
          ['well', 188, 336, 1.7], ['frog', 188, 290, 0.85, { noShadow: true }], ['princess', 58, 338, 1.6],
          ['think', 148, 214, 1.75, { tail: 'right', art: [['plate', 22, 72, 0.3], ['cup', 44, 66, 0.4], ['bed', 72, 68, 0.44]] }]
        ]
      },
      {
        bg: 'wood', text: '"Oh yes, I promise," said the princess.\nBut she thought, "How the silly frog does talk!"\nDown dived the frog, and soon he came up again\nwith the [ball] in his mouth.',
        art: [['well', 188, 336, 1.7], ['splash', 188, 284, 0.4], ['frog', 188, 290, 0.85, { noShadow: true }], ['ball', 188, 286, 0.62, { noShadow: true }], ['princess', 72, 338, 1.8, { mouth: 'grin' }]]
      },
      {
        bg: 'wood', text: 'She picked up her golden ball, and [ran] home with it.\n"Wait, wait! Take me with you!" croaked the frog. "I can\'t run as fast as you!"\nBut she did not listen, and soon forgot all about the poor frog.',
        art: [['well', 52, 336, 1.1], ['frog', 52, 306, 0.5, { noShadow: true }], ['lines', 150, 280, 0.9], ['princess', 222, 338, 1.75, { rot: 12, arms: 'hold' }], ['ball', 230, 252, 0.4, { noShadow: true }], ['dust', 186, 348, 0.6]]
      },
      {
        bg: 'hall', text: 'Next day, as she sat at dinner with the king,\nsomething came creeping up the marble stairs, splish splash, splish splash.\nIt knocked, and cried, "Princess, youngest princess,\nopen the [door] for me!"',
        art: [['castledoor', 150, 330, 2.5], ['steps', 60, 354, 0.9], ['frog', 150, 342, 0.7], ['sound', 150, 300, 0.9]]
      },
      {
        bg: 'hall', text: 'She opened the door, and there sat the frog! She slammed it shut.\n"My child, what are you so afraid of?" asked the [king].\nWhen she told him, he said, "What you have promised, you must do.\nGo and let him in."',
        art: [['princess', 72, 300, 1.6, { mouth: 'o' }], ['king', 214, 300, 1.8, { arms: 'point', flip: true }], ['table', 150, 346, 2.4, { plates: 2 }]]
      },
      {
        bg: 'hall', text: 'So the frog hopped in, and up onto the table,\nand ate from her little golden [plate].\nBut every mouthful she took nearly choked her.',
        art: [['princess', 82, 300, 1.6, { mouth: 'sad' }], ['table', 150, 346, 2.4], ['plate', 196, 240, 0.85], ['frog', 210, 228, 0.6, { noShadow: true }]]
      },
      {
        bg: 'hall', text: 'That night the frog crept to her bed and said,\n"Lift me up, or I will tell your father!"\nThen she was terribly angry. She picked him up,\nand threw him with all her might against the [wall].',
        art: [['princess', 78, 338, 1.95, { arms: 'throw', cross: true }], ['lines', 170, 210, 0.75], ['burst', 254, 196, 0.85], ['frog', 252, 190, 0.55, { rot: 80, noShadow: true }]],
        after: {
          text: 'But when he fell down, he was no frog,\nbut a king\'s son with beautiful, kind eyes.',
          art: [['princess', 82, 338, 1.95, { mouth: 'o' }], ['sparkle', 206, 170, 0.9, { pop: true }], ['prince', 206, 338, 2, { pop: true }]]
        }
      },
      {
        bg: 'day', text: 'Next morning a carriage came, with eight white horses,\nand behind it stood the prince\'s servant, Faithful Henry.\nWhen his master was turned into a frog, Henry had been so sad\nthat he had three iron bands put round his [heart],\nto keep it from bursting with grief.',
        art: [['henry', 88, 338, 2.1], ['ironheart', 214, 236, 1.05]]
      },
      {
        bg: 'day', text: 'As they drove away, something behind them went [crack]!\n"Henry, the carriage is breaking!"\n"No, master, it is only a band from my heart."\nCrack! Crack! went the other two, for his master was free, and happy.',
        art: [['horse', 250, 330, 1.05], ['coach', 128, 334, 1.65], ['henry', 48, 296, 1.05, { arms: 'up' }], ['ironheart', 112, 120, 0.75, { n: 2, crack: true }], ['crack', 196, 112, 0.5]]
      }
    ],
    end: { bg: 'garden', art: [['prince', 110, 330, 1.9], ['princess', 190, 330, 1.9], ['hearts', 150, 140, 0.7]] }
  },
  {
    id: 'rose', shelf: 'big', cloth: '#8a3b4f',
    title: 'Briar Rose',
    byline: 'Retold from a German folk tale',
    source: 'After "Briar-Rose" in the Brothers Grimm\'s Household Tales, translated by Margaret Hunt (1884), Project Gutenberg eBook #5314. It is the story better known as Sleeping Beauty.',
    cover: { bg: 'day', art: [['castle', 150, 250, 1.6], ['hedge', 62, 350, 1.4, { roses: true }], ['hedge', 238, 350, 1.4, { roses: true }], ['hedge', 150, 362, 1.5, { roses: true }]] },
    pages: [
      {
        bg: 'pond', text: 'A long time ago there lived a king and a queen who said every day,\n"Ah, if only we had a child!"\nOne day, as the queen was bathing, a [frog] crept out of the water,\nand said, "Before a year has gone by, you shall have a daughter."',
        art: [['queen', 62, 300, 1.7, { mouth: 'o' }], ['lily', 204, 330, 1.3], ['frog', 204, 320, 0.9, { noShadow: true }], ['say', 222, 236, 1.05, { art: [['cradle', 50, 72, 0.55]] }]]
      },
      {
        bg: 'hall', text: 'It came true, and the king was so happy that he held a great feast.\nThere were thirteen Wise Women in the kingdom,\nbut he had only twelve golden [plates] for them to eat from,\nso one of them had to stay at home.',
        art: [['king', 150, 268, 1.45], ['table', 150, 344, 2.9, { plates: 12 }], ['wise', 268, 344, 0.95, { wicked: true }]]
      },
      {
        bg: 'hall', text: 'When the feast was over, the Wise Women gave the [baby] their magic gifts:\none gave goodness, another beauty, a third riches,\nand so on, with everything in the world one could wish for.',
        art: [['wise', 58, 330, 1.6, { arms: 'reach' }], ['wise', 242, 330, 1.6, { arms: 'reach', flip: true, col: '#b4677f', hood: '#9c5670' }], ['cradle', 150, 340, 1.35], ['sparkle', 150, 240, 0.75]]
      },
      {
        bg: 'hall', text: 'When eleven had spoken, in came the thirteenth, angry at being left out.\nWithout a word of greeting, she cried out,\n"In her fifteenth year, the king\'s daughter shall prick herself\nwith a [spindle], and fall down dead!"',
        art: [['cradle', 70, 342, 1.2], ['wise', 196, 340, 1.95, { wicked: true, arms: 'up' }], ['spindle', 235, 236, 0.85, { rot: 12, noShadow: true }]],
        after: {
          text: 'The twelfth Wise Woman could not undo it, but she could make it softer.\n"It shall not be death," she said,\n"but a deep sleep of a hundred years."',
          art: [['cradle', 70, 342, 1.2], ['zzz', 80, 250, 0.55, { pop: true }], ['wise', 196, 340, 1.95, { arms: 'reach', flip: true }], ['sparkle', 130, 230, 0.6, { pop: true }]]
        }
      },
      {
        bg: 'day', text: 'So the king gave orders that every spindle in the whole kingdom\nshould be thrown on the [fire] and burnt.',
        art: [['king', 70, 338, 1.85, { arms: 'point' }], ['spindle', 180, 330, 0.62, { rot: -50, noShadow: true }], ['fire', 210, 340, 1.5], ['spindle', 236, 318, 0.62, { rot: 40, noShadow: true }]]
      },
      {
        bg: 'day', text: 'On the very day she turned fifteen, the princess was left alone in the castle.\nShe looked into every room, and at last she came to an old [tower].\nShe climbed the winding stairs, and opened a little door.',
        art: [['tower', 196, 338, 2.85], ['princess', 76, 340, 1.75]]
      },
      {
        bg: 'hall', text: 'There sat an old woman with a spindle, busily spinning.\nThe princess took the spindle, for she wanted to spin too.\nBut she pricked her finger,\nand fell down on the [bed] in a deep sleep.',
        art: [['oldwoman', 52, 330, 1.55], ['bed', 186, 330, 1.9, { princess: true }], ['spindle', 108, 348, 0.55, { rot: 80, noShadow: true }], ['zzz', 196, 212, 0.55]]
      },
      {
        bg: 'day', text: 'And the whole castle fell asleep with her: the king and queen in the hall,\nthe horses in the stable, the [dogs] in the yard, the flies on the wall.\nEven the cook, who was just going to pull the kitchen boy\'s hair,\nlet him go, and fell asleep.',
        art: [['castle', 150, 262, 1.35], ['dog', 92, 340, 1.25], ['dog', 210, 340, 1.25, { flip: true }], ['zzz', 116, 228, 0.6], ['zzz', 236, 228, 0.6]]
      },
      {
        bg: 'day', text: 'Round the castle there grew a hedge of [thorns],\nhigher every year, until nothing of the castle could be seen,\nnot even the flag on the roof.',
        art: [['castle', 150, 250, 1.35], ['hedge', 150, 350, 2.85]]
      },
      {
        bg: 'day', text: 'From time to time a king\'s son came, and tried to get through.\nBut the thorns held fast together, as if they had hands,\nand the princes were caught, and [stuck] fast,\nand died a miserable death.',
        art: [['hedge', 52, 330, 1.5], ['hedge', 248, 330, 1.5], ['prince', 150, 318, 1.75, { arms: 'up', mouth: 'sad', crown: false, hat: '#c0462f' }], ['hedge', 150, 384, 2.1]]
      },
      {
        bg: 'garden', text: 'After a hundred years, another king\'s son came. "I am not afraid," he said.\nAnd when he came near, the hedge was nothing but big, beautiful [roses],\nwhich parted to let him through.',
        art: [['hedge', 62, 346, 1.55, { roses: true }], ['hedge', 238, 346, 1.55, { roses: true }], ['prince', 150, 340, 1.75]]
      },
      {
        bg: 'hall', text: 'All was so still that he could hear himself breathe.\nAt last he came to the little room in the tower, and there lay Briar Rose,\nso lovely that he could not turn his eyes away.\nHe bent down and gave her a [kiss].',
        art: [['bed', 136, 332, 2, { princess: true }], ['prince', 244, 338, 1.75, { rot: -14 }], ['hearts', 150, 214, 0.35, { one: true }]],
        after: {
          text: 'And Briar Rose opened her eyes, and woke,\nand looked at him quite sweetly.',
          art: [['bed', 136, 332, 2, { princess: 'awake' }], ['prince', 244, 338, 1.75], ['hearts', 186, 178, 0.6, { pop: true }]]
        }
      },
      {
        bg: 'hall', text: 'Then the whole castle woke up. The horses shook themselves,\nthe dogs wagged their tails, the fire flickered up and cooked the meat,\nand the cook gave the kitchen boy such a box on the [ear]\nthat he screamed.',
        art: [['cook', 100, 338, 1.9, { arms: 'reach', cross: true }], ['pip', 218, 340, 1.5, { shirt: '#c9a24a', ear: true }], ['burst', 192, 262, 0.32], ['alarm', 218, 236, 0.55]],
        after: {
          text: 'And then the prince and Briar Rose were married with all splendour,\nand they lived contented to the end of their days.',
          bg: 'garden', art: [['prince', 105, 338, 1.9], ['princess', 195, 338, 1.9], ['hearts', 150, 148, 0.75, { pop: true }]]
        }
      }
    ],
    end: { bg: 'day', art: [['castle', 150, 300, 1.9], ['hedge', 40, 350, 1, { roses: true }], ['hedge', 260, 350, 1, { roses: true }]] }
  },
  {
    id: 'aurora-lullaby', shelf: 'big', cloth: '#86536b',
    title: 'Sleeping Beauty: The Forest Dance',
    byline: 'Aurora meets Prince Phillip',
    source: 'Retold from the forest meeting in Disney’s Sleeping Beauty (1959).',
    cover: { bg: 'wood', art: [['aurora', 105, 327, 1.85, { arms: 'reach' }], ['owlprince', 208, 306, 1.25]] },
    pages: [
      { bg: 'wood', text: 'Deep in the woods, Aurora sang about the young man in her dream.\nPrince Phillip heard her [song] through the trees.', art: [['prince', 240, 250, 0.85, { crown: false }], ['aurora', 90, 323, 1.75], ['notes', 158, 176, 0.95]] },
      { bg: 'wood', text: 'Her animal friends found a red [hat] and cloak that belonged to the prince.\nThey dressed up to give Aurora a partner.', art: [['rabbit', 66, 328, 1], ['owlprince', 178, 319, 2]] },
      { bg: 'wood', text: 'Aurora took hold of the cloak. Round and round she danced with an [owl] peeking out at her.', art: [['aurora', 100, 326, 1.8, { arms: 'reach' }], ['owlprince', 187, 284, 1.4]] },
      { bg: 'wood', text: 'Then someone took the owl’s place. Aurora turned and saw a young [man].\nIt was Phillip! Before she ran home, she told him where they could meet again.', art: [['aurora', 99, 325, 1.8, { arms: 'reach' }], ['prince', 195, 326, 1.85, { crown: false, arms: 'reach', flip: true }]] }
    ]
  },
  {
    id: 'belle', shelf: 'big', cloth: '#91672e',
    title: 'Beauty and the Beast',
    byline: 'A library for Belle',
    source: 'Retold from Disney’s Beauty and the Beast (1991).',
    cover: { bg: 'indoor', art: [['bookcase', 158, 281, 2.14], ['belle', 76, 333, 1.52], ['beast', 219, 334, 1.65]] },
    pages: [
      { bg: 'hall', text: 'The Beast had a surprise for Belle. He led her to a tall [door] in a part of the castle she had never seen.', art: [['castledoor', 165, 295, 2.15], ['beast', 75, 331, 1.6], ['belle', 223, 330, 1.48]] },
      { bg: 'indoor', text: 'Belle shut her [eyes]. The Beast hurried across the dark room and drew back the curtains.', art: [['belle', 143, 325, 2.5, { sleep: true }]] },
      { bg: 'indoor', text: 'When she looked, there were [books] all the way up to the ceiling. Belle turned to take in shelf after shelf.', art: [['bookcase', 110, 296, 2.25], ['bookcase', 216, 252, 1.25], ['belle', 207, 328, 1.45]] },
      { bg: 'indoor', text: 'Belle loved the library. When the Beast saw her [smile], he gave it to her. She could read here whenever she liked.', art: [['bookcase', 148, 268, 1.85], ['beast', 79, 328, 1.6], ['belle', 200, 334, 1.95, { mouth: 'grin' }]] }
    ]
  },
  {
    id: 'aladdin', shelf: 'big', cloth: '#43517d',
    title: 'Aladdin and the Magic Carpet',
    byline: 'A night flight with Jasmine',
    source: 'Retold from Disney’s Aladdin (1992).',
    cover: { bg: 'night', art: [['moon', 219, 136, 0.76], ['aladdin', 105, 264, 1.32], ['jasmine', 185, 264, 1.3], ['carpet', 147, 293, 2.15]] },
    pages: [
      { bg: 'night', text: 'Jasmine looked over the edge of her balcony. There was Aladdin, dressed as a prince, standing on a [rug] that could fly!', art: [['aladdin', 144, 261, 1.6, { arms: 'wave' }], ['carpet', 147, 292, 2.3]] },
      { bg: 'night', text: 'Aladdin held out his [hand]. Jasmine took it and stepped aboard. The carpet lifted them over the palace walls.', art: [['castle', 143, 315, 1.7], ['aladdin', 95, 252, 1.7, { arms: 'reach' }], ['jasmine', 194, 253, 1.62, { arms: 'reach', flip: true }], ['carpet', 147, 277, 2.1]] },
      { bg: 'desert', text: 'Over the desert they flew. Far below them, huge pyramids rose out of the [sand].', art: [['aladdin', 123, 140, 0.8], ['jasmine', 167, 140, 0.8], ['carpet', 146, 156, 1.25]] },
      { bg: 'night', text: 'In China they stopped on a roof. Jasmine leaned close to Aladdin as fireworks burst in the [sky].', art: [['firework', 81, 142, 0.93], ['firework', 217, 122, 0.82], ['firework', 154, 174, 0.55], ['roof', 150, 332, 2.4], ['aladdin', 128, 251, 1], ['jasmine', 170, 251, 1]] }
    ]
  }
];
