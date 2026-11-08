# The Briar Patch Library

A fill-in-the-blanks storybook for small children learning to spell on a computer. It's plain HTML and JavaScript with no build step: open `index.html` in Safari or Chrome.

Each page has a picture and a blank word, and the child fills it in by typing. Only the right letter goes in. A wrong key gets a soft "boop" and the letter floats away. Nothing ever has to be deleted or corrected. (There is no reading voice for now; see *Voice* below.)

## The two shelves

| Shelf | For | How the blanks work |
|---|---|---|
| **The Little Shelf** | about 3 | Every letter of the word is printed faintly. The matching key glows on the on-screen typewriter and a pointing hand shows it big. The child is learning letter shapes and where the keys are. |
| **The Big Shelf** | about 5 | Only empty letter slots, with the picture as the clue. After two wrong keys the next letter fades in and its key lights up. The same happens if they go quiet for about ten seconds, or press the down arrow. |

Finishing a book puts a gold star on its cover. Stars are kept in the browser's local storage.

## Keys

All of these are on the Karabiner allowlist:

| Key | Does |
|---|---|
| letters | fill in the blank |
| right arrow or return | turn the page (only once the page is filled in) |
| left arrow | go back a page (from the title page, back to the shelf) |
| up arrow or space | read the page again (only when the voice is on) |
| down arrow | a hint: show the next letter and light its key |

On the shelf, the arrows choose a book and return opens it. Shortcuts with cmd, ctrl or option are ignored by the app, so grown-ups can still use them.

## The stories

| Book | Shelf | Source |
|---|---|---|
| Old MacDonald Had a Farm | Little | Traditional song |
| Hey Diddle Diddle | Little | *The Real Mother Goose* (1916), [Project Gutenberg #10607](https://www.gutenberg.org/ebooks/10607) |
| Where Is Little Rabbit? | Little | New: a hide-and-seek book |
| Twinkle, Twinkle, Little Star | Little | Jane Taylor, "The Star", from *Rhymes for the Nursery* (1806). The first two of its five verses, with the first sung again at the end. |
| Hickory, Dickory, Dock | Little | *The Real Mother Goose* (1916), [Project Gutenberg #10607](https://www.gutenberg.org/ebooks/10607) |
| One Red Bug | Little | New: a counting book (one bug, two frogs, three ducks, four pigs, five mice, and a cow) |
| The Little Red Hen | Big | Retold from Florence White Williams' 1918 version, [Project Gutenberg #18735](https://www.gutenberg.org/ebooks/18735) |
| Brer Rabbit and the Briar Patch | Big | Retold from the African American folk tale ([Project Gutenberg #2306](https://www.gutenberg.org/ebooks/2306)) |
| The Owl and the Pussy-Cat | Big | Edward Lear, *Nonsense Songs* (1871), [Project Gutenberg #13647](https://www.gutenberg.org/ebooks/13647). The poem is printed exactly as Lear wrote it. |
| Pip and the Word Tree | Big | New: every word Pip picks comes true |
| The Three Little Pigs | Big | Retold from Joseph Jacobs' *English Fairy Tales* (1890), [Project Gutenberg #7439](https://www.gutenberg.org/ebooks/7439) |
| The Three Billy Goats Gruff | Big | Retold from George Webbe Dasent's translation in *Popular Tales from the Norse* (1859), [Project Gutenberg #8933](https://www.gutenberg.org/ebooks/8933) |
| The Tortoise and the Hare | Big | Retold from *The Aesop for Children* (1919), [Project Gutenberg #19994](https://www.gutenberg.org/ebooks/19994) |

Notes on the choices:

- **Brer Rabbit.** The trickster tales come from African American storytelling. The version on Gutenberg is Joel Chandler Harris's 1880 book, which frames them in minstrel-style dialect told by a plantation character, and it also has the "tar-baby" episode. This retelling keeps the plot that makes children laugh (the fox is tricked into throwing the rabbit exactly where he wants to go) in plain modern words. It drops the dialect, the Uncle Remus frame and the tar-baby. "Roast" and "drown" become "cook you in my pot" and "dunk you in the mud".
- **The Three Little Pigs and the Billy Goats Gruff** keep their old endings. The wolf eats the first two pigs, and the third boils him and eats him for supper. The big billy goat crushes the Troll "to bits, body and bones" and tosses him into the river. The pigs' tale leaves out Jacobs' middle part (the turnips, the apples and the fair) to keep it short.
- **Enid Blyton, Maurice Sendak and The Phantom Tollbooth** are still under copyright, so they shaped the look, not the words. *Pip and the Word Tree* is a new story in the Tollbooth spirit, where words are things you can pick.
- The blank words are mostly three-letter words that sound out letter by letter (cat, pig, hen, pot, sun, bed, hop, mud), plus a few very common words (not, will, did, are). Those are the words five-year-olds usually learn first.

## Adding or changing a story

Everything is in `stories.js`, and the comment at the top explains the format. A page looks like this:

```js
{ bg: 'farm', text: '"Not I," said the [cat].', art: [['cat', 150, 312, 1.7]] }
```

Square brackets mark the blank. `art` places pictures from `art.js` on a 300 by 360 canvas. Open `index.html#gallery` to see every picture by name. To jump straight to a page while editing, open `index.html#book=hen&page=3` (add `&solve` to see it filled in).

To rename the shelves (to the children's names, say), edit `SHELVES` at the top of `stories.js`.

## Voice

Reading aloud is off, because the browser's built-in voices sound robotic. A natural narrator would mean recording clips ahead of time (with a good speech model, or your own voice) and having the app play them; nothing for that exists yet.

The old built-in-voice narration is still there for testing: add `?speech=on` to the address (and optionally `&voice=Daniel&rate=0.85`).

## Locking it down (Karabiner)

The Karabiner rule *In TextEdit, Safari and Chrome, allow only letters, numbers, arrow keys, space, return, and backspace* covers this app in either browser. Everything else is swallowed whenever one of those three apps is in front: cmd and ctrl shortcuts, Escape, tab, punctuation and shift.

```json
"bundle_identifiers": ["^com\\.apple\\.TextEdit$", "^com\\.apple\\.Safari$", "^com\\.google\\.Chrome$"]
```

Open the book with **View → Enter Full Screen** before you walk away. With Escape and cmd blocked, the keyboard can't leave full screen or close the tab. A mouse or trackpad can still reach the menu bar, though.

**For grown-ups:** the rule also applies when *you* use Safari or Chrome, so you can't type a URL, use shortcuts or type punctuation. Turn it off in Karabiner-Elements → Complex Modifications by removing or disabling the rule, and add it back when the children sit down. Another way is to keep the rule in a separate "Kids" profile and switch profiles from the Karabiner menu-bar icon (switch with the mouse, since the keyboard is locked).
