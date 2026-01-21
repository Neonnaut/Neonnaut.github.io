import type { Options, Piece } from "./types";

import get_options from "./get_options";

import get_pieces from "./get_pieces";
import do_format from "./do_format";

window.addEventListener("load", () => {
   // Restore localStorage values if present
   if (localStorage.getItem("GMG") !== null) {
      try {
         // GMG-input, not-interlinear, abbrv-input, abbrv-delimiter-input
         const got_Localstorage = JSON.parse(
            localStorage.getItem("GMG") || "[]",
         ) as [string, string, string, string];

         const gmg_input = document.getElementById(
            "GMG-input",
         ) as HTMLInputElement;
         const not_interlinear = document.getElementById(
            "not-interlinear",
         ) as HTMLInputElement;
         const abbrv_input = document.getElementById(
            "abbrv-Input",
         ) as HTMLInputElement;
         const abbrv_delimiter_input = document.getElementById(
            "abbrv-delimiter-input",
         ) as HTMLInputElement;

         gmg_input.value = got_Localstorage[0] ?? "";
         not_interlinear.value = got_Localstorage[1] ?? "";
         abbrv_input.value = got_Localstorage[2] ?? "";
         abbrv_delimiter_input.value = got_Localstorage[3] ?? "";

         gmg_input.focus();
         gmg_input.select();
      } catch {
         localStorage.removeItem("vocabug");
      }
   }

   // Markup buttons
   document.querySelectorAll("[name='markup-button']").forEach((button) => {
      button.addEventListener("click", () => {
         const id = (button as HTMLElement).id;
         glossarize(id);
         colour_buttons(button as HTMLElement);
      });
   });

   // Copy GMG results
   const copy_btn = document.getElementById(
      "copy-GMG-result",
   ) as HTMLInputElement;
   copy_btn.addEventListener("click", () => {
      const output = document.getElementById(
         "GMG-output-code",
      ) as HTMLTextAreaElement;

      output.select();
      output.setSelectionRange(0, output.value.length);

      navigator.clipboard.writeText(output.value).catch(() => {
         document.execCommand("copy");
      });

      output.focus();
   });
});

function colour_buttons(clicked: HTMLElement): void {
   const selection = document.querySelectorAll<HTMLInputElement>(
      "#GMG-switch-field input",
   );

   for (let i = 0; i < selection.length; i++) {
      selection[i].classList.remove("checked");
   }
   clicked.classList.add("checked");
}

function glossarize(markup: string): void {
   let lines_input = (document.getElementById("GMG-input") as HTMLInputElement)
      .value;
   if (lines_input.trim() === "") {
      lines_input = (document.getElementById("GMG-input") as HTMLInputElement)
         .placeholder;
   }

   // Append original abbreviations if enabled
   const use_inbuilt_abbrv = (
      document.getElementById("use-inbuilt-abbrv") as HTMLInputElement
   ).checked;

   // Get small caps option
   const use_smallcaps = (
      document.getElementById("use-smallcaps") as HTMLInputElement
   ).checked;

   // Acknowledgement
   const use_acknowledgement = (
      document.getElementById("use-acknowledgement") as HTMLInputElement
   ).checked;

   // Get non-interlinear lines
   const not_interlinear_lines = (
      document.getElementById("not-interlinear") as HTMLInputElement
   ).value;

   // User abbreviations
   const abbrv_input_raw = (
      document.getElementById("abbrv-input") as HTMLTextAreaElement
   ).value;

   // Get delimiter input
   const abbrv_delimiter = (
      document.getElementById("abbrv-delimiter-input") as HTMLInputElement
   ).value;

   const options: Options = get_options(
      not_interlinear_lines,
      use_inbuilt_abbrv,
      abbrv_input_raw,
      abbrv_delimiter,
      use_smallcaps,
      use_acknowledgement,
   );

   const pieces: Piece[] = get_pieces(options, lines_input);

   const formatted: {
      code: string;
      demo: string;
   } = do_format(markup, pieces, options);

   // Output code
   const o_code = document.getElementById(
      "GMG-output-code",
   ) as HTMLTextAreaElement;
   o_code.value = formatted.code;

   // Output demo
   const o_demo = document.getElementById("GMG-output-demo") as HTMLElement;
   o_demo.innerHTML = formatted.demo;

   // Focus output textarea
   o_code.focus();

   // Store file contents in local storage to be retrieved on page refresh
   localStorage.setItem(
      "GMG",
      JSON.stringify([
         lines_input,
         not_interlinear_lines,
         abbrv_input_raw,
         abbrv_delimiter,
      ]),
   );
}
