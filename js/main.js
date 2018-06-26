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
`;

writeStyles('' , result , ()=>{
    createPaper(()=>{
      writeContent(resume , ()=>{} )
    });
})

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
  fn.call();
}