var result = `
/*
*  各位面试官好， 我是黄洪涛
*  请允许我以自动敲代码的方式介绍一下我自己
*/

/* 首先给所有元素加上过渡效果 */
*{transition : all 1s}

/* 背景颜色太单调了， 让我们来点背景色吧 */
html{color: rgb(132,26,138); background-color:#C7EDCC;}

/* 加个边框吧， 文字离边框太近了 */
.code {
  padding : .5em;
  border: 1px solid white;
  margin : 2em;
  overflow : auto;
  height : 90vh;
  width : 50%;
}

/* 代码不够突出， 把代码高亮一下吧 */
.token.comment{color:slategray}
.token.selector{color:#690}
.token.punctuation{color:#999}
.token.property{color:#905}
.token.function{color:#DD4A68}

/* 加点3D效果吧 */
html{perspective : 1000px}
.code {
  position: fixed; left: 0; top: 0;
  -webkit-transition: none;
  transition: none;
  -webkit-transform: rotateY(10deg) translateZ(-100px) ;
  transform: rotateY(10deg) translateZ(-100px) ;
}

/* 接下来我给自己准备一个编辑器 */
.editor{
  width: 50%;
  height: 90vh;
  margin: 2em;
  padding: .5em;
  border: 1px solid white;
  overflow: auto;
  position: fixed;
  top: 0;
  right: 0;
  background-color:#fff;
  -webkit-transition: none;
  transition: none;
  -webkit-transform: rotateY(-10deg) translateZ(-100px) ;
  transform: rotateY(-10deg) translateZ(-100px) ;
}

/* 我开始写简历了，谢谢 */
`;

var resume =  `
黄洪涛
----

初级前端工程师 现在在XXX公司担任 嵌入式软件工程师

技能
----

* 前端 开发
* 嵌入式 开发
* Node.js 开发
* QT 开发

工作经历
----

1. 南京富士通电子科技
2. 南京XXX
3. 杭州XXX
4. 上海XXX

链接
----

* [GitHub](https://github.com/HongTao-Huang)
* [我的文章](https://hongtao-huang.github.io/)
* [fork me](https://github.com/HongTao-Huang/js-animation-resume)
`;

var result2 = `
  /* 这个简历好像差点什么
 * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
 * 简单，用开源工具翻译成 HTML 就行了
 */
`

var result3 = `
  /* 再对简历加点样式吧*/
  .editor{
    white-space : normal;
    padding : 2em;
    color : black;
  }

  .editor > h2{
    display: inline-block;
    border-bottom: 1px solid;
    margin: 1em 0 .5em;
  }

  .editor > ul , .editor > ol {
    list-style: none;
  }

  .editor ul> li::before{
  content: '•';
  margin-right: .5em;
  }
  .editor ol {
    counter-reset: section;
  }
  .editor ol li::before {
    counter-increment: section;
    content: counters(section, ".") " ";
    margin-right: .5em;
  }
  .editor blockquote {
    margin: 1em;
    padding: .5em;
    background: #ddd;
  }
`

writeStyles('', result , ()=>{
  createPaper();
  writeContent(resume , ()=>{
    writeStyles(result , result2 , ()=> {
      addMarkdown();
       writeStyles(result + result2 , result3 , ()=>{})
    })
  })
})

function addMarkdown(){
  ele('.editor').innerHTML = marked(ele('.editor').innerHTML);
}

function ele(selector){
  return document.querySelector(selector);
}

function writeContent(content , fn){
  var n = 0;
  var id = setInterval(()=>{
    n += 1;
    ele('.editor').innerHTML = content.substring(0 , n);
    if(n >= content.length){
      window.clearInterval(id);
      fn.call();
    }
  },1);
}

function writeStyles(preResult , nowResult , fn){
  var n = 0;
  var id = setInterval(()=>{
    n += 1;
    ele('.code').innerHTML = Prism.highlight(preResult + nowResult.substring(0 , n), Prism.languages.css, 'css');
    ele('#styleTag').innerHTML = preResult + nowResult.substring(0 , n);
    if(n >= nowResult.length){
      window.clearInterval(id);
      fn.call();
    }
  },1);
}

function createPaper(fn){
  var paper = document.createElement('pre');
  paper.className = 'editor';
  ele('.code').after(paper);
}