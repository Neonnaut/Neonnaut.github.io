import markdown


output = markdown.markdown(

    '''
I have given some advice on con-scripting in the past in various threads, but I think it would be nice to assemble everything in one easily-accessible place and go into greater detail on all the points that I think are important. So, without further ado, here is my list of suggestions for designing a constructed script.

###Step 1: Choose a direction

Scripts can be written in a number of directions. The reason it's important to choose a direction early on is because it can affect the shape of your glyphs and how they interact with each other.

The most basic directions are:

####left-to-right, top-to-bottom
The majority of world scripts are written in this direction. The Roman alphabet follows this direction.

####right-to-left, top-to-bottom
This is common in middle-eastern scripts such as Arabic and Hebrew, and many ancient scripts associated with that area.

####top-to-bottom, right-to-left
This is the traditional writing direction for East Asian languages, though nowadays, left-to-right, top-to-bottom is also very commonly used.

####top-to-bottom, left-to-right
This is used for some scripts, such as Mongolian.

####bottom-to-top
This is extremely uncommon, but there are existing real-world scripts that were written vertically. Both left-to-right and right-to-left examples exist.

If you are starting out, I recommend picking something basic from the above list. However, there are more complex directions as well, though they are all variations of the above basic forms. They include:

####(Partially) diagonal horizontal
The Nastaliq form of Arabic script, which is the standard form of writing Urdu, is I think unique in the world by being written in occasionally overlapping diagonals. The letters are connected to each other in a string that moves gradually downward, and when a new word is started, the beginning of the word often appears above the ending of the previous word in order to fill up space and make it more aesthetically pleasing.

####Boustrophedon
This is when lines of text are alternately written left-to-right and then right-to-left. This may be accompanied by a 180° rotation of the glyphs, a result of the writing surface having been rotated in the scribe's hands. For obvious reasons, no modern scripts are written this way, but if you are creating an ancient script, it could be an option.

####Mixed directionality
Some scripts are written in more than one direction at the same time. For example, Many (but by no means all) Mayan inscriptions were written left to right, but only in pairs; after two glyphs, a new line is started below the previous one, leading to columns two glyphs wide.

[img]http://www.vgfun.net/lee/langpage/scripts/other/mayasample.jpg[/img]

Sumerian Cuneiform was similarly written with mixed directionality. Phrases or sentences were written horizontally left-to-right within cells, but the cells were arranged vertically.

####Variable directionality
Many scripts could be written in more than one direction. Ancient Egyptian was variably written in all sorts of directions, while Modern Chinese and Japanese are frequently written both horizontally left-to-right and vertically right-to-left.
''')

print(output)
