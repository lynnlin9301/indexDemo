window.onload = function () {
  let h2 = document.querySelectorAll('#__next h2');
  let h3 = document.querySelectorAll('#__next h3');
  let html = document.querySelectorAll('html');
  localStorage.setItem("themes", html[0].className);
  let Observer = new IntersectionObserver(function (entries) {
    entries.reverse().forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.navActive();
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
    let nav = document.createElement('a');
    nav.href = '#' + h3Id;
    nav.className = "block mt-3 text-sm hover:text-purple-700 dark:hover:text-yellow-700 focus-visible:outline-accent"; // 默认不高亮 css
    nav.innerHTML = ele.textContent;
    navbanner.insertAdjacentElement('beforebegin', nav);
    
    ele.navActive = function () {
      // 对应的导航元素高亮，这个地方 navActive 只是起到了一个筛选的作用，没有实际的 CSS
      console.log(nav.parentElement.querySelectorAll('.text-purple-700'));
      nav.parentElement.querySelectorAll('.navActive').forEach(function (eleActive) {
        ele.isActived = false;
        eleActive.classList.remove('navActive', 'text-purple-700', 'dark:text-yellow-700');
      });
      nav.classList.add('navActive', 'text-purple-700', 'dark:text-yellow-700');
      ele.isActived = true;
    };
    Observer.observe(ele);
    
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
        // 创建H3级别导航目录
        let h3nav = document.createElement('a');
        h3nav.href = '#' + h3Id;
        h3nav.className = "block mt-3 text-sm hover:text-purple-700 dark:hover:text-yellow-700 focus-visible:outline-accent ml-3"; // 默认不高亮 css
        h3nav.innerHTML = ele.textContent;
        navbanner.insertAdjacentElement('beforebegin', h3nav);
        ele.navActive = function () {
          // 对应的导航元素高亮，这个地方 navActive 只是起到了一个筛选的作用，没有实际的 CSS
          h3nav.parentElement.querySelectorAll('.navActive').forEach(function (eleActive) {
            ele.isActived = false;
            eleActive.classList.remove('navActive', 'text-purple-700', 'dark:text-yellow-700');
          });
          h3nav.classList.add('navActive', 'text-purple-700', 'dark:text-yellow-700');
          ele.isActived = true;
          
        };
        Observer.observe(ele);
      });
    }
    
    ele.unnavActive = function () {
      // 对应的导航元素高亮
      if (document.scrollingElement.scrollTop > lastScrollTop) {
          h2[index + 1] && h2[index + 1].navActive();
          h3[index + 1] && h3[index + 1].navActive();
      } else {
          h2[index - 1] && h2[index - 1].navActive();
          h3[index - 1] && h3[index - 1].navActive();
      }
      nav.classList.remove('navActive');
      ele.isActived = false;
    };
    
  });
}
