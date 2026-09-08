# Site fonts

## PP Neue Montreal — supply these files

PP Neue Montreal is a commercial face from Pangram Pangram. It cannot be
redistributed, so it is not committed here. Drop the licensed `.woff2` files
into this folder using exactly these names and they are picked up with no other
change:

    PPNeueMontreal-Book.woff2       (400)
    PPNeueMontreal-Medium.woff2     (500)
    PPNeueMontreal-SemiBold.woff2   (600)
    PPNeueMontreal-Bold.woff2       (700)

Any you do not have can be left out — the `@font-face` blocks in
`app/globals.css` degrade to the next weight the browser can synthesise, and to
the fallback stack if none are present. Nothing breaks while they are missing;
the site simply renders in the fallback.

## Cal Sans — already here

`CalSans.woff2` / `CalSans-latin-ext.woff2`, taken from `@fontsource/cal-sans`
under the SIL Open Font License 1.1 (`CalSans-OFL.txt`). The face has one
weight, and `app/globals.css` declares it as `font-weight: 100 900` so every
weight the headings ask for maps to that real file instead of the browser
faking a bold.
