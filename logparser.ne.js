// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

var val  = function (data) {return data[0].value;};
const moo = require("moo");

const lexer = moo.compile({
  ws:     /[ \t]+/,
  nl: {match: '\n' , lineBreaks: true},
  np: /\,+/,
  pareng: /\(/,
  parend: /\)/,
  brakg: /\[/,
  brakd: /\]/,
  donc: /∴/,
  terme: {match: /[a-zA-Z0-9⊥\u00C0-\u017F]+/, keywords:{
    opBinLN: ['si','alors','et','ou','implique', 'équivaut', 'seulement'],
    donc: ['donc']
  }},
  opBin:  /[∧∨⊃≡∃∄∀]/,
  opUna: '~'
});
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "src$ebnf$1$subexpression$1", "symbols": [(lexer.has("nl") ? {type: "nl"} : nl), "src"], "postprocess": function(data){return data[1]}},
    {"name": "src$ebnf$1", "symbols": ["src$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "src$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "src", "symbols": ["argument", "src$ebnf$1"], "postprocess": function(data) {var out = [data[0]];if (data[1] !== null) out = out.concat(data[1]);return out;}},
    {"name": "argument$ebnf$1", "symbols": ["premisse"]},
    {"name": "argument$ebnf$1", "symbols": ["argument$ebnf$1", "premisse"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "argument$ebnf$2", "symbols": ["premisse"]},
    {"name": "argument$ebnf$2", "symbols": ["argument$ebnf$2", "premisse"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "argument", "symbols": ["argument$ebnf$1", (lexer.has("donc") ? {type: "donc"} : donc), "argument$ebnf$2"], "postprocess": function (data) {return data[0].concat(data[2]);}},
    {"name": "argument", "symbols": ["premisse"], "postprocess": function (data) {return data[0];}},
    {"name": "premisse$subexpression$1", "symbols": [(lexer.has("opBin") ? {type: "opBin"} : opBin)], "postprocess": val},
    {"name": "premisse$ebnf$1", "symbols": [(lexer.has("np") ? {type: "np"} : np)], "postprocess": id},
    {"name": "premisse$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "premisse", "symbols": ["terme", "premisse$subexpression$1", "terme", "premisse$ebnf$1"], "postprocess": function(data){return data[0] + data[1] + data[2];}},
    {"name": "premisse$ebnf$2", "symbols": [(lexer.has("np") ? {type: "np"} : np)], "postprocess": id},
    {"name": "premisse$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "premisse", "symbols": [(lexer.has("brakg") ? {type: "brakg"} : brakg), "argument", (lexer.has("brakd") ? {type: "brakd"} : brakd), "premisse$ebnf$2"], "postprocess": function(data){return data[1];}},
    {"name": "premisse$ebnf$3", "symbols": [(lexer.has("np") ? {type: "np"} : np)], "postprocess": id},
    {"name": "premisse$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "premisse", "symbols": ["terme", "premisse$ebnf$3"], "postprocess": function (data){return data[0];}},
    {"name": "terme$ebnf$1", "symbols": [(lexer.has("opUna") ? {type: "opUna"} : opUna)], "postprocess": id},
    {"name": "terme$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "terme$subexpression$1", "symbols": [(lexer.has("terme") ? {type: "terme"} : terme)], "postprocess": val},
    {"name": "terme$subexpression$1", "symbols": [(lexer.has("pareng") ? {type: "pareng"} : pareng), "premisse", (lexer.has("parend") ? {type: "parend"} : parend)], "postprocess": function(data){return "(" + data[1] + ")";}},
    {"name": "terme", "symbols": ["terme$ebnf$1", "terme$subexpression$1"], "postprocess": function (data){if (data[0] !== null) return data[0].value + data[1]; else return data[1]}}
]
  , ParserStart: "src"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
