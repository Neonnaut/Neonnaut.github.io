import type { Options, Piece } from "./types.js";

export default function do_format(
   markup: string,
   pieces: Piece[],
   options: Options,
): { code: string; demo: string } {
   let code = "";
   let demo = "";

   switch (markup) {
      case "plain-text":
         code = plain_text(pieces, options);
         break;
      case "html-table":
         code = html_table(pieces, options);
         demo = code;
         break;
      case "html-div":
         code = html_div(pieces, options);
         demo = code;
         break;
      case "latex":
         code = latex(pieces, options);
         break;
      case "zbb":
         code = zbb(pieces, options);
         break;
      case "cws":
         code = cws(pieces, options);
         break;
      case "wiki":
         code = wiki(pieces, options);
         break;
      case "reddit":
         code = reddit(pieces, options);
         break;
   }
   return { code: code, demo: demo };
}

function plain_text(pieces: Piece[], options: Options): string {
   const output: string[] = [];

   for (const piece of pieces) {
      const output_piece: string[] = [];
      for (const line of piece.lines) {
         if (line.line_type == "not-interlinear") {
            output_piece.push(line.words.join(""));
         } else if (line.line_type == "trans") {
            output_piece.push(line.words.join(" "));
         } else {
            for (let row_num = 0; row_num < line.words.length; row_num++) {
               const lengthie = piece.word_lengths[row_num];
               while (line.words[row_num].length < lengthie) {
                  line.words[row_num] += " ";
               }
            }
            let temp_line = line.words.join(" ");
            if (options.use_smallcaps && line.line_type == "gloss") {
               temp_line = to_small_caps(temp_line);
            }
            output_piece.push(temp_line);
         }
      }
      output.push(output_piece.join("\n"));
   }
   if (options.use_acknowledgement) {
      output.push(get_ack());
   }
   return output.join("\n\n");
}

function html_table(pieces: Piece[], options: Options): string {
   const output: string[] = [];

   for (const piece of pieces) {
      const output_piece: string[] = [];
      for (const line of piece.lines) {
         if (line.line_type == "not-interlinear" || line.line_type == "trans") {
            output_piece.push(
               `   <tr><td colspan=${piece.word_lengths.length}>${line.words.join("")}</td></tr>`,
            );
         } else if (line.line_type === "gloss") {
            let my_table_row: string = "";
            for (
               let row_num = 0;
               row_num < piece.word_lengths.length;
               row_num++
            ) {
               let wordie = line.words[row_num] || "";
               wordie = split_entry_gloss(wordie, options);
               my_table_row += `<td>${wordie}</td>`;
            }
            output_piece.push(`   <tr>${my_table_row}</tr>`);
         } else {
            let my_table_row: string = "";
            for (
               let row_num = 0;
               row_num < piece.word_lengths.length;
               row_num++
            ) {
               const wordie = line.words[row_num] || "";
               my_table_row += `<td>${wordie}</td>`;
            }
            output_piece.push(`   <tr>${my_table_row}</tr>`);
         }
      }
      output.push(`<table>\n${output_piece.join("\n")}\n</table>`);
   }
   if (options.use_acknowledgement) {
      output.push(get_ack(true));
   }
   return output.join("\n\n");
}

