(this["webpackJsonptweeter-web"]=this["webpackJsonptweeter-web"]||[]).push([[0],[,,,,,,,function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},function(e,t,a){e.exports=a(15)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(6),c=a.n(s),o=(a(13),a(7)),i=a.n(o),l=(a(14),a(4)),u=a(1);function m(e){var t=r.a.createRef(),a=Object(n.useState)([]),s=Object(u.a)(a,2),c=s[0],o=s[1];return r.a.createElement("div",{className:e.className},r.a.createElement("div",{className:"col-12 mb-3"},r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var a=t.current.value,n=Object(l.a)(c);n.unshift({content:a,likes:0,id:9999}),o(n),t.current.value=""}},r.a.createElement("textarea",{ref:t,required:!0,className:"form-control",name:"tweet"}),r.a.createElement("button",{type:"submit",className:"btn btn-primary my-3"},"Tweet"))),r.a.createElement(p,{newTweets:c}))}function p(e){var t=Object(n.useState)(e.newTweets?e.newTweets:[]),a=Object(u.a)(t,2),s=a[0],c=a[1],o=Object(n.useState)([]),i=Object(u.a)(o,2),m=i[0],p=i[1];return Object(n.useEffect)((function(){var t=Object(l.a)(e.newTweets).concat(s);t.length!==m.length&&p(t)}),[e.newTweets,m,s]),Object(n.useEffect)((function(){!function(e){var t=new XMLHttpRequest;t.responseType="json",t.open("GET","http://localhost:8000/api/tweets/"),t.onload=function(){e(t.response,t.status)},t.onerror=function(){e({message:"There was an error with the request"},400)},t.send()}((function(e,t){c(e)}))}),[]),m.map((function(e,t){return r.a.createElement(k,{tweet:e,key:t,className:"my-5 py-5 border bg-white text-dark"})}))}function w(e){var t=e.tweet,a=Object(n.useState)(t.likes?t.likes:0),s=Object(u.a)(a,2),c=s[0],o=s[1],i=Object(n.useState)(!1),l=Object(u.a)(i,2),m=l[0],p=l[1];return r.a.createElement("div",{className:"btn btn-group"},r.a.createElement(d,{tweet:e.tweet,likes:c,setLikes:o,userLiked:m,setUserLiked:p,action:{type:"like",display:"Likes"}}),r.a.createElement(d,{tweet:e.tweet,likes:c,setLikes:o,userLiked:m,setUserLiked:p,action:{type:"unlike",display:"Unlikes"}}),r.a.createElement(d,{tweet:e.tweet,action:{type:"retweet",display:"Retweet"}}))}function d(e){var t=e.action,a="like"===t.type?"".concat(e.likes," ").concat(t.display):t.display;return r.a.createElement("button",{className:"btn btn-primary btn-sm",onClick:function(a){a.preventDefault(),"like"===t.type?!1===e.userLiked&&(e.setLikes(e.likes+1),e.setUserLiked(!0)):"unlike"===t.type&&!0===e.userLiked&&(e.setLikes(e.likes-1),e.setUserLiked(!1))}},a)}function k(e){var t=e.className?e.className:"col-10 mx-auto col-md-6";return r.a.createElement("div",{className:t},r.a.createElement("p",{key:"id-".concat(e.idx)},e.tweet.content),r.a.createElement(w,{tweet:e.tweet}))}var f=function(){return r.a.createElement("div",{className:"App"},r.a.createElement("header",{className:"App-header"},r.a.createElement("img",{src:i.a,className:"App-logo",alt:"logo"}),r.a.createElement("p",null,"Tweet something :)"),r.a.createElement("div",null,r.a.createElement(m,null)),r.a.createElement("a",{className:"App-link",href:"https://reactjs.org",target:"_blank",rel:"noopener noreferrer"},"Learn React")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[8,1,2]]]);
//# sourceMappingURL=main.950104a6.chunk.js.map