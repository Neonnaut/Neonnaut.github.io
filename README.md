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

### Interlinear div

When using the HTML interlinear div method, provide the following CSS on your website to get the desired output:

```
div .gll {
  display: inline-table;
  padding-right: 10px;
}
```

### Plain Text

Make sure to display the text in a fixed-width font, such as including the text in a `<pre>` element.

### Wiki tables

If your wiki does not have the abbr template, you will need to start a page called template:abbr and put the following code in it:

```
<abbr {{#if:{{{class|}}}|class="{{{class}}}"}} {{#if:{{{id|}}}|id="{{{id}}}"}} {{#if:{{{style|}}}|style="{{{style}}}"}} title="{{#tag:nowiki|{{#invoke:String|replace|{{{2|}}}|"|&quot;}}}}">{{{1|}}}</abbr><noinclude>{{Documentation}}
</noinclude>
```

And after saving, if your wiki asks for documentation link here: https://en.wikipedia.org/wiki/Template:Abbr

## TODO

- [ ] accept abbreviation input with delimiters in them e.g: "Q.WH, Interogative question particle"