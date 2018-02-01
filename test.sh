#!/bin/bash

nearleyc  $1 > $1.js
echo "a"
nearley-test  $1.js -q -i "a"
echo "~a"
nearley-test  $1.js -q -i "~a"
echo "a⊃b"
nearley-test  $1.js -q -i "a⊃b"
echo "a⊃b∴b"
nearley-test  $1.js -q -i "a⊃b∴b"
echo "a∧(b∨c)"
nearley-test  $1.js -q -i "a∧(b∨c)"
echo "(a∧(b∨c))⊃c,b∧a∴c"
nearley-test  $1.js -q -i "(a∧(b∨c))⊃c,b∧a∴c"
echo "(a∧~(b∨c))⊃c,b∧a∴c"
nearley-test  $1.js -q -i "(a∧~(b∨c))⊃c,b∧a∴c"
echo "[(a∨c)⊃b,a∴b],b⊃p,(p∧q)≡x∴x⊃p"
nearley-test  $1.js -q -i "[(a∨c)⊃b,a∴b],b⊃p,(p∧q)≡x∴x⊃p"
echo "multiline"
nearley-test $1.js -q -i "a
~a
a⊃b
a⊃b,a∴b
a∧(b∨c)
(a∧(b∨c))⊃c,b∧a∴c
(a∧~(b∨c))⊃c,b∧a∴c
[(a∨c)⊃b,a∴b],b⊃p,(p∧q)≡x∴x⊃p"
