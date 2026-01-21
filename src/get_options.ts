import type { Options } from "./types";
import {
   inbuilt_abbreviations,
   inbuilt_explanations,
} from "./inbuilt_abbreviations";

function parse_number_list(input: string): number[] {
   if (input.trim() === "") {
      return [];
   }
   const parts = input.split(",").map((s) => s.trim());

   // Validate every item is a finite number
   for (const p of parts) {
      if (p === "" || isNaN(Number(p))) {
         alert("Invalid 'single column lines' option!");
         return [];
      }
   }
   return parts.map(Number);
}

export default function get_options(
   not_interlinear_lines: string,
   use_inbuilt_abbrv: boolean,
   abbreviations_raw: string,
   abbrv_delimiter_input: string,
   use_smallcaps: boolean,
   use_acknowledgement: boolean,
): Options {
   //Get noninterlinear lines
   const my_not_interlinear_lines = parse_number_list(not_interlinear_lines);

   // Abbreviations input
   const abbrv_lines = abbreviations_raw.split("\n");

   // Abbreviations
   let my_abbreviations = [];
   let my_explanations = [];
   for (let i = 0; i < abbrv_lines.length; i++) {
      const temp = abbrv_lines[i].split(",");
      if (temp[0] && temp[1]) {
         my_abbreviations.push(temp[0].trim());
         my_explanations.push(temp[1].trim());
      }
   }
   if (use_inbuilt_abbrv) {
      my_abbreviations = my_abbreviations.concat(inbuilt_abbreviations);
      my_explanations = my_explanations.concat(inbuilt_explanations);
   }

   const my_abbrv_delimiter = abbrv_delimiter_input
      .split(",")
      .map((s) => s.trim());

   return {
      not_interlinear: my_not_interlinear_lines,
      abbreviations: my_abbreviations,
      explanations: my_explanations,
      abbreviation_delimiter: my_abbrv_delimiter,
      use_smallcaps: use_smallcaps,
      use_acknowledgement: use_acknowledgement,
   };
}
