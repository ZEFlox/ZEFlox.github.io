;redcode-94
;name Print Machine r3.0
;author Flox
;r3.0

PS	FOR	0
	此为打印机程序
	欢迎更改/增加功能
	使用前请将战士长度上限改为最大
	否则无法运行(过长
	ROF

;画布数据
line equ #CORESIZE -1        ;每行的格数(最大
lent equ #CORESIZE -1         ;每列的格数(最大
lenp equ #128        ;core画面中每行的格数(此为Corewin下的数据,其他虚拟机请自行调整
strp equ #500      ;开始点离runn的距离

ORG	start

;开始时的寄存/等待所有颜料寄存完毕
start	SPL	n0-2,	0
	SEQ	pd,	#8	;颜料数,若只用单色打印机请调成#1
	JMP	start+1,	0

load mov     date,    wait
     sub.f   wait,    wait 
mode mod.a   line,   *load
     mod.ab  lent,   *load

;比对指令进行跳转
same sne.i   wait,    comm
     jmp     ende,    0
     sne.i   wait,    comm+1
     jmp     splc,    0    
     sne.i   wait,    comm+2
     jmp     colr,    0
     jmp     retn,    0
comm dat     0,       0
     spl    #0,      #0
     ldp.i   0,       0

     dat     strp,    strp 
;将坐标转换为地址
retn mul.ab  lenp,   *load
     add.x  *load,   *load
     add.f   retn-1, *load
;画点
prit mov.f  *load,    wait
     mov     wait,    runn
     spl     runn,   }load
     jmp     load,    0    

;画矩形(双循环
splc    sub.ab *load,   wait
        add     lenp,   wait
        add.x   wait,   wait
        jmp     stfr,   0
fors	add.f   wait,   runn
        jmp     stfr,   0
forf    spl     runn,   0
        nop     0,      0
        nop    }runn,  >runn
stfs	seq.ab	*load,	fdat
    	jmp 	forf,  >fdat
    	sub.ab	*load,	fdat
fdat	jmp 	fors,	#0
stfr    seq.b	*load,	sdat
    	jmp 	stfs,  >sdat
    	sub.b	*load,  sdat
sdat	jmp 	1,	#0
    	jmp 	load,  }load

;更改颜色
colr	MUL.A	#2,	*load
	ADD.A	#1,	*load
	MOV.A	*load,	2
	ADD.A	#1,	load
	JMP	0,	0	

code	ADD	#1,	n0
	DAT	0,	0
	ADD	#1,	n1
	DAT	0,	0
	ADD	#1,	n2
	DAT	0,	0
	ADD	#1,	n3
	DAT	0,	0
	ADD	#1,	n4
	DAT	0,	0
	ADD	#1,	n5
	DAT	0,	0
	ADD	#1,	n6
	DAT	0,	0
	ADD	#1,	n7
	DAT	0,	0

;临时储蓄
wait nop     0,       0

;待机
ende jmp     0,       0

;运行
runn nop     0,       0
     dat     0,       0


pd	DAT	0,	0


;寄存器（储存颜料
	ADD	#1,	pd
	SEQ	n0,	#1
n0	JMP	-1,	0
	SUB	#1,	-1
	SPL	load,	0
	JMP	n0-1,	0

	DAT.I	001,	100
	ADD	#1,	pd
	SEQ	n1,	#1
n1	JMP	-1,	0
	SUB	#1,	-1
	SPL	load,	0
	JMP	n1-1,	0

	DAT.I	002,	200
	ADD	#1,	pd
	SEQ	n2,	#1
n2	JMP	-1,	0
	SUB	#1,	-1
	SPL	load,	0
	JMP	n2-1,	0

	DAT.I	003,	300
	ADD	#1,	pd
	SEQ	n3,	#1
n3	JMP	-1,	0
	SUB	#1,	-1
	SPL	load,	0
	JMP	n3-1,	0

	DAT.I	004,	400
	ADD	#1,	pd
	SEQ	n4,	#1
n4	JMP	-1,	0
	SUB	#1,	-1
	SPL	load,	0
	JMP	n4-1,	0

	DAT.I	005,	500
	ADD	#1,	pd
	SEQ	n5,	#1
n5	JMP	-1,	0
	SUB	#1,	-1
	SPL	load,	0
	JMP	n5-1,	0

	DAT.I	006,	600
	ADD	#1,	pd
	SEQ	n6,	#1
n6	JMP	-1,	0
	SUB	#1,	-1
	SPL	load,	0
	JMP	n6-1,	0

	DAT.I	007,	700
	ADD	#1,	pd
	SEQ	n7,	#1
n7	JMP	-1,	0
	SUB	#1,	-1
	SPL	load,	0
	JMP	n7-1,	0

PS	FOR	0
-----------------
数据库使用指令:
-----------------
画点指令:
	1.SPL	X,	Y	--在(X,Y)位置画实心块
	2.NOP	>X,	>Y	--在(X,Y)位置画+型块
	3.NOP	<X,	<Y	--在(X,Y)位置画-型块
	4.MOV	X,	Y	--在(X,Y)位置画X型块
	5.SNE	@X,	@Y	--在(X,Y)位置画*型块
特殊指令:
	1.LDP.I	槽数,	0	--将颜色切换为槽数所存储的颜色
	2.SPL	#L,	#H	--以上一个画点指令坐标为基准点,向右向下绘制长L,宽H的矩形
	3.DAT			--程序进行待机
-----------------
注:可搭配FOR使用
-----------------
	ROF

date	LDP.I	2,	0
	SPL	1,	4
	SPL	#10,	#8
	NOP	>11,	>4
	SPL	#2,	#8
	MOV	4,	12
	SPL	#7,	#1
	SPL	4,	13
	SPL	#6,	#7
	NOP	>10,	>13
	SPL	#1,	#7
	SNE	@2,	@8
	SNE	@4,	@8
	SNE	@5,	@9
	SNE	@6,	@8
	SNE	@9,	@8
	LDP.I	3,	0
	SPL	5,	1
	SPL	6,	2
	SPL	6,	3
	MOV	7,	3
	MOV	8,	2