function html_div(pieces: Piece[], options: Options): string {
   const output: string[] = [];

   for (const piece of pieces) {
      const output_piece: string[] = [];

      const output_columns: string[][] = [];

      for (const line of piece.lines) {
         if (line.line_type == "trans") {
            output_piece.push(
               output_columns
                  .map((col) => `  <div class='gll'>${col.join("<br>")}</div>`)
                  .join("\n"),
            );
            output_piece.push(`<div>${line.words.join("")}`);
         } else {
            for (let column = 0; column < piece.word_lengths.length; column++) {
               if (output_columns[column]) {
                  if (line.line_type === "gloss") {
                     output_columns[column].push(
                        split_entry_gloss(line.words[column] || "", options),
                     );
                  } else {
                     output_columns[column].push(line.words[column] || "");
                  }
               } else {
                  if (line.line_type === "gloss") {
                     output_columns[column] = [
                        split_entry_gloss(line.words[column] || "", options),
                     ];
                  } else {
                     output_columns[column] = [line.words[column] || ""];
                  }
               }
            }
         }
      }
      output.push(`<div>\n${output_piece.join("\n")}\n</div>`);
   }
   if (options.use_acknowledgement) {
      output.push(get_ack(true));
   }
   return output.join("\n\n");
}
function latex(pieces: Piece[], options: Options): string {
   const output: string[] = [];

   for (const piece of pieces) {
      const output_piece: string[] = [];
      for (const line of piece.lines) {
         if (line.line_type == "not-interlinear") {
            output_piece.push(line.words.join(""));
         } else if (line.line_type === "word") {
            let temp = "\\begin{exe}\n\\ex\n\\gll ";
            temp += line.words.join(" ") + "\\\\";
            output_piece.push(temp);
         } else if (line.line_type === "gloss") {
            const temp = line.words.join(" ") + "\\\\";
            output_piece.push(temp);
         } else if (line.line_type === "trans") {
            const temp = "\\trans " + line.words.join(" ") + "\n\\end{exe}";
            output_piece.push(temp);
         } else if (line.line_type === "normal") {
            const temp = line.words.join(" ");
            output_piece.push(temp);
         }
      }
      output.push(output_piece.join("\n"));
   }
   if (options.use_acknowledgement) {
      output.push(get_ack());
   }
   return output.join("\n\n");
}
function zbb(pieces: Piece[], options: Options): string {
   const output: string[] = [];

   for (const piece of pieces) {
      const output_piece: string[] = [];
      for (const line of piece.lines) {
         if (line.line_type == "not-interlinear") {
            output_piece.push(line.words.join(""));
         } else if (line.line_type === "word") {
            let temp = "\\begin{exe}\n\\ex\n\\gll ";
            temp += line.words.join(" ") + "\\\\";
            output_piece.push(temp);
         } else if (line.line_type === "gloss") {
            const temp = line.words.join(" ") + "\\\\";
            output_piece.push(temp);
         } else if (line.line_type === "trans") {
            const temp = "\\trans " + line.words.join(" ") + "\n\\end{exe}";
            output_piece.push(temp);
         } else if (line.line_type === "normal") {
            const temp = line.words.join(" ");
            output_piece.push(temp);
         }
      }
      output.push(output_piece.join("\n"));
   }
   if (options.use_acknowledgement) {
      output.push(get_ack());
   }
   return output.join("\n\n");
}
function cws(pieces: Piece[], options: Options): string {
   const output: string[] = [];

   for (const piece of pieces) {
      const output_piece: string[] = [];

      const output_columns: string[][] = [];

      for (const line of piece.lines) {
         if (line.line_type == "trans") {
            if (output_columns.length != 0) {
               output_piece.push(
                  `<gbl=${piece.lines.length - 1}>${output_columns.map((col) => col.join("\\\\")).join("|")}</gbl>`,
               );
            }
            output_piece.push(line.words.join(""));
         } else {
            for (let column = 0; column < piece.word_lengths.length; column++) {
               if (output_columns[column]) {
                  output_columns[column].push(line.words[column] || "");
               } else {
                  output_columns[column] = [line.words[column] || ""];
               }
            }
         }
      }
      output.push(`${output_piece.join("\n")}`);
   }
   if (options.use_acknowledgement) {
      output.push(get_ack());
   }
   return output.join("\n\n");
}
function wiki(pieces: Piece[], options: Options): string {
   const output: string[] = [];

   for (const piece of pieces) {
      const output_piece: string[] = [];
      for (const line of piece.lines) {
         if (line.line_type == "not-interlinear") {
            output_piece.push(line.words.join(""));
         } else if (line.line_type === "word") {
            let temp = "\\begin{exe}\n\\ex\n\\gll ";
            temp += line.words.join(" ") + "\\\\";
            output_piece.push(temp);
         } else if (line.line_type === "gloss") {
            const temp = line.words.join(" ") + "\\\\";
            output_piece.push(temp);
         } else if (line.line_type === "trans") {
            const temp = "\\trans " + line.words.join(" ") + "\n\\end{exe}";
            output_piece.push(temp);
         } else if (line.line_type === "normal") {
            const temp = line.words.join(" ");
            output_piece.push(temp);
         }
      }
      output.push(output_piece.join("\n"));
   }
   if (options.use_acknowledgement) {
      output.push(get_ack());
   }
   return output.join("\n\n");
}
function reddit(pieces: Piece[], options: Options): string {
   const output: string[] = [];

   for (const piece of pieces) {
      const output_piece: string[] = [];
      for (const line of piece.lines) {
         if (line.line_type == "not-interlinear") {
            output_piece.push(line.words.join(""));
         } else if (line.line_type === "word") {
            let temp = "\\begin{exe}\n\\ex\n\\gll ";
            temp += line.words.join(" ") + "\\\\";
            output_piece.push(temp);
         } else if (line.line_type === "gloss") {
            const temp = line.words.join(" ") + "\\\\";
            output_piece.push(temp);
         } else if (line.line_type === "trans") {
            const temp = "\\trans " + line.words.join(" ") + "\n\\end{exe}";
            output_piece.push(temp);
         } else if (line.line_type === "normal") {
            const temp = line.words.join(" ");
            output_piece.push(temp);
         }
      }
      output.push(output_piece.join("\n"));
   }
   if (options.use_acknowledgement) {
      output.push(get_ack());
   }
   return output.join("\n\n");
}

