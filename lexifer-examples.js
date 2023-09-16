// Insert different examples into the lexifer web app.

function lexiferExample(example) {
    var def = document.getElementById("def");

    if (example == "basic") {
        def.value = `with: std-ipa-features std-assimilations coronal-metathesis

letters: ʔ a á b ch d e g h i k l m n o p r s t u w y

C = t n k m ch l ʔ s r d h w b y p g
D = n l ʔ t k r p
V = a i e á u o

$S = CVD?

words: V?$S$S V?$S V?$S$S$S

# haplology
reject: (..+)\\1+

reject: wu yi w$ y$ h$ ʔʔ (p|t|k|ʔ)h
filter: nr > tr; mr > pr; ŋ > n
`;
    } else if (example == "basic-ex") {
        def.value = `# See the documentation linked above for full details.

# These set up assimilations ("np" will be changed to "mp") and a few other
# minor things.  It is possible for assimilations to produce phonemes you
# don't want, which is why one of the filters below is: ŋ > n.
with: std-ipa-features std-assimilations coronal-metathesis

# This determines the sort order of the output, and also helps
# the 'with:' line settings understand what is going on.
letters: ʔ a á b ch d e g h i k l m n o p r s t u w y

# THE ORDER OF PHONEME CLASSES MATTERS.  The very first phoneme
# will be picked much, much more often than the last.  The order
# here is approximately natural for a lot of languages.  You can
# change the character of a language a lot by shuffling which
# phonemes occur most often, which the least.
C = t n k m ch l ʔ s r d h w b y p g
D = n l ʔ t k r p
V = a i e á u o

# Macros are only a convenience to reduce typing, and do simple
# substitution only.  You can't use macros inside other macros.
$S = CVD?

# The first word shape will be picked most often, the last least
# often.
words: V?$S$S V?$S V?$S$S$S

# Rejections and filters use Javascript regular expressions.
# 'reject:' simply throws away a word.  Filter turns certain
# paterns into something else.
reject: wu yi w$ y$ h$ ʔʔ (p|t|k|ʔ)h
filter: nr > tr; mr > pr; ŋ > n

# Haplology - remove repeats.
reject: (..+)\\1+

`;
    } else if (example == "tonal") {
        def.value = `# A tonal language with a slightly odd phoneme inventory.
# Turn on "Display all generation steps" and select a number of words to
# see how this operates.

C = t n k l ch m kw v j tl y d tw s zh f g sh dw w t' z gh k' sw ng zw gw ch' nw kh tl' ngw ny kw' ɬ ghw khw b dl p
F = n m s ng ɬ t kh k khw p
U = a i u e ou ei o
V = a i e u ou ai oi au o ei eu 

# I fake tone with digits.  Because the tones are not in a power
# distribution, I give explicit weights, with the unmarked, middle tone
# occurring most often, and the contour tone the least often.  The
# digits are converted to something more familiar at the end of the
# definition.
T = 0:1.5 1:1 2:1 3:0.5

# Make optional elements - marked with '?' - occur 35% of the time.
random-rate: 35

words: CUTF? CVT UTF? VT

filter: yi > i
filter: wau > wai

# Simplify labiovelars.  Purely arbitrary substitution, but one that
# results in still legal diphthongs.
% o u
w wa we

reject: nyi nye o$ o1$ o2$ o3$ e$ e1$ e2$ e3$ 

# Turn tone numbers into diacritics.
% 0 1 2 3
a a á à ǎ
e e é è ě
i i í ì ǐ
o o ó ò ǒ
u u ú ù ǔ
`;
    } else if (example == "hungarian") {
        def.value = `# This isn't quite Hungarian, but approximates it for demonstration
# purposes.  The cluster restrictions, in particular, are based on
# Hungarian data:
#
#    http://real-d.mtak.hu/233/1/Torkenczy_Miklos.pdf
#
# But I have left out the front, rounded vowels and some of the
# palatalized consonants.

with: std-ipa-features std-assimilations coronal-metathesis

letters: a á b c d dz dʒ e é f g h i í j k l m n o ó p r s ʃ t ts tʃ u ú v z ʒ '

C = t n k tʃ s m r ʃ d h p ts v l d b ʒ dʒ f j z p g dz

##################################################
# Some initial fricative + C clusters
D = s ʃ v ʒ f z
E = t n k tʃ m r p ts l v f p

# Cluster rules... notice the single quote mark, which I will use in
# the 'words:' section below, to mark of syllable boundaries.  This
# lets me more carefully craft where clusters are allowed and where
# they are forbidden.

%  p t k ts tʃ f v m n l r
'f - + - -  -  - - - - + +
'v - - - -  -  - - - - + -
's + + + +  -  + + + + + -
'ʃ + + - -  +  - + + + + +
'z - - - -  -  - - - - + +
'ʒ - - - -  -  - - - - - -

##################################################
# For initial complex clusters.
W = s ʃ
X = tr kr kl pr

%  pr tr kr kl
's -  +  -  +
'ʃ +  +  +  -

V = a i e á u o é í ó ú
S = s z ʃ
R = n l r m

##################################################
# Vowel clusters
% i e u o a í é ú ó á
i - + + + + - + + + +
e + - + + + - - - + +
u + + - + + + - - + +
o + + - - + - + - - +
a + + + + - + - - + -
í - - - - - - - - - -
é - - - - - - - - - -
ú - - - - - - - - - -
ó - - - - - - - - - -
á - - - - - - - - - -

##################################################
# Coda clusters
T = t n k tʃ s m r ʃ d p ts v l d dʒ b ʒ f j z p g dz

# This rejects a mass of final clusters, and makes word generation
# a bit slow.
%  p' t' k' b' d' g' ts' tʃ' dʒ' f' s' ʃ' v' z' ʒ' m' n' l' r' j'
p  +  +  -  -  -  -  -   -   -   +  +  +  -  -  -  -  -  -  -  -
t  -  +  +  -  -  -  -   -   -   -  -  -  -  -  -  -  -  -  -  -
k  -  -  +  -  -  -  -   +   -   -  +  +  -  -  -  -  -  -  -  -
b  -  -  -  +  -  -  -   -   -   -  -  -  -  -  -  -  -  -  -  -
d  -  -  -  -  +  -  -   -   -   -  -  -  +  +  -  -  -  -  -  -
g  -  -  -  -  +  +  -   -   -   -  -  -  -  -  -  -  -  -  -  -
ts -  -  +  -  -  -  +   -   -   -  -  -  -  -  -  -  -  -  -  -
tʃ -  -  +  -  -  -  -   +   -   -  -  -  -  -  -  -  -  -  -  -
dʒ -  -  -  -  +  -  -   -   +   -  -  -  -  -  -  -  -  -  -  -
f  -  +  -  -  -  -  -   -   -   +  -  -  -  -  -  -  -  -  -  -
s  -  +  +  -  -  -  -   -   -   -  +  -  -  -  -  -  -  -  -  -
ʃ  -  +  -  -  -  -  -   -   -   -  -  +  -  -  -  -  -  -  -  -
v  -  -  -  -  +  -  -   -   -   -  -  -  -  -  -  -  -  -  -  -
z  -  -  -  -  +  +  -   -   -   -  -  -  -  +  -  -  -  -  -  -
ʒ  -  -  -  -  +  -  -   -   -   -  -  -  -  -  -  -  -  -  -  -
m  +  +  -  -  +  -  -   -   -   +  -  -  +  +  +  +  -  -  -  -
n  -  +  +  -  +  -  +   +   +   -  +  +  +  -  -  -  +  +  -  -
l  +  +  +  +  +  +  +   +   -   +  -  +  +  -  -  +  -  +  -  -
r  +  +  +  +  +  +  +   +   -   +  +  +  +  +  +  +  +  +  +  +
j  +  +  +  -  +  +  +   +   -   +  +  +  +  +  +  +  +  +  -  -

##################################################
# Words

# First, some basic syllable types, with clustering rules as defined
# above. 
# Note that all syllables have a leading quote mark, which defines
# syllable boundary, to make the cluster rules given above apply more
# precisely.

$A = 'CVV?C?
$B = 'VV?C?
$C = 'WXVV?C?

$D = 'DEVC?

$P = 'CVV?TT?
$Q = 'VV?TT?

# The actual words.
words: $P' $Q' $D $Q$P' $P$P' $A$A $C$A $C$P' $Q$D$P' $Q$A $Q$A$P' V?$A $B$A

# Reject a few vexations.
reject: j(i|í) j' h' h$ ʃs sʃ zʒ ʒz sz

# Hungarian-esque spelling
filter: ts > c; s > sz; tʃ > cs; ʒ > zs; ʃ > s; ss > s; ŋ > n

# Remove syllable boundaries.
filter: ' > !
`;
    }
    // Move back to the top.
    def.scrollTop = 0;
    def.scrollLeft = 0;
}
