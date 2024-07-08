import markdown


output = markdown.markdown(

    '''
<h3>Step 2: Choose your aesthetic</h3>

In this step, you will consider the aesthetic of your script. To understand just what this means, let's look at an example. Take a look at this sample script I have just designed:

[img]http://www.vgfun.net/lee/langpage/scripts/other/samplescript01.png[/img]

You will note that it really sucks. But why? If you are designing something you want to be visually pleasing, it's not enough to know that it sucks, but to know why it sucks. The reason this script is so bad is because it lacks any sort of guiding aesthetic. Each letter appears as though it was designed independently, without any reference to the other glyphs. There is no consistency from glyph to glyph, and as a result, when they are arranged together in a line of text, they clash, and just look like a collection of random shapes.

So how can we resolve this problem?

There is no one way to resolve it, because it is a creative endeavour. You will need to come up with your design aesthetic on your own. However, there are concrete suggestions I can give to help you in your decision.

[u]1. Decide which strokes appear frequently[/u]
Looking carefully as just about any modern script will reveal that they each have certain shapes or lines or angles that appear quite frequently. Some examples:

The majority of Latin lower case letters are built either out of vertical lines, circles (or portions of circles), or a combination of the two. Six letters also incorporate diagonals. You will note that while the exact angles of the diagonals differ slightly, they are as close as possible to 45° while maintaining an aesthetically pleasing form.

[url=http://www.omniglot.com/writing/georgian2.htm]Georgian[/url] is similar, but different. It also incorporates circles and vertical lines, but it has fewer vertical lines, and many more c-shaped semi-circles.

Almost all [url=http://www.omniglot.com/writing/oriya.htm]Oriya[/url] letters have rounded tops. There are also a lot of circles, "n" shapes, and angled or very short straight lines

Most [url=http://www.omniglot.com/writing/thai.htm]Thai[/url] letters have a small circle or two attached to them somewhere. Also, every single letter has at least one straight vertical line in it, and most have two. Also, similar to Oriya, the majority of them have rounded tops.

[url=http://www.omniglot.com/writing/arabic.htm]Arabic[/url] has many large cup shapes, many small vertical hooks, and of course, lots of dots.

Chinese has many straight vertical and horizontal lines, as well as gently-curving diagonals.

[url=http://www.omniglot.com/writing/glagolitic.htm]Glagolitic[/url] has circles and triangles [i]everywhere[/i]. Yet, oddly enough, there is no letter that is just O or Δ.

Even something like Egyptian hieroglyphics reveals common patterns. looking closely at a lot of signs will reveals many curves, including many S curves, that gradually become wider and more open or flat on one side, sort of like part of a Fibbonacci spiral.

Mayan, by contrast, tends to favour very blunt curves. Nearly every round shape is squared off, like a square with rounded corners. As a result, there are very few real circles in Mayan, and all that do exist are small.


[u]2. Decide which strokes appear infrequently or not at all[/u]
It should come as no surprise that if some stroke types are frequent, others may not be so frequent, or may even be entirely absent. Let's take a look:

No Latin letters have very open curves, like (. There are also very few horizontal lines: in the lower-case letters, horizontal strokes appear only in e, f and t; in upper case, only A, E, F, G, H, L, T and Z.

Chinese characters entirely lack tight curves and circles

[url=http://www.omniglot.com/writing/lontara.htm]Buginese[/url] entirely lacks horizontal or vertical lines of any kind. All lines are diagonals, and although the script lacks any curved lines [i]per se[/i], all corners are rounded.

[url=http://www.omniglot.com/writing/runic.htm]Futhark[/url] has no curves of any kind; all strokes are completely straight lines. It also entirely lacks horizontal lines.

[url=http://www.omniglot.com/writing/khmer.htm]Khmer[/url] has many small hooks, as well as flat M shapes on the tops of letters. Some letters also have W shapes on the bottom. Although these are all formed from diagonal strokes, the script lacks longer diagonal strokes that cover the height or width of a character.

[url=http://www.omniglot.com/writing/tibetan.htm]Tibetan[/url] has many elongated descenders. It also has many curves that have one end lower than the other. Although many letters have horizontal lines on the tops, horizontal lines are otherwise almost entirely absent (only one letter has a horizontal anywhere other than the top). The most likely locations for non-top horizontals are instead occupied by the lopsided curves mentioned above.

[url=http://www.omniglot.com/writing/japanese_hiragana.htm]Hiragana[/url] has relatively few straight lines, favouring curves for the most part.

[url=http://www.omniglot.com/writing/javanese.htm]Javanese[/url] never allows an entirely vertical line to appear on the left side of a letter; it always curves in at the bottom. It is also extremely hesitant about allowing a single vertical on the right side; usually, there will be at least two verticals pretty close together on the right side (though not quite always).

Some scripts don't have stroke types that they outright forbid, but there will always be a tendency toward certain strokes over others.

[u]Think about it[/u]
Look again at that sample script I made up.

[img]http://www.vgfun.net/lee/langpage/scripts/other/samplescript01.png[/img]

Can you apply any rule at all to it? Is there any guiding principle such as the ones we have covered so far that seems to govern the formation of the characters? The answer is no, and the reason the answer is no is because when I designed the letters, I did not make any attempt to unify them in any way, resulting in an ugly, fake-looking mess.

Remember: this is a creative process here. You have to decide what you want to include, how frequent it is, what you want to eliminate, if anything, and so on. These are all just suggestions.

Please continue on to [url=http://cbbforum.com/viewtopic.php?f=31&t=4502&p=178847#p178847]Addendum to Step 2: Side-effects of practical application of your script[/url] 

[b]Up next: more suggestions on increasing the uniformity of your script.[/b]

''')

print(output)