function to_small_caps(input: string): string {
   // small caps X is just lowercase x; small caps Q is o with ogonek.
   const table: Record<string, string> = {
      A: "ᴀ",
      B: "ʙ",
      C: "ᴄ",
      D: "ᴅ",
      E: "ᴇ",
      F: "ꜰ",
      G: "ɢ",
      H: "ʜ",
      I: "ɪ",
      J: "ᴊ",
      K: "ᴋ",
      L: "ʟ",
      M: "ᴍ",
      N: "ɴ",
      O: "ᴏ",
      P: "ᴘ",
      Q: "ꞯ",
      R: "ʀ",
      S: "s",
      T: "ᴛ",
      U: "ᴜ",
      V: "ᴠ",
      W: "ᴡ",
      X: "x",
      Y: "ʏ",
      Z: "ᴢ",
   };

   let result = "";

   for (let i = 0; i < input.length; i++) {
      const c = input[i];
      result += table[c] ?? c;
   }

   return result;
}

function get_ack(is_html: boolean = false) {
   if (is_html) {
      return `<i class='gmg-ack'>Gloss provided by <a href='https://neonnaut.github.io/'>Gloss My Gloss</a></i>`;
   } else {
      return `Generated with Gloss My Gloss.`;
   }
}

export function get_abbrved_gloss(
   word: string,
   result: string,
   options: Options,
): string {
   let glossexpl = "";
   const smallCapsClass = options.use_smallcaps ? "abbrv sc" : "abbrv";

   // Find matching abbreviation
   for (let i = 0; i < options.abbreviations.length; i++) {
      if (word === options.abbreviations[i]) {
         glossexpl = options.explanations[i];
         break;
      }
   }

   // No explanation found
   if (glossexpl === "") {
      if (word === word.toUpperCase() && options.use_smallcaps) {
         return result + `<a class='sc'>${word}</a>`;
      }
      return result + word;
   }

   // Explanation found

   if (word === word.toUpperCase() && options.use_smallcaps) {
      return (
         result +
         `<abbr class='${smallCapsClass}' title='${glossexpl}'>${word}</abbr>`
      );
   }
   return result + `<abbr class='abbrv' title='${glossexpl}'>${word}</abbr>`;
}

function split_entry_gloss(entry: string, options: Options): string {
   let result = "";
   let word = "";

   for (let i = 0; i < entry.length; i++) {
      const ch = entry[i];

      if (options.abbreviation_delimiter.includes(ch)) {
         if (word !== "") {
            result = get_abbrved_gloss(word, result, options);
         }
         word = "";
         result += ch;
      } else {
         word += ch;
      }
   }

   if (word !== "") {
      result = get_abbrved_gloss(word, result, options);
   }

   return result;
}
