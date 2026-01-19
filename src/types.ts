export type Options = {
   not_interlinear: number[];
   abbreviations: string[];
   explanations: string[];
   abbreviation_delimiter: string[];
   use_smallcaps: boolean;
   use_acknowledgement: boolean;
};

export type Piece = {
   lines: Line[];
   word_lengths: number[];
};

export type Line_Type =
   | "word"
   | "gloss"
   | "not-interlinear"
   | "trans"
   | "normal";

export type Line = {
   words: string[];
   line_type: Line_Type;
};

export type Word_line = {
   words: string[];
};

export type Gloss_line = {
   words: string[][];
};
