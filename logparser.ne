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
src -> argument (%nl src {% function(data){return data[1]}%}):? {% function(data) {var out = [data[0]];if (data[1] !== null) out = out.concat(data[1]);return out;}%}
#src -> argument (%nl src):?
argument -> premisse:+ %donc premisse:+ {% function (data) {return data[0].concat(data[2]);}  %}
	| premisse {% function (data) {return data[0];}  %}
premisse -> terme (%opBin {% val %}) terme %np:? {%function(data){return data[0] + data[1] + data[2];}%}
	| %brakg argument %brakd %np:? {%function(data){return data[1];}%}
	| terme %np:? {% function (data){return data[0];} %}
terme -> %opUna:? (%terme {% val %}|%pareng premisse %parend {%function(data){return "(" + data[1] + ")";}%}) {%function (data){if (data[0] !== null) return data[0].value + data[1]; else return data[1]}%}
