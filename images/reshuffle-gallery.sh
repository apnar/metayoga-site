#!/bin/bash

for i in gallery-*jpg; do X=`echo $i | sed 's/gallery/mix/'`; mv $i $X; done
seq -w `ls mix-??.jpg | wc -l` | shuf > gallery-mix-mapping
for i in mix-??.jpg; do ORIG=`echo $i | sed -e 's/mix-//' -e 's/.jpg//'`; NEW=`cat gallery-mix-mapping | sed -n "${ORIG}p"`; echo $ORIG $NEW; mv mix-${ORIG}.jpg gallery-${NEW}.jpg; mv mix-${ORIG}t.jpg gallery-${NEW}t.jpg;done
rm gallery-mix-mapping
