# Core War - An Introduction to Hostile Programming


Core War is a programming game first introduced by A. K. Dewdney in the 1980s, played between computer programs written in Redcode, a language similar to assembly. Programmers design their battle programs to remove opponents from the memory of the MARS virtual computer by any means possible.

Some of the simpler techniques include blindly overwriting memory, searching for the opponent, or spawning off new copies of the program. These are commonly known as stone, scissors, paper after the popular playground game. Stone usually wins against scissors, scissors normally defeat paper, and paper usually beats stone.

Here's an example of a typical Core War program:

         org   wipe

         step  equ 5
         first equ bomb-10
    
    bomb:mov.i #1,       -1
    
    ptr: sub   #step,    #first
    wipe:jmz.f ptr,      @ptr

         mov   bomb,     >ptr
         djn.f wipe,     {ptr-5

         end

This simple example of scissors once held a 20-point lead over its rivals. The first instruction is never executed, it's the bomb used to overwrite opponents. The next two instructions form a loop which looks through memory for an opponent, and the final two instructions actually overwrite it.

Core War is still going strong, and celebrated its 40th anniversary in 2024. If you'd like to discover more about Core War, here are the top resources:

*   [The Beginner's Guide to Redcode](https://corewar.co.uk/karonen/guide.htm) will teach you the language of Core War
*   [pMARS](https://corewar.co.uk/pmars.htm) is a portable command-line implementation of the Core War virtual machine
*   [CoreWin](https://corewar.co.uk/wendell) is a Windows implementation of Core War
*   [Corewar Tutorials](https://corewar.co.uk/guides.htm) exist on virtually every aspect of the game
*   [Koenigstuhl](https://asdflkj.net/COREWAR/koenigstuhl.html) is an archive of over 4000+ published Core War programs
*   [KOTH.org](http://koth.org) and [SAL](https://sal.discontinuity.info) organise a number of on-going king of the hill tournaments
*   [Core War UK](https://corewar.co.uk) and [@xcorewar](https://twitter.com/xcorewar) on twitter report the latest Core War news
*   [rec.games.corewar](news:rec.games.corewar) on Usenet is the official Core War discussion group
*   [Evolved Core-Warriors](https://newton.freehostia.com/net/corewar/evol/) if you'd prefer to use genetic programming to evolve programs

What are your experiences with Core War, have you ever had any success?