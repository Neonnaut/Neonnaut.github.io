import type { Options, Piece, Line } from "./types.js";

export default function get_pieces(
   options: Options,
   lines_input: string,
): Piece[] {
   const my_pieces: Piece[] = [];

   const pending_pieces: string[] = lines_input
      .split(/\r?\n\s*\r?\n/) // split on empty/whitespace-only lines
      .map((s) => s.trimEnd()); // remove trailing newlines

   for (let i = 0; i < pending_pieces.length; i++) {
      const pending_piece = pending_pieces[i];

      const pending_lines = pending_piece.split(/\r?\n/);
      const my_lines: Line[] = [];

      const word_lengths: number[] = [];

      for (let j = 0; j < pending_lines.length; j++) {
         // If not interlinear line or last line
         if (options.not_interlinear.includes(j + 1)) {
            my_lines.push({
               words: [pending_lines[j]],
               line_type: "not-interlinear",
            });
         } else if (j === pending_lines.length - 1) {
            // Last line, trans line
            my_lines.push({
               words: [pending_lines[j]],
               line_type: "trans",
            });
         } else {
            const temp_words = split_line(pending_lines[j]);
            // Get actual character count of each column
            for (let k = 0; k < temp_words.length; k++) {
               const wordie = temp_words[k];
               const wordie_length = get_real_string_length(wordie);
               if (word_lengths[k] === undefined) {
                  word_lengths.push(wordie_length);
               } else if (wordie_length > word_lengths[k]) {
                  word_lengths[k] = wordie_length;
               }
            }
            //if (temp_words.length >= longest_line_length) {
            //	longest_line_length = temp_words.length;
            //}
            if (j === pending_lines.length - 2) {
               // Second last line, gloss line
               my_lines.push({
                  words: temp_words,
                  line_type: "gloss",
               });
            } else if (j === pending_lines.length - 3) {
               // Third last line, word line
               my_lines.push({
                  words: temp_words,
                  line_type: "word",
               });
            } else {
               // An interlinear line of some type
               my_lines.push({
                  words: temp_words,
                  line_type: "normal",
               });
            }
         }
      }
      my_pieces.push({ lines: my_lines, word_lengths: word_lengths });
   }
   return my_pieces;
}

function split_line(line: string): string[] {
   return line.trim().split(/\s+/).filter(Boolean);
}

function get_real_string_length(s: string): number {
   let noDiacritics = s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
   noDiacritics = noDiacritics.replace(/[\u02E5-\u02E9]/g, "˥");
   noDiacritics = noDiacritics.replace(/[\uA708-\uA716]/g, "˥");
   noDiacritics = noDiacritics.replace(/\u02DE/g, "");

   return noDiacritics.length;
}
