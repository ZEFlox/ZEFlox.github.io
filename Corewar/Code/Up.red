;redcode-94
;name Up
;author	Flox

ORG	start

;寻找槽位标识符
start	SEQ	0,	code
	JMP	start,	{-1
	ADD.A	#1,	start
	SPL	*start,	0

;抹除自身,减少对SPL画点的影响
die	MOV	code,	start
	JMP	-1,	>-1

code	DAT.I	001,	100	
	;选择槽位,共有1-7槽位,格式如上,多颜色时需改动
