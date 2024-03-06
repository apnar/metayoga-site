for i in *html; do echo $i; NUM=`grep -n "footer class" $i | sed 's/:.*//'`; head -n +${NUM} $i | head -n -2 > ${i}.new; cat ${i}.new footer.part > ${i}; rm ${i}.new; done
