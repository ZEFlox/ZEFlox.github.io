;redcode-94
;name print machine
;author Flox

;啊十分好用（
;画布数据
line equ #31        ;每行的格数
lent equ #31         ;每列的格数
lenp equ #83        ;core画面中每行的格数
strp equ #100      ;开始点离runn的距离

load mov     date,    wait
     sub.f   wait,    wait ;读取指令并清0
mode mod.a   line,   *load
     mod.ab  lent,   *load ;模数防止超出画布
same sne.i   wait,    comm
     jmp     ende,    0
     sne.i   wait,    comm+1
     jmp     splc,    0    ;比对指令后跳转
     jmp     retn,    0
comm dat     0,       0
     spl    #0,      #0

;像函数的东东
     dat     strp,    strp ;更快速加法（？
retn mul.ab  lenp,   *load
     add.x  *load,   *load
     add.f   retn-1, *load
prit mov.f  *load,    wait
     mov     wait,    runn
     spl     runn,   }load
     jmp     load,    0    ;将坐标转换为地址

;画矩形的东东（使用双重循环）
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
    	jmp 	forf,	>fdat
    	sub.ab	*load,	fdat
fdat	jmp 	fors,	#0
stfr    seq.b	*load,	sdat
    	jmp 	stfs,	>sdat
    	sub.b	*load,  sdat
sdat	jmp 	1,	#0
    	jmp 	load,	}load

;临时储蓄
wait nop     0,       0

;结束后待机用
ende jmp     0,       0

;运行用
runn nop     0,       0
     dat     0,       0

;数据库
;使用方法：在A操作数写下x坐标，B操作数写y坐标
;在corewar.io中：mov [x], [y] 为画X，sne @[x], @[y] 为画 • （其他模拟器大体相似）
;目前有2种特殊指令，spl与dat
;spl用于画矩形，前面需要mov或sne进行初始点定位，A操作数为左右宽度，B操作数为上下宽度，以初始点向右、向下绘制实心矩形
;dat表示绘制结束，一般不用填写（core内全是dat，执行到数据库下一行会自动执行dat）
date sne    @0,      @1 
     spl    #30,     #30
     mov     1,       8
     spl    #28,      #7
     mov     8,       15
     spl    #14,     #9
     mov     12,      24
     spl    #6,      #4
     mov     4,       15
     spl    #4,      #5
     mov     22,      15
     spl    #4,      #5
     mov     4,       4
     spl    #8,      #4
     mov     18,      4
     spl    #8,      #4
     mov     6,       3
     spl    #4,      #1
     mov     20,      3
     spl    #4,      #1
     mov     2,       6
     spl    #2,      #2
     mov     12,      6
     spl    #2,      #2
     mov     16,      6
     spl    #2,      #2
     mov     26,      6
     spl    #2,      #2
     mov     2,       15
     spl    #2,      #2
     mov     26,      15
     spl    #2,      #2
     mov     6,       20
     spl    #2,      #2
     mov     22,      20
     spl    #2,      #2
     mov     10,      24
     spl    #2,      #2
     mov     18,      24
     spl    #2,      #2
     mov     14,      28
     spl    #2,      #2
