---
layout: default
title: "Hint002"
---

你是否经常自问：为什么我的战士在初学者模式中表现良好在 94 年的选秀大会上被击败？这个提示应该对所有新手都有帮助编写更具有可行性的代码。

我已要求排名第 15 的作者把他的战士角色发给我，以便我们进行剖析将其作为案例研究。感谢 Scott Manley 分享他的代码。如果你如果到本周末你处于第 15 位，你可能会收到我的邮件。不幸的是，_Mutagen_ 已经从山上掉下来了，但我怀疑 Scott 很快就会有一个全新的版本。

```
;redcode-b
;name Mutagen
;author Scott Manley
;strategy Scan -> SPL/JMP bomb -> split to Imp gate / 2 pass  forward
;strategy travelling core clear
;assert CORESIZE==8000

plength EQU     35
inc     EQU     6
carpet  EQU     (CORESIZE-MINDISTANCE)/inc


adds    DAT     #inc , #inc
begin   SPL     clear2
start   SEQ.I   *scan, @scan
        JMP     scan1
cont    ADD.F   adds , scan
        DJN     start , count
        JMP     clear3
scan1   MOV     sbomb , * scan
scan2   MOV     sbomb2 , @ scan
        JMP     cont
scan    DAT     MINDISTANCE-10 , MINDISTANCE-9
target1 DAT     23 , -23
target2 DAT     22 , -22
target3 DAT     -1 , -21
target4 DAT     -2 , -20
        DAT     0 , 0
        DAT     0 , 0
        DAT     0 , 0
        JMP     0 , } cont
clear2  MOV.I   sbomb , } target1
        DJN     clear2 , target1
        JMP     clear4
clear3  MOV.I   target2 , } target2
        DJN     clear3 , target2
clear1  MOV.I   target4 , { target4
        DJN     clear1 , target4
        JMP     0 , > -10
clear4  MOV.I   sbomb , { target3
        DJN     clear4 , target3
        MOV     0,1
sbomb   SPL     0 , 0
sbomb2  JMP     -1
count   DAT     #carpet-1,#carpet-1
        END     begin
```

基本概念是同时进行扫描（scan）和`spl` 核心清除（coreclear）。一旦扫描完成（通过一次核心），跳转到`dat` 核心清除跟随着`spl` 清除。虽然还涉及其他策略，但我们暂时先不讨论，重点关注扫描引擎和多遍核心清除。

Mutagen 的扫描有 11 行长——如果包括 stun bomb（眩晕弹），则总计 13 行。我们可以通过使用以下代码，在不过多影响行为的前提下稍微缩短长度：

```
        add.f split, scan
scan    sne.i loc1, loc+1
        djn.f -2, <DJNSTREAM1   ;djn.f 将使 a 和 b 字段的值都递减。
        mov.i split, *scan
        mov.i jump, @scan
        djn.f -5, <DJNSTREAM2   ;需要设置一个触发器，以便
        jmp clear               ;扫描完成后执行此操作。
split   spl #step, #step        ;尝试在代码中的任何位置
jump    jmp -1                  ;找到这些代码的其他用途
```

记住，你执行的代码越大，就越容易成为敌人的攻击目标。可以将 `split` 和 `jump` 指令从执行代码中移开，以尽可能缩小代码体积。另外：扫描步骤并非最优。如果敌人的指令位于位置 N，那么 N+1 的位置很可能也有另一条指令。因此，没有必要在那里扫描。有两种基本方法可以分散扫描。一种方法是先扫描 N 和 N+step 的位置，然后轰炸它们之间的每个位置。另一种方法是先轰炸 N 的位置，然后在单独的步骤中检查 N+step 的位置。查看 _Agony_ 和 _Irongate_ 以了解这两种方法的示例。

接下来，我们来谈谈多遍核心清除。_Muatagen_ 的清除过程冗长，容易被扫描器（scanner）发现。在多遍核心清除中，只有少数东西会发生变化——即被扫过核心的炸弹和执行扫除的指针。我们可以重用移动指令，只需用以下代码更改炸弹和指针：

```
org a1
ptr1    dat a1, end+100
a4      dat 0,  end+2+1
a3      dat 1,  end+2+2
a2      spl #2, end+2+3         ; spl #X, <-Y 类似于一个split 0。
a1      spl #3, end+2+4         ; 你可以将 x 和 Y 作为step值，
        mov *ptr1, >ptr1        ; 并将 b 字段的减量
        mov *ptr1, >ptr1        ; 作为imp gate的一部分。
        mov *ptr1, >ptr1        ; >（后增）会不断将 1 添加到
end     djn.f -3, <4000         ; ptr1 的 b 字段中，以使炸弹
                                ; 遍历核心。
```

清除从 `a1` 开始，通过核心进行扫除。注意，移动指令使用一个指针（`ptr1`）来确定要扫除哪个炸弹。ptr1 的 b 字段也用于执行实际的清除操作。当清除操作绕过核心时，它最终会用 `a1` 覆盖 `ptr1`。现在，移动指令会查看旧 `ptr1` 的位置，以确定它们应该通过核心移动什么。新的 `ptr1`（`a1`）指向 `a2`，因此移动指令将通过核心移动 `a2`。新的指针还有一个新的 b 字段。这个 b 字段的值确保清除操作跳过核心清除代码。然后 `a2` 覆盖指针。现在指针指向 `a3`。以此类推。此代码将继续清除，直到时间耗尽。

```
7 44/ 38/ 18 Hint Test M R Bremer 151 5
```

这些改进的一个简单版本已被提交给初学者山丘。该代码在对抗轰炸机（bomber）和复制器（replicator）时表现相当不错，但其体积庞大，容易受到扫描器的攻击。一个不错的方案是，用一个小型快速轰炸机对其进行 pspace 测试。
