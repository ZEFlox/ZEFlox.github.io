---
layout: default
title: "P-space"
---

# P-space

嗨，  
这次我们来谈谈 p-space，这是由 pmars08 实现的最后一个工具，它允许我们的战士根据比赛的历史来改变策略。  
P-space 是一个受保护的内存区域，也就是说，每个战士都有自己的 p-space，无法读取或写入对手的 p-space。P-space 只存储数值，而非完整的指令，通过两个特定的指令 LDP 和 STP 来加载和存储 P-space。

在每一轮开始时，p-space 的第 0 个单元存储着上一轮的结果（比赛最初为-1），其他单元则保持上一轮结束时的值（比赛开始时为 0）。如果我们输了，值为 0；如果我们存活，值为存活的战士数量；在标准的一对一比赛中，这些值是 1 代表胜利，2 代表平局。

使用 p-space 的战士被称为 p-warriors 或 p-switchers；它们在一个 p-space 位置中存储当前使用的策略信息。在每轮结束时，它们评估上一轮的结果，并根据该结果（有时也根据其他轮次的结果）决定是继续当前策略还是切换到另一个，以期获得更好的表现。实际上，如果你是一位制定长期战略的将军，那么切换者就是你的上校，在战场上决定用什么来对抗你的对手。  
需要重点说明的是，如果你没有可靠的战斗程序，即使是最好的切换程序也毫无价值；如果你的所有组件都输给了敌人，那么组合起来也会输，有时甚至更糟，因为你在开始时浪费了一些时间来计划本轮，并且需要将组件从庞大的战士主体中启动出去。  
P-space 是中级玩家的工具，不适合初学者；除非你至少有两个中等水平的不同战士（例如石头和布），否则你无法从中获得任何好处。

现在，让我们看看如何组装一个 p-warrior；首先，我们需要好的组件，能够针对不同类型的敌人得分；我们拥有这些组件：  
_Paper01_，用于对抗敌方轰炸机得分；_juliet storm_，用于击杀敌方扫描器；面对敌方布，我们并非毫无防备，布通常无法击败另一块布，因此我们应该能够：  
很好地对抗轰炸机，感谢*Paper01*  
很好地对抗扫描器，感谢*juliet*  
与复制器战平，感谢*Paper01*。

一旦选择了我们的“手牌”，我们就需要组装“大脑”；除非你想做一些非常复杂的事情，否则切换程序并不难做。让我们看一个非常简单且成功的例子，Jack in the Box 的切换程序，主要有三个原因：这是我的一个战士，表现良好，而且是唯一一个公开发布的:-)  
Jack 有两个组件，一个非常重的复制者（四倍的*Paper01*）和一个非常快速的轰炸机*Tornado*。  
它的策略很简单：复制者在对阵敌方轰炸机时能得很多分，但由于体积大，相当容易被扫描器攻击；如果我们赢了或平局，一切顺利，我们就继续同样的策略；如果遇到糟糕的扫描器杀死了布，那么，*Tornado*就会出现，以其高速和彩色炸弹杀死它。  
就是这样，确实非常简单。

```
        _RES    equ 0           ;pmars在这里加载结果
        _STR    equ 1           ;我在这里存储我的策略

res     ldp.ab  _RES,   #0      ;加载上一场比赛结果
str     ldp.a   _STR,   str1    ;加载正在使用的策略
        sne.ab  #0,     res     ;检查结果，胜利或平局都OK
lost    add.a   #1,     str1    ;输了就改变
        mod.a   #2,     str1    ;确保安全跳转
win     stp.ab  str1,   _STR    ;保存策略
str1    jmp     @0,     juliet
        dat     0,      paper
```

