import markdown




output = markdown.markdown(

'''
# A guide to small consonant inventories
                           
...mostly in the form of an inventory dump. By 'small' I mean 12 or fewer consonants, which isn't completely arbitrary since the smallest consonant inventory in Europe (Finnish) has 13, if you ignore the glottal stop and all the loan phonemes.

Inventory dump:

There are a number of things you can do in small consonant inventories.

**Voicing in plosives**:

May be totally absent, as in the Polynesian languages (sometimes they have /v/ but I grouped that as a form of /w/).
May be fully present, as in Xavante or Rotokas.
May be present for only some of the plosives. Note that you can eliminate voicing contrasts for any one POA, though if you eliminate it only in the labials, you'll end up with /b/, not /p/. Piraha, Awa, and Tigak have /p b t k g/ with no /d/; I'm guessing it became /r/. (Iau /d/ is notable within the Lakes-Plain languages for *not* allowing flapping of /d/ -- most of them do.)
Some of these languages have /g/ with no /b d/; this seems to come from lenition processes, where either p t k or b d g > w r g -- so g fails to lenite but the other plosives do. This happened in Ikpeng (where lenition applied intervocalically and /k/ redeveloped through cluster loss) and also in Rotokas though it doesn't show up on the chart -- /b d/ are usually [β ɾ] but I don't know if /g/ lenites.)

**POAs**:
May have no labials, as with Oneida and Tuscarora. Comanche is the only language here to have both labials and /kʷ/, but it's spoken in the general vicinity of languages with /kʷ/ and no labials.
Xavante and Tahitian have no velars. I'm guessing /k/ backed to /ʔ/ in Tahitian and /k g/ fronted in Xavante, but I don't know.
It is not necessarily the case that you need three stop POAs. Abau only has /p k/.
Samoan merged its alveolars into velars, except /l/. Chain shift in the stops: t :> k > ʔ. It already had /ŋ/ when /n/ merged into it though.
Affricates only appear in American languages in this sample. Most of the American languages made it onto the list by having no labials.
Maximum of three non-glottal POAs except in Bandjalang, which is the only Australian language here.

**Fricatives**:
Bandjalang has the largest inventory here with no fricatives, and it's Australian.
The presence of fricatives usually implies /h/, but some have /s/ as their only fricative. If there's a fricative that isn't /s/, there's also /h/ -- except in Cubeo, which only has /x/. If there's /f/, there's usually /s h/; the only exceptions are Polynesian, except Sentani, which is Papuan, and Koiari, which for some bizarre reason has /ð/.
None of these languages has more than three fricatives, unless you count Polynesian /v/ as a fricative. Tuscarora has /θ s h/, Seneca has /s ʃ h/, and Koiari has /f ð h/, but the most common three-fricative inventory by far is /f s h/. /x/ doesn't appear in any of these languages except Cubeo.

**The glottal stop**:
Not as necessary as you might think: about a third of the languages here don't have it. Of the ones that do, some (Polynesian) got it through debuccalization of another plosive.

**Nasals**:
Nasals actually do not imply /n/. Samoan is not anymore the only language here to have nasals without /n/, and it merged its alveolars into velars.
/ŋ/ implies /m/. /p n/ also imply /m/.
Many of the languages here with missing nasals are Amazonian languages with a full inventory of nasal vowels -- nasals are allophones of voiced stops around nasal vowels. In Piraha, nasals [m n] are allophones of /b g/ word-initially. In Keuw, voiced stops vary freely with nasals, and voiceless stops can be freely prenasalized. Rotokas and Iau really do have no nasals.

**Liquids**:
Surprisingly, /w/ (or /v/) is more common than /j/ -- the only language with /j/ and no /w/ is Maxakali.
Ekari has a velar lateral affricate /gʟ/.
/l r/ contrast is more common than you might think, even in these small inventories. It's really not that European a feature.

**Iau**:
...is worthy of special mention here for being probably the most phonologically bizarre language on the planet. It has six consonants, /b t d k f s/. /f/ is [ɸ~h] word-initially, but is [x] preceding /i/; word-medially it's [h]; and word-finally (/f/ is the only consonant that can occur word-finally) it's an unreleased stop [p]. /b d/ vary with nasals, and can be implosive before /ã/; /d/ can also be [l], but is never flapped.
There are eight vowels: /ã æ~ɛ ɪ i ɔ ʊ u/ and a fricated vowel /i̝/. /ã/ is always nasalized.
Despite all this, most words are monosyllabic -- and the reason Iau can pull this off is that, well, not only does it have eight tones (two level and six contour), it has tone clusters -- more than one tone can appear on a word. There is an extensive system of tone-based verbal derivation:
tai2 'pull'
tai3 'has been pulled off'
tai21 'might pull'
tai43 'land on'
tai24 'fell to ground'
tai23 'fall to ground (incompletive)'
tai34 'pull off'
tai243 'falling to ground (durative)'
tai21-34 'pull on, shake' (nb: two *different* contour tones)
tai21-3 'have pulled on, have shaken'
''')

print(output)