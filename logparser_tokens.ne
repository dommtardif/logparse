@{%
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
%}

# Pass your lexer object using the @lexer option:
@lexer lexer

# Use %token to match any token of that type instead of "token":
src -> argument (%nl src):?
argument -> premisse:+ %donc premisse:+
	| premisse
premisse -> terme %opBin terme %np:?
	| %brakg argument %brakd %np:?
	| terme %np:?
terme -> %opUna:? (%terme |%pareng premisse %parend) 
