window.onload = function () {
  let h2 = document.querySelectorAll('#__next h2');
  let h3 = document.querySelectorAll('#__next h3');
  let Observer = new IntersectionObserver(function (entries) {
    entries.reverse().forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.textPurple700();
      } else if (entry.target.isActived) {
        entry.target.untextPurple700();
      }
    });
    lastScrollTop = document.scrollingElement.scrollTop;
  });
  
  // 添加标题头
  navbanner.insertAdjacentHTML('beforebegin','<h2 class="mb-2 font-normal text-accent tracking-widestest">' + "TABLE OF CONTENTS" + '</h2>');
  
  // 添加导航栏
  h2.forEach(function (ele, index) {
    let h3Id = ele.id || Math.random().replace('0.', '');
    ele.id = h3Id;
    // 创建H2级别导航目录
    let h3nav = document.createElement('a');
    h3nav.href = '#' + h3Id;
    h3nav.className = "block mt-3 text-sm hover:text-purple-700 dark:hover:text-yellow-700 focus-visible:outline-accent"; // 默认不高亮 css
    h3nav.innerHTML = ele.textContent;
    navbanner.insertAdjacentElement('beforebegin', h3nav);
    // TODO： 这里的命名，我改了下 style.css  那边，因为 js 命名规范的原因。本来 css 那边定义的 是 text-purple-700 ，我都改成了 textPurple700。 不知道有没有什么办法能转换一下
    ele.textPurple700 = function () {
      // 对应的导航元素高亮
      h3nav.parentElement.querySelectorAll('.textPurple700').forEach(function (eleActive) {
          ele.isActived = false;
          eleActive.classList.remove('textPurple700');
      });
      h3nav.classList.add('textPurple700');
      ele.isActived = true;
    };
    ele.untextPurple700 = function () {
      // 对应的导航元素高亮
      if (document.scrollingElement.scrollTop > lastScrollTop) {
          h2[index + 1] && h2[index + 1].textPurple700();
      } else {
          h2[index - 1] && h2[index - 1].textPurple700();
      }
      h3nav.classList.remove('textPurple700');
      ele.isActived = false;
    };
    
    // TODO：这个地方，我其实有疑问的，我找不到太好的直接的接口去找 H2 中的 H3 ，所以用的是这个办法。等于说搜索全文了。这就导致了一个问题：
    // 1. 在高亮处理的时候，H2 和 H3 两部分分开计算了。有bug
    
    // 创建H3级别导航目录
    let parent = h2[index].parentElement;
    let element = h2[index];
    let h3active = false;
    while(1) {
      if ((element == parent.lastElementChild) || (element == h2[index + 1])) {
        break; //搜索结束
      }
      element = element.nextElementSibling;
      if (element.tagName.toLowerCase() == 'h3') {
         h3active = true;
      }
    }
    if (h3active === true) {
      h3.forEach(function (ele, index) {
        let h3Id = ele.id || Math.random().replace('0.', '');
        ele.id = h3Id;
        // 创建H2级别导航目录
        let h3nav = document.createElement('a');
        h3nav.href = '#' + h3Id;
        h3nav.className = "block mt-3 text-sm hover:text-purple-700 dark:hover:text-yellow-700 focus-visible:outline-accent ml-3"; // 默认不高亮 css
        h3nav.innerHTML = ele.textContent;
        navbanner.insertAdjacentElement('beforebegin', h3nav);
        ele.textPurple700 = function () {
          // 对应的导航元素高亮
          h3nav.parentElement.querySelectorAll('.textPurple700').forEach(function (eleActive) {
              ele.isActived = false;
              eleActive.classList.remove('textPurple700');
          });
          h3nav.classList.add('textPurple700');
          ele.isActived = true;
        };
        ele.untextPurple700 = function () {
          // 对应的导航元素高亮
          if (document.scrollingElement.scrollTop > lastScrollTop) {
              h2[index + 1] && h2[index + 1].textPurple700();
          } else {
              h2[index - 1] && h2[index - 1].textPurple700();
          }
          h3nav.classList.remove('textPurple700');
          ele.isActived = false;
        };
        Observer.observe(ele);
      });
    }
    Observer.observe(ele);
  });
}
