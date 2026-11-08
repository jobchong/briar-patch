# The Briar Patch Library

A fill-in-the-blanks storybook for small children learning to spell on a computer. It's plain HTML and JavaScript with no build step: open `index.html` in Safari or Chrome.

A voice reads every page aloud. Each page has a blank word, and the child fills it in by typing. Only the right letter goes in. A wrong key gets a soft "boop", the letter floats away, and the voice says which letter to look for. Nothing ever has to be deleted or corrected.

## The two shelves

| Shelf | For | How the blanks work |
|---|---|---|
| **The Little Shelf** | about 3 | Every letter of the word is printed faintly. The matching key glows on the on-screen typewriter, a pointing hand shows it big, and the voice names it ("Find see"). The child is learning letter names and where the keys are. |
| **The Big Shelf** | about 5 | Only empty letter slots. The picture and the spoken word are the clue ("Can you spell pig?"). After one wrong key the voice says the word again slowly. After two, the next letter fades in and its key lights up. The same happens if they go quiet for about ten seconds. |

Finishing a book puts a gold star on its cover. Stars are kept in the browser's local storage.

## Keys

All of these are on the Karabiner allowlist:

| Key | Does |
|---|---|
| letters | fill in the blank |
| right arrow or return | turn the page (only once the page is filled in) |
| left arrow | go back a page (from the title page, back to the shelf) |
| up arrow or space | read the page again |
| down arrow | a hint: show the next letter and light its key |

On the shelf, the arrows choose a book and return opens it. Shortcuts with cmd, ctrl or option are ignored by the app, so grown-ups can still use them.

## The stories

| Book | Shelf | Source |
|---|---|---|
| Old MacDonald Had a Farm | Little | Traditional song |
| Hey Diddle Diddle | Little | *The Real Mother Goose* (1916), [Project Gutenberg #10607](https://www.gutenberg.org/ebooks/10607) |
| Where Is Little Rabbit? | Little | New: a hide-and-seek book |
| The Little Red Hen | Big | Retold from Florence White Williams' 1918 version, [Project Gutenberg #18735](https://www.gutenberg.org/ebooks/18735) |
| Brer Rabbit and the Briar Patch | Big | Retold from the African American folk tale ([Project Gutenberg #2306](https://www.gutenberg.org/ebooks/2306)) |
| The Owl and the Pussy-Cat | Big | Edward Lear, *Nonsense Songs* (1871), [Project Gutenberg #13647](https://www.gutenberg.org/ebooks/13647). The poem is printed exactly as Lear wrote it. |
| Pip and the Word Tree | Big | New: every word Pip picks comes true |

Notes on the choices:

- **Brer Rabbit.** The trickster tales come from African American storytelling. The version on Gutenberg is Joel Chandler Harris's 1880 book, which frames them in minstrel-style dialect told by a plantation character, and it also has the "tar-baby" episode. This retelling keeps the plot that makes children laugh (the fox is tricked into throwing the rabbit exactly where he wants to go) in plain modern words. It drops the dialect, the Uncle Remus frame and the tar-baby. "Roast" and "drown" become "cook you in my pot" and "dunk you in the mud".
- **Enid Blyton, Maurice Sendak and The Phantom Tollbooth** are still under copyright, so they shaped the look, not the words. *Pip and the Word Tree* is a new story in the Tollbooth spirit, where words are things you can pick.
- The blank words are mostly three-letter words that sound out letter by letter (cat, pig, hen, pot, sun, bed, hop, mud), plus a few very common words (not, will, did, are). Those are the words five-year-olds usually learn first.

## Adding or changing a story

Everything is in `stories.js`, and the comment at the top explains the format. A page looks like this:

```js
{ bg: 'farm', text: '"Not I," said the [cat].', art: [['cat', 150, 312, 1.7]] }
```

Square brackets mark the blank. `art` places pictures from `art.js` on a 300 by 360 canvas. Open `index.html#gallery` to see every picture by name. To jump straight to a page while editing, open `index.html#book=hen&page=3` (add `&solve` to see it filled in).

To rename the shelves (to the children's names, say), edit `SHELVES` at the top of `stories.js`. The labels are read aloud.

## Voice

The app uses the browser's built-in speech, which works offline on macOS. It prefers a British voice (Daniel, Serena, Kate…) and skips the novelty voices. To pick a voice or speed yourself, add it to the address: `index.html?voice=Samantha&rate=0.85`. Better voices can be downloaded in System Settings → Accessibility → Spoken Content → System Voice → Manage Voices.

## Locking it down (Karabiner)

The Karabiner rule allows only letters, numbers, arrows, space, return and backspace, but only while **TextEdit** is in front. A browser showing this app isn't covered, so a child could still press cmd-Q or cmd-W there. To lock the storybook the same way, run it in a browser you don't use yourself (for example Safari, if you live in Chrome). Then copy the rule's condition and add that browser's bundle id:

```json
"bundle_identifiers": ["^com\\.apple\\.TextEdit$", "^com\\.apple\\.Safari$"]
```

Open the book with **View → Enter Full Screen** before you walk away. Cmd, ctrl and Escape are blocked, so the keyboard can't leave full screen or close the tab. A mouse or trackpad can still reach the menu bar, though.
