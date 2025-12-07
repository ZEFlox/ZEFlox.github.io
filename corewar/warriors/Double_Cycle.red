fors	nop 	0,	0
forf	nop 	0,	0
    	seq.ab	date,	fdat
    	jmp 	forf,	>fdat
    	sub.ab	date,	fdat
fdat	jmp 	1,	#0
    	seq.b	date,	sdat
    	jmp 	fors,	>sdat
sdat	jmp 	ende,	#0
ende	jmp 	0,	0
date	spl 	#3,	#3