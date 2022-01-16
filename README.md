# Gloss My Gloss

> A generator for interlinear glosses

This tool, designed for formatting linguistic interlinear gloss, is built with HTML and and runs in your browser at https://neonnaut.github.io/. It should be noted that this tool saves your data in local storage of your brower

It's main purpose has been designed for constructed languages, and as many abbreviations for grammatical elements already have conflicts with each other, new definitions can be set that can overwrite individual definitions.

You may refer to the following information on what interlinear gloss is and it's purpose:

https://www.eva.mpg.de/lingua/resources/glossing-rules.php

https://kbmcgowan.github.io/blog/2009/02/28/css-interlinear-glosses.html

https://bdchauvette.net/leipzig.js/

## Use

Make sure to provide at least three lines in the input, with your gloss on the second last line and your translation on the last. (ZBB can work with two). In this case your input would look like this:

```
Astra inclinant, sed non obligant.
star.ACC.PL incline.PRS.PTCP but NEG bind.3P.PRS.ACT.IND
"The stars incline us, they do not bind us."
```

Any additional lines must go above the gloss line. Any of these additional lines may be marked with the "Non alignable lines" textbox. For example, if we had the input:

```
太陽が東の空に昇る
taiyō ga higashi no sora ni noboru
/taijoː ŋa çiŋaɕi no soɾa nʲi noboɾɯᵝ/
sun SUBJECT east POSSESSIVE sky LOCATIVE rise
"The sun rises in the eastern sky."
```

Then "Non alignable lines" should have a "1" to indicate not to align the first line.

#### HTML table

When using the HTML markup method, provide the following CSS on your website to get the desired output:

```
.abbrv {
   cursor: help;
 }
.sc {
  font-variant: small-caps;
  font-variant-numeric: oldstyle-nums;
  text-transform: lowercase;
}
table {
  overflow: auto;
}
table tr {
  white-space: nowrap;
}
table tr td {
  padding-right: 3px;
}
```

If you wish to style anything, such as use italics or bold, you may enter HTML tags on an individual word. If you wish to style an entire line, the best way is to add a class to `<tr>` and add styles with CSS.

#### HTML Interlinear div

When using the HTML interlinear div method, provide the following CSS on your website to get the desired output:

```
.abbrv {
   cursor: help;
}
.sc {
  font-variant: small-caps;
  font-variant-numeric: oldstyle-nums;
  text-transform: lowercase;
}
div .gll {
  display: inline-table;
  padding-right: 10px;
}
```

'Single column lines' does not work with this method. Even if you were to edit the output, a div without the .gll class will only work at the end or the beggining of a block of .gll divs.

#### Plain Text

Make sure to display the text in a fixed-width font, such as including the text in a `<pre>` element. Be careful when using the small caps option, as the characters may not display correctly on all devices, especially F, S, X, and Q. My advice is to not use the small caps option, but the option is there.

Using

#### Latex

Using Latex's gb4e package, this method normally takes only three lines, therefore this generator only configures three lines.

make sure to put `\usepackage{gb4e}` in your preamble. And if you are using small caps, the font you are using has to support small caps.

#### ZBB

This method outputs to the ZBB Board's gloss markup, if you provide more than two lines, the third last line must not be empty.

#### Reddit

This method creates a codeblock where backtick enabled codeblock is enabled.

#### Reddit

You must ue Reddit's "Markdown" mode and not the "Fancy pants editor". This will output your text into a so-called fixed-width-font in it's codeblock, and the last line out of the codeblock. Reddit's font for codeblocks doesn't seem to be a fixed width font for all chaacters, at least on the devices I tested on. So if you use certain IPA characters such as `ɨ`, your columns may come out of alignment.

#### Wiki tables

If your wiki does not have the abbr template, you will need to start a page called template:abbr, and put the following code in it:

```
<abbr title="{{{2}}}">{{{1|[?]}}}</abbr><noinclude>{{documentation}}</noinclude>
```

And after saving, if your wiki asks for documentation, provide this link: https://en.wikipedia.org/wiki/Template:Abbr

## Issues

- Custom abbreviations with a delimiter in them e.g: "Q.WH, Interogative question particle" will not work propperly.
- Plaintext method does not support combining diacritic `◌˞`.
- Plaintext method does not do multiple translations.
