(()=>{new EventSource("/esbuild").addEventListener("change",()=>location.reload());var t=document.getElementById("root"),n=`
    Hi, I'm Ayush.

    Software Developer.
`;if(t!==null){let e=0;setInterval(()=>{e<n.length&&(n[e]===`
`&&(document.getElementById("root").innerHTML+="<br>"),document.getElementById("root").innerHTML+=n[e],e++)},150)}})();