我们将上一场比赛的结果加载到 res.b，将我们使用的策略加载到 str1.a，然后将 res 与 0 比较，如果为零，我们就给策略加一，如果不为零（平局或胜利），我们就不加。mod 指令确保我们有一个 0 或 1 的值。  
最后，我们为本轮保存新策略，并根据 str1.a 跳转到轰炸机或布。  
我们在 7 个周期内完成，因此即使是 Qscan 也很难挂上。  
现在来看代码，无非是获取战士、切换程序并将它们组合在一起。

最后一个注意事项，差点忘了，P-space 有一个“阴暗面”，洗脑。  
你无法访问对手的 p-space，但如果你设法通过吸血鬼攻击迫使对手执行这些代码行或类似代码：

```
bwash   spl     0,>1
        stp.ab  #0,#0
        jmp     -2,{-1
```

（通常这段代码与其他 spl 和核心清除代码一起使用）

它的 p-space 很快就会充满垃圾，并且在接下来的回合中，它的切换程序很难找到做出正确决策所需的信息。所以，当你制作切换程序时，别忘了考虑如果你的 p-space 出了问题会发生什么，并且，最重要的是，在执行跳转之前永远不要忘记对你的 STR 值进行 mod。

```
        mod     #2, 1
str     jmp     @0, paper       ;一个字段保存策略
        dat     0,  juliet
```

如果你忘记了，你的战士可能不得不执行类似这样的指令：

```
str     jmp     @1234,paper
```

而你的得分可能会像 0/249/1 这样 :-(

以下是代码。我已将此战士提交到-94 和新手山，如果你有任何问题，或对结果感兴趣，请给我发邮件<bezz@iol.it>。

```
;redcode-b quiet
;name juliet and paper
;author M R Bremer, B. Bezzi
;strategy p-warrior for C.W. n.5 hint
;strategy switches juliet storm and Paper01
;kill juliet and paper
;assert CORESIZE == 8000

ptr     EQU     -1333
dest0   equ     2200
dest1   equ     3740
dest2   equ     -1278
range   equ     933

        RES     equ 0           ;here pmars loads results
        STR     equ 1           ;here I store my strategy

imp_sz  equ     2667

org     start

gate    dat <-445, <-446
s       spl #445, <-445
        spl #0, <-446
        mov {445-1, -445+2
        add -3, -1
        djn.f -2, <-2667-500
        mov 32, <-20
go      dat     #0,     #ptr
juliet  mov     {-1,    <-1
        mov     {-2,    <-2
        mov     {-3,    <-3
        mov     {-4,    <-4
        mov     {-5,    <-5
        mov     {-6,    <-6
        mov     gate,   ptr+24
        mov     gate,   ptr+24
        spl     @go,    <4000
        jmp     boot,   <4013
start

res     ldp.ab  RES,    #0      ;load result last match
str     ldp.a   STR,    str1    ;load strategy in use
        sne.ab  #0,     res     ;check result, win or tie OK
lost    add.a   #1,     str1    ;lost change
        mod.a   #2,     str1    ;secure jump
win     stp.ab  str1,   _STR    ;save strategy
str1    jmp     @0,     juliet
        dat     0,      paper



paper
        spl     1,      <300    ;\
        spl     1,      <400    ;-> generate 8 consecutive processes
        spl     1,      <500

silk    spl     @0,     {dest0
        mov.i   }-1,    >-1
silk1   spl     @0,     <dest1  ;split to new copy
        mov.i   }-1,    >-1     ;copy self to new location
        mov.i   bomba,  }range
        mov     {silk1, <silk2
silk2   jmp     @0,     >dest2
bomba   dat     <2667,  <1

for MAXLENGTH-CURLINE-9
        dat     0,0
rof

boot    spl     1      ,#0
        spl     1      ,#0
        spl     <0     ,#vector+1
        djn.a   @vector,#0

imp     mov.i   #0,imp_sz

        jmp     imp+imp_sz*7,imp+imp_sz*6
        jmp     imp+imp_sz*5,imp+imp_sz*4
        jmp     imp+imp_sz*3,imp+imp_sz*2
vector  jmp     imp+imp_sz  ,imp

        end
```
