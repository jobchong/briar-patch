/* stories.js: the books on the shelves.
 *
 * HOW TO WRITE A PAGE
 *   text   The words on the page. Put a word in [square brackets] to make it a
 *          blank the child types. Use \n for a new line.
 *   art    The picture: a list of [sprite, x, y, size, options].
 *          The picture is 300 wide and 360 tall; y is where the sprite's feet are.
 *          Options: flip, rot (degrees), noShadow, plus a few per sprite
 *          (cat: hat/sleep/sad, rabbit: jacket/sleep/laugh, bed: rabbit/pip/ears, ...).
 *   bg     The background: day, farm, night, indoor, sea, nightsea, wood, garden, hill.
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
        bg: 'wood', text: '"I will cook you in my [pot]!" said Brer Fox.', art: [['pot', 105, 318, 1.3], ['fox', 220, 316, 1.4, { flip: true }]],
        after: { text: '"Cook me in your pot," said Brer Rabbit,\n"but please don\'t throw me in the briar patch!"' }
      },
      {
        bg: 'wood', text: '"Then I will dunk you in the [mud]!" said Brer Fox.', art: [['mud', 110, 322, 1.4], ['fox', 220, 316, 1.4, { flip: true }]],
        after: { text: '"Dunk me in the mud," said Brer Rabbit,\n"but please, PLEASE don\'t throw me in the briar patch!"' }
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
  }
];
