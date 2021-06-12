# Gloss My Gloss

> A generator for interlinear glosses

This is an input/output gnerator for alligning linguistic interlinear gloss, for the purposes of conlanging.
There are several markup options for displaying on different websites.

Refer to the following documents:

https://www.eva.mpg.de/lingua/resources/glossing-rules.php

https://kbmcgowan.github.io/blog/2009/02/28/css-interlinear-glosses.html

https://bdchauvette.net/leipzig.js/

## Use

Make sure to provide at least three lines in the input, with your gloss on the second last line and your translation on the last. In this case your input would look like this:

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

Then "Non alignable lines" should have a "1" to indicate not to allign the first line.

### HTML

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
table tr td {
  padding-right: 3px;
}
table tr {white-space: nowrap;}
```

## TODO

- [ ] Interlinear div markup
- [x] Latex gloss markup
- [ ] CWS gloss markup
- [ ] Wiki Table markup
- [ ] Some sort of save/load/remember for options, either using local storage or some other method
- [ ] An option to bold the first line
- [ ] An option to bold all linguistic abbreviations
- [ ] accept abbreviation input with delimiters in them e.g: "Q.WH, Interogative question particle"

## License

MIT License

Copyright (c) 2021

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.