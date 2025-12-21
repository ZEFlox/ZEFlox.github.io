---
layout: default
title: "Hint004"
---

Core Warrior #2 对 Scott Manley 的*Mutagen*进行了一些改进。我们将持续改进这款战士游戏，直到它达到入门级游戏的巅峰。这是一项艰巨的挑战吗？我们拭目以待。下面附上*原本*位于入门级游戏的代码：

```
;redcode-b
;name Hint Test v2
;author M R Bremer
;strategy Original code based on Scott Manley's Mutagen
;strategy Once through scan --> spl spl dat dat coreclear
;strategy Core_Warrior_ #2:  compressed code
;kill Hint
;assert CORESIZE==8000

step EQU 11

begin   SPL     a1+2
        jmp start
for 20
        dat 0, 0
rof
start   add.f split, scan
scan    sne.i 112, 113
        djn.f -2, <-400         ;djn.f will decrement both the a and b field
        mov.i split, *scan
        mov.i jump, @scan
        jmn.b -5, scan
        jmp a1
split   spl #step, #step        ;try to find other uses for these
jump    jmp -1                  ;can be anywhere in code
        DAT     0 , 0
        DAT     0 , 0
        DAT     0 , 0
ptr1    dat a1, out+200
a4      dat 0,  out+2+1
a3      dat 1,  out+2+2
a2      spl #2, out+2+3
a1      spl #3, out+2+4
        mov *ptr1, >ptr1
        mov *ptr1, >ptr1
        mov *ptr1, >ptr1
out     djn.f -3, <4000
        END     begin
```

Hint Test 引入到山上时获得了第#7 名。所有成功登上山顶的复制者（我相信这要归功于 Beppe Bezzi 的提示）都将难度推得更高。除非你昏迷了，否则你应该已经意识到，由于贝齐所描述的优化程序，未来的纸将会更加棘手。为了让*Mutagen*能够生存下去，我们必须改进其扫描器组件。而你们这些扫描器高手在对抗突变体时得分太高了。是时候结束这种局面了。
一款 PSP 游戏轰炸机应该能解决问题。你很幸运，我们把这个步骤留到下周 Bezzi 介绍轰炸机提示时再说。

扫描器（SCANNER）：这是一个很大的话题。扫描器大致分为两种——JMZ 扫描器和 CMP 扫描器。JMZ 扫描器体积很小，但只能以 1 个扫描周期（即 0.5 个时钟周期）扫描两个指令循环中的核心。一个简单的 JMZ 扫描器可能看起来像这样：

```
inc     add.ab #8, scan         ;设置扫描位置
scan    jmz.f -1, 100           ;如果b字段指向的两个值都是0，转到inc
attack  mov bomb, @-1           ;攻击
        jmn.a -3, -2            ;检查一下是否已完成
bomb    spl #0, <-10
        mov 1, <attack          ;核心清除
        dat <-11, <-11
```

核心最初填充的是`dat0, 0`（显然）。在大多数情况下，`add`/`jmz.f` 行会不断循环，因为扫描的 b 值很可能指向空核心指令。只有当 `jmz.f` 指向至少有一个非零操作数的核心位置时，它才不会循环。希望这是敌方代码。你可以随意攻击它，然后流程会循环回到 `add`/`jmz.f` 扫描。当你最终轰炸“scan”行时，`jmn.a` 将直接跳过。这将开始你的核心清除过程，并以一个 imp 门结束。虽然上述战士可以工作，但它存在几个主要问题。
8 并不是一个非常理想的步长，而且纸张需要不止一颗分裂炸弹才能充分击晕它。使用`spl 0`/`jmp -1`、`spl 0`/`spl 0`/`jmp -2`或`spl 0, 2`/`mov -1, >-1`炸弹进行攻击，以获得额外的击晕效果。Paulsson 的*myZizzor*使用了一次性通过的 jmz 扫描，配合可变长度的 spl 0 地毯，效果显著。现已发布一个版本。今天就获取您的副本吧。

CMP 扫描器（Cmp scanners）体积更大，但速度更快。它们可以在一个包含三条指令的循环中扫描两个位置，速度为 0.66c。基本的扫描引擎大致如下：

```
inc     add step, scan
scan    cmp 100, 112    ;记住cmp和seq是一样的！
        slt.ab #special_value, scan     ;我们待会儿将讲讲这个值
        djn.f inc, <STREAM
attack  <我们在这里可以做不同的事情>
check   <用于判断扫描是否完成的代码>
clear   <进行核心清除>
step    dat X, X
```

由于核心的大部分位置都被填充为`dat 0, 0`，`cmp`指令很可能会比较这些空的核心位置。因此，它会跳过`slt`指令。`add`/`cmp`/`djn`循环将重复，直到 a 或 b 操作数指向不同的指令。这些位置（a 或 b）之一可能包含敌方代码。当`cmp`发现某些内容时，会执行`slt`指令。该指令用于保护扫描代码免受自我轰炸。当扫描程序发现自身时，`slt`会检查其中一个指针，并确保它大于扫描程序中的最后一条指令。如果是这样，它会跳过`djn`指令并执行攻击程序。否则，将执行 djn 指令，并继续扫描。
注意，前两条指令并未受到保护。我们可以利用这一事实来判断何时启动核心清除程序。希望稍后通过一些示例，这一点会变得更加清晰。

尽管 cmp 扫描器速度更快，但我们得有办法同时检查或攻击 a 和 b 两个目标。毕竟，敌方代码可能位于 a 或 b（或者两者都有）。我知道两种方法。

攻击 b 值，然后在扫描中加入一个特殊偏移量，使最后一次扫描的 a 值变为 b 值。这样，如果目标存在，它将在第二次“特殊”扫描中被攻击。*Iron Gate*采用了这种方法，具体内容如下（希望作者不介意）：

```
;redcode
;name Iron Gate
;author Wayne Sheppard
;strategy CMPscanner

dist equ 98
scan equ dist*2

a add d,@x
c cmp a+dist,a
  slt #20,@x
  djn a,<7000
  mov j,@c
x mov s,<c
  sub n,@x
  jmn c,a
s spl 0,<1-dist
  mov 2,<-3
j jmp -1
n dat <0-dist,<0-dist-1
d dat <scan,<scan
```

'd'是常规扫描步长，'n'是特殊步长。如果`cmp`发现某些东西，则攻击 b 值对应的位置。从扫描中减去特殊步长，然后重复扫描。现在，旧的 a 值就是减法后的新 b 值。这确保了 a 值和 b 值所指向的两个位置都得到了检查。当'a'被`jmp -1, 0`（记住，`slt`上方的指令不受保护）轰炸时，`jmn`指令将不会跳转。相反，`spl`指令's'将执行，并且核心清除将开始。

攻击两个指针的另一种方法是轰炸 a、b 以及它们之间的每条指令。让我们以*Agony*为例来说明这种技巧。

```
;redcode-94
;name Agony II
;kill Agony
;author Stefan Strack
;strategy Small-interval CMP scanner that bombs with a SPL 0 carpet.
;strategy This is the good old '88 Agony with some '94 enhancements:
;strategy  - boots off decoy to delay (quick)scanners; erases boot pointer
;strategy  - optimized decoy to avoid self-triggering for more than 6000 cycles
;strategy Submitted: Sun Jul 31 14:11:05 CDT 1994
;pushed off at age 912 more than 14 months later
;assert CORESIZE == 8000
;$Id: agony_2.red,v 1.4 1995/07/12 07:03:46 stst Exp stst $

CDIST   equ 12
IVAL    equ 42
FIRST   equ scan+OFFSET+IVAL
OFFSET  equ IVAL
DJNOFF  equ -431
DESTIN  equ 2878

scan    sub incr,comp
comp    cmp a=FIRST-CDIST,b=FIRST
        slt #incr-comp+CDIST+(bptr-comp)+1,comp
        djn.f scan,<c=FIRST+DJNOFF
bptr    mov.b comp,#bptr
        mov #d=CDIST+(bptr-comp)+1,count
split   mov bomb,<bptr
count   djn split,#0
        jmn.a scan,*0
bomb    spl #0,>-IVAL+1
        mov incr,<-2
incr    dat >-IVAL,>-IVAL
```

*Agony*对位置 N 和 N+12 进行比较。其扫描阶段与*Iron Gate*的操作方式大致相同。然而，它在攻击 a 指针和 b 指针时采用了完全不同的方法。如果它发现了目标，就会用`spl 0`轰炸位置 N、N+1、N+2 ... N+12、N+13、N+14 和 N+15。同样，当*Agony*攻击其自身未受保护的代码时，核心清除程序就会启动（`jmn`会崩溃）。

我们将利用*Iron Gate*的常数和基本结构，但会特别针对 a 和 b 位置进行攻击。

```
dist equ 98
scan equ dist*2

a add d,c
c cmp a+2*dist,a+dist
  slt.a #dist+m-a, c
  djn.f a,<7000
  mov s, *c
x mov m, @c
  jmn a,a
s spl #-dist+1, <0
  mov 1, <-3
d dat <scan,<scan
m mov.i dist, }dist
```

现在你应该已经了解了`add`/`cmp`/`slt`/`djn`扫描引擎的工作原理。让我们再深入探讨一下`slt`指令。假设核心从上到下编号，编号范围为 0 到 8000。将`slt`的 a 值设为低指针，b 值设为高指针。因此，扫描过程大致如下：

```
0  <-- b 值 ( 高指针 )
1
2
.
.
.
96
97
98 <-- a 值 ( 低指针 )
```

上述的`slt`会检查低指针是否等于“特殊值”。如果该值是我代码的长度，比如 10，那么只有当 10 小于 a 值时，才会进行攻击。这可以保护`slt`及其下方的指令免受 a 指针的攻击。然而，如果 b 值指向你的代码，你就会被轰炸。因此，我们可以在指针与特殊值之间的距离上再加一层保护，以确保扫描代码在面对 b 指针时也是安全的。记住，`slt`上方的指令不受低指针的保护。上方的扫描器会设置扫描，使 a 值指向`add`指令。它不受保护，所以会被轰炸。`jmn`会检测到这个炸弹，它不会循环回到扫描，而是直接跳到核心清除。明白了吗？（哎呀，我可能把大家搞得够糊涂了，以至于没人愿意编写扫描器了。 ）

上方的扫描仪会投掷一枚燃烧弹。如果你不太了解它是如何工作的，追踪 m 指令，并观察当敌方复制者执行该指令时会发生什么。使用这种炸弹，自我分裂的轰炸机会受到严惩。

好了，我们快到了。我们可以把这个插入到*Mutagen*的扫描仪部分。
提高“特殊值”，这样扫描器就不会炸毁多次核心清除器。将清除器切换为向后移动，而不是向前移动（这样就不会把扫描器击晕）。扫描器的清除会干扰多次清除，所以我改为使用相同的炸弹和指针。这不是最佳解决方案，因为扫描和清除应该彼此独立运行。如果复制器覆盖了清除，那么扫描器正在使用的清除指针也很可能被打乱。好吧，这就是全部内容：

```
;redcode-b
;name Hint Test v4
;author M R Bremer
;strategy Original code based on Scott Manley's Mutagen
;strategy Once through scan --> spl spl dat dat coreclear
;strategy Core_Warrior_ #2:  compressed code
;strategy Core_Warrior_ #4:  improved scanner
;kill Hint
;assert CORESIZE==8000

dist equ 98
scan equ dist*2

begin   SPL     b1+2
        jmp a
for 20
        dat 0, 0
rof
a       add d,c
c       cmp a+2*dist,a+dist
        slt.a #dist+ptr2-a, c
        djn.f a,<7000
        mov s, *c
x       mov m, @c
        jmn a,a
s       spl #-dist+1, <0
        mov *ptr2, <ptr2
d       dat <scan,<scan
m       mov.i dist, }dist
        dat 0, 0
        dat 0, 0
        dat 0, 0
        dat 0, 0
b5      dat 0, 0
b4      dat b5-ptr2, a-2-8
b3      dat b4-ptr2, a-2-7
b2      spl #b3-ptr2, a-2-6
b1      spl #b2-ptr2, a-2-5
        mov *ptr2, <ptr2
        mov *ptr2, <ptr2
        mov *ptr2, <ptr2
        djn.f -3, <6000
ptr2    dat b1, -100+a
        END     begin
```

诶呀 *Hint Test*表现更差！

```
10 29/ 41/ 30 Hint Test v4 M R Bremer 116 1
```

与其让扫描仪独立进行清除，不如直接跳到 b1。好多了。

```
7 31/ 32/ 37 Hint Test v4 M R Bremer 131 1
```

遗憾的是，提示测试的得分仍然大致相同。真是难以想象。它在纸上的表现确实不错，但在扫描仪面前却一败涂地。轰炸机的表现则大约是五五开。不久后将再次上山的*Hint Test*（我还未收到结果），试图通过将第一个`dat`清除更改为`dat X, <2667`，来更有效地消灭 imp。改进*Mutagen*的下一步将是为其配备一个小型轰炸机。敬请关注。

太基础了？太复杂了？我是个糟糕的 redcode 程序员？我毫无头绪？需要更多解释吗？尽管骂我吧（只要别把我妈扯进来）。

<bremermr@ecn.purdue.edu>。
