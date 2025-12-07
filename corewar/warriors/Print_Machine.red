;redcode-94
;name print machine
;author Flox

line equ #10
lent equ #10
lenp equ #97
strp equ #1000

load mov     date,  wait
     sub.f   wait,  wait

mode mod.a   line, *load
     mod.ab   lent, *load

retn mul.ab  lenp, *load
     add.x  *load, *load
     add.f   ende+1, *load

same sne.i   wait,  3
     jmp     ende,  0
     jmp     wait-1,  0
     spl     0,     0

     mov.f  *load,  wait

wait nop     0,     0
     jmp     load,  }load
ende jmp     0,     0
     dat     strp,  strp
date mov     0,     0
     mov     0,     1
     mov     0,     2
     mov     5,     0
     mov     5,     1
     mov     5,     2
     mov     2,     3
     mov     3,     3
     spl     0,     0
