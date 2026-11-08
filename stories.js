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
      { bg: 'farm', text: '"Well, then, I will," said the little red hen.\nAnd she [did].', art: [['hen', 105, 312, 1.4], ['wheat', 215, 312, 1, { n: 4 }]] },
      { bg: 'farm', text: 'The wheat grew tall and gold in the [sun].', art: [['sun', 225, 105, 0.95], ['wheat', 95, 315, 1.5], ['wheat', 190, 318, 1.3]] },
      {
        bg: 'farm', text: '"Who will cut the wheat?"\n"[Not] I," said the pig, the cat and the rat.\nSo the little red hen did it all by herself.',
        art: [['pig', 70, 318, 0.85], ['cat', 160, 318, 0.85], ['mouse', 235, 318, 0.9, { rat: true, flip: true }]]
      },
      { bg: 'farm', text: 'She took the wheat to the mill.\nThen she baked a [big] loaf of bread.', art: [['bread', 175, 312, 1.6], ['hen', 70, 318, 0.9]] },
      {
        bg: 'farm', text: '"Who will eat this bread?" said the hen.\n"I [will]!" said the pig, the cat and the rat.',
        art: [['pig', 62, 318, 0.8], ['bread', 140, 324, 0.62], ['cat', 205, 322, 0.8, { happy: true }], ['mouse', 262, 324, 0.75, { rat: true, flip: true }]]
      },
      {
        bg: 'farm', text: '"No, you won\'t," said the little red hen.\n"I will!"\nAnd she [did].',
        art: [['pig', 55, 322, 0.7], ['cat', 245, 322, 0.7, { sad: true }], ['hen', 150, 318, 1.3], ['bread', 205, 318, 0.55]]
      }
    ]
  },
  {
    id: 'briar', shelf: 'big', cloth: '#1f4b3a',
    title: 'Brer Rabbit and the Briar Patch',
    byline: 'Retold from an African American folk tale',
    source: 'A trickster tale from African American storytelling, first written down by Joel Chandler Harris in 1880 (Project Gutenberg eBook #2306). Retold here in plain words, without the dialect or the tar-baby.',
    cover: { bg: 'wood', art: [['rabbit', 150, 262, 1.3, { jacket: true, noShadow: true }], ['briar', 150, 322, 2]] },
    pages: [
      { bg: 'wood', text: 'Brer Rabbit lived in the wood.\nHe could [hop], and he could [run]!', art: [['rabbit', 150, 314, 1.8, { jacket: true }]] },
      { bg: 'wood', text: 'Brer Fox was a sly old [fox].\nHe wanted to catch Brer Rabbit.', art: [['fox', 150, 314, 1.8]] },
      { bg: 'wood', text: 'One day, Brer Rabbit sat down in the [sun]\nand fell fast asleep.', art: [['sun', 225, 100, 0.9], ['rabbit', 130, 314, 1.6, { jacket: true, sleep: true }]] },
      { bg: 'wood', text: 'Brer Fox crept up, and snap!\nHe [got] him!', art: [['rabbit', 95, 316, 1.3, { jacket: true }], ['fox', 210, 316, 1.5, { flip: true, happy: true }]] },
      {
        bg: 'wood', text: '"I will roast you on my [fire]!" said Brer Fox.', art: [['fire', 100, 320, 1.25], ['fox', 220, 316, 1.4, { flip: true }]],
        after: { text: '"Roast me, Brer Fox," said Brer Rabbit,\n"but please don\'t throw me in the briar patch!"' }
      },
      {
        bg: 'wood', text: '"Then I will drown you in the [pond]!" said Brer Fox.', art: [['pond', 105, 326, 1.6], ['fox', 225, 316, 1.4, { flip: true }]],
        after: { text: '"Drown me as deep as you please, Brer Fox," said Brer Rabbit,\n"but please, PLEASE don\'t throw me in the briar patch!"' }
      },
      {
        bg: 'wood', text: '"The briar patch is the worst place of all!" thought Brer Fox.\nSo in went Brer Rabbit.\nBump, bump, [bump]!',
        art: [['rabbit', 126, 168, 0.85, { jacket: true, noShadow: true, rot: 185 }], ['briar', 120, 320, 1.9], ['fox', 240, 318, 1.15, { flip: true, happy: true }]]
      },
      {
        bg: 'wood', text: 'But Brer Rabbit just laughed.\n"I was born and bred in the briar patch, Brer Fox!\nThis is my home!"\nAnd off he went. Hop, hop, [hop]!',
        art: [['rabbit', 120, 250, 1.1, { jacket: true, laugh: true, noShadow: true }], ['briar', 120, 322, 1.9], ['fox', 245, 318, 1.1, { flip: true, cross: true }]]
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
        bg: 'nightsea', text: 'The Owl looked up to the stars above,\nAnd sang to a small guitar,\n"O lovely Pussy, O Pussy, my love,\nWhat a beautiful Pussy you are,\nYou are,\nYou [are]!\nWhat a beautiful Pussy you are!"',
        art: [['star', 60, 80, 0.22], ['star', 240, 60, 0.28], ['star', 200, 130, 0.18], ['owl', 105, 262, 1, { noShadow: true }], ['fiddle', 140, 262, 0.55, { noShadow: true, rot: 10 }], ['cat', 205, 262, 0.85, { noShadow: true, happy: true }], ['boat', 150, 292, 1.75]]
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
      { bg: 'garden', text: 'At the end of Pip\'s garden there was a little green door.\nOne morning, the door was open.\nSo Pip went [in].', art: [['door', 150, 300, 2.8, { noShadow: true }], ['pip', 220, 330, 0.95]] },
      {
        bg: 'garden', text: 'Inside grew a tree. But it did not grow apples or pears.\nIt grew words!\nPip picked one. It said [cat].',
        art: [['wordtree', 160, 318, 2.6, { words: ['cat', 'hat', 'sun', 'bug', 'jam', 'bed'] }], ['pip', 60, 330, 0.95]],
        after: { text: 'Pop! Out jumped a cat!', art: [['wordtree', 160, 318, 2.6, { words: ['hat', 'sun', 'bug', 'jam', 'bed'] }], ['pip', 60, 330, 0.95], ['cat', 228, 334, 0.9, { pop: true }]] }
      },
      {
        bg: 'garden', text: 'Pip picked another word. It said [hat].',
        art: [['wordtree', 160, 318, 2.6, { words: ['hat', 'sun', 'bug', 'jam', 'bed'] }], ['pip', 60, 330, 0.95], ['cat', 228, 334, 0.9]],
        after: { text: 'Pop! A hat landed on the cat.', art: [['wordtree', 160, 318, 2.6, { words: ['sun', 'bug', 'jam', 'bed'] }], ['pip', 60, 330, 0.95], ['cat', 228, 334, 0.9, { hat: true, happy: true, pop: true }]] }
      },
      {
        bg: 'garden', text: 'The next word said [sun].',
        art: [['wordtree', 160, 318, 2.6, { words: ['sun', 'bug', 'jam', 'bed'] }], ['pip', 60, 330, 0.95], ['cat', 228, 334, 0.9, { hat: true }]],
        after: { text: 'Pop! Out came the sun, warm and yellow.', art: [['sun', 245, 80, 0.75, { pop: true }], ['wordtree', 160, 318, 2.6, { words: ['bug', 'jam', 'bed'] }], ['pip', 60, 330, 0.95], ['cat', 228, 334, 0.9, { hat: true, happy: true }]] }
      },
      {
        bg: 'garden', text: 'Then Pip found a tiny word. It said [bug].',
        art: [['pip', 150, 330, 1.9]],
        after: { text: 'Pop! A little red bug landed on Pip\'s nose.\nA-a-a-CHOO!', art: [['pip', 150, 330, 1.9, { sneeze: true }], ['bug', 151, 243, 0.22, { noShadow: true, pop: true }]] }
      },
      {
        bg: 'garden', text: 'Pip felt hungry. The next word said [jam].',
        art: [['wordtree', 160, 318, 2.6, { words: ['jam', 'bed'] }], ['pip', 60, 330, 0.95], ['cat', 238, 334, 0.9, { hat: true }]],
        after: { text: 'Pop! A jar of jam, sticky and sweet. Yum!', art: [['wordtree', 160, 318, 2.6, { words: ['bed'] }], ['pip', 60, 330, 0.95], ['jam', 122, 338, 0.62, { pop: true }], ['cat', 238, 334, 0.9, { hat: true, happy: true }]] }
      },
      {
        bg: 'night', text: 'The sun went down, and Pip gave a big yawn.\nThere was one last word on the tree.\nIt said [bed].',
        art: [['moon', 240, 100, 0.6], ['wordtree', 160, 318, 2.6, { words: ['bed'] }], ['pip', 60, 330, 0.95]],
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
      { bg: 'day', text: 'The first little pig built a house of straw.\nHe was done in no time at [all].', art: [['house', 115, 316, 1.9, { kind: 'straw' }], ['pig', 240, 326, 0.8, { flip: true }]] },
      {
        bg: 'day', text: 'Along came a big bad [wolf].\n"Little pig, little pig, let me come in!"\n"No, no! Not by the hair of my chinny chin [chin]!"',
        art: [['house', 92, 318, 1.9, { kind: 'straw' }], ['wolf', 230, 326, 1.3, { flip: true }]]
      },
      {
        bg: 'day', text: '"Then I\'ll [huff], and I\'ll [puff],\nand I\'ll blow your house in!"',
        art: [['house', 92, 318, 1.9, { kind: 'straw' }], ['wolf', 230, 326, 1.3, { flip: true, blow: true }]],
        after: {
          text: 'So he huffed, and he puffed, and he blew the house in,\nand he ate up the little pig.',
          art: [['house', 108, 326, 1.9, { kind: 'straw', down: true }], ['wolf', 230, 326, 1.3, { flip: true }]]
        }
      },
      {
        bg: 'day', text: 'The second little pig built a house of sticks.\n"Little pig, little pig, let me come in!"\n"No, no! Not by the hair of my chinny chin [chin]!"',
        art: [['house', 92, 318, 1.9, { kind: 'sticks' }], ['wolf', 230, 326, 1.3, { flip: true }]]
      },
      {
        bg: 'day', text: '"Then I\'ll [huff], and I\'ll [puff],\nand I\'ll blow your house in!"',
        art: [['house', 92, 318, 1.9, { kind: 'sticks' }], ['wolf', 230, 326, 1.3, { flip: true, blow: true }]],
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
        bg: 'day', text: '"Then I\'ll huff, and I\'ll puff, and I\'ll blow your house in!"\nWell, he huffed, and he puffed, and he puffed and he huffed,\nbut he could [not] get the house down.',
        art: [['house', 92, 318, 1.9, { kind: 'brick' }], ['wolf', 230, 326, 1.3, { flip: true, blow: true }]]
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
        art: [['pot', 130, 332, 1.7, { lid: true }], ['pig', 245, 336, 0.75, { flip: true }]]
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
        art: [['troll', 150, 345, 1.15, { noShadow: true }], ['bridge', 150, 330, 2.9], ['goat', 100, 213, 0.6]]
      },
      {
        bg: 'river', text: '"WHO is that tripping over my bridge?" roared the Troll.\n"Now I\'m coming to gobble you [up]!"',
        art: [['bridge', 150, 330, 2.9], ['goat', 85, 213, 0.6], ['troll', 205, 332, 1.35, { roar: true, noShadow: true }]]
      },
      {
        bg: 'river', text: '"Oh, no! Don\'t eat me. I\'m [too] little," said the littlest goat.\n"Wait for the second billy goat Gruff. He\'s much bigger."\n"Well, be off with you!" said the Troll.',
        art: [['troll', 150, 345, 1.15, { noShadow: true }], ['bridge', 150, 330, 2.9], ['goat', 262, 214, 0.6, { happy: true }]]
      },
      {
        bg: 'river', text: 'Then came the second billy goat Gruff.\nTRIP, TRAP! TRIP, TRAP! "WHO is that?" roared the Troll.\n"Don\'t [eat] me!" said the second goat.\n"Wait for the big billy goat Gruff."',
        art: [['bridge', 150, 330, 2.9], ['goat', 88, 213, 0.8], ['troll', 210, 332, 1.35, { roar: true, noShadow: true }]]
      },
      {
        bg: 'river', text: 'Then came the big billy goat Gruff.\nTRIP, TRAP! TRIP, TRAP!\nThe bridge creaked and groaned, for he was so [big].',
        art: [['troll', 150, 345, 1.15, { noShadow: true }], ['bridge', 150, 330, 2.9], ['goat', 150, 212, 1.15]]
      },
      {
        bg: 'river', text: '"WHO is that tramping over my bridge?" roared the Troll.\n"It is I, the big billy goat Gruff!"\n"Now I\'m coming to gobble you [up]!"',
        art: [['bridge', 150, 330, 2.9], ['goat', 100, 213, 1.1], ['troll', 225, 332, 1.3, { roar: true, noShadow: true }]]
      },
      {
        bg: 'river', text: '"Well, come along! I\'ve got two spears,\nAnd I\'ll poke your eyeballs out at your ears;\nI\'ve got besides two curling-stones,\nAnd I\'ll crush you to bits,\nbody and [bones]."',
        art: [['bridge', 150, 330, 2.9], ['goat', 105, 213, 1.15, { rot: 8 }], ['troll', 225, 332, 1.3, { roar: true, noShadow: true }]]
      },
      {
        bg: 'river', text: 'And he flew at the Troll. [Bump]!',
        art: [['bridge', 150, 330, 2.9], ['goat', 150, 213, 1.15, { rot: 8 }], ['troll', 236, 250, 1.1, { roar: true, rot: 35, noShadow: true }]],
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
        art: [['rabbit', 92, 320, 1.35, { hare: true, laugh: true }], ['tortoise', 222, 324, 1, { flip: true }]]
      },
      {
        bg: 'day', text: '"Yes, I do," said Tortoise.\n"I will [run] a race with you, and you will see."\nHare laughed and laughed.',
        art: [['tortoise', 100, 324, 1.2], ['rabbit', 225, 320, 1.2, { hare: true, laugh: true }]]
      },
      {
        bg: 'day', text: 'Fox was the judge. He set a flag at the end of the race.\n"Ready, steady... [go]!"',
        art: [['fox', 222, 300, 1.05, { flip: true }], ['flag', 168, 302, 0.85], ['rabbit', 62, 326, 0.95, { hare: true }], ['tortoise', 128, 336, 0.8]]
      },
      {
        bg: 'day', text: 'Off ran Hare, as fast as the wind.\nOff went Tortoise, one slow [step] at a time.',
        art: [['rabbit', 250, 292, 0.7, { hare: true }], ['tortoise', 90, 334, 1.05]]
      },
      {
        bg: 'day', text: 'Hare was so far ahead that he lay down under a tree.\n"I have lots of time," he said.\n"I will have a little [nap]."',
        art: [['tree', 150, 300, 2.3, { seed: 5 }], ['rabbit', 160, 330, 1.1, { hare: true, sleep: true }]]
      },
      {
        bg: 'day', text: 'But Tortoise did not stop.\nStep, step, step. On and on he went,\nright [past] the sleeping Hare.',
        art: [['tree', 110, 300, 2.1, { seed: 5 }], ['rabbit', 112, 330, 1, { hare: true, sleep: true }], ['tortoise', 235, 336, 0.95]]
      },
      {
        bg: 'day', text: 'At last Hare woke [up].\nWhere was Tortoise? He was nearly at the flag!',
        art: [['tree', 75, 296, 1.7, { seed: 5 }], ['rabbit', 85, 330, 1.05, { hare: true }], ['flag', 262, 288, 0.75], ['tortoise', 222, 292, 0.45]]
      },
      {
        bg: 'day', text: 'Hare ran as fast as he could.\nBut it was too late. Tortoise had [won]!',
        art: [['flag', 150, 300, 1.15], ['tortoise', 150, 332, 1.05, { happy: true }], ['fox', 255, 320, 0.9, { flip: true, happy: true }], ['rabbit', 48, 326, 0.85, { hare: true }]],
        after: { text: 'Slow and steady wins the race.' }
      }
    ]
  }
];
