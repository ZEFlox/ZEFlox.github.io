function GetHeader(src) {

var ForReading=1;

var fso=new ActiveXObject("Scripting.FileSystemObject");

var f=fso.OpenTextFile(src,ForReading);

return(f.ReadAll());

}

var arr=GetHeader("read.txt").split("\r\n");

for(var i=0;i

alert("第"+(i+1)+"行数据为:"+arr[i]);

}