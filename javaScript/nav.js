window.onload = function () {
  var h2 = document.querySelectorAll('#__next h2');
  // console.log('h2', h2);
  var html = document.querySelectorAll('html');
  localStorage.setItem("themes", html[0].className);
  var Observer = new IntersectionObserver(function (entries) {
    entries.reverse().forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.navActive();
      }
    });
    lastScrollTop = document.scrollingElement.scrollTop;
  });
  
  // 添加标题头
  navbanner.insertAdjacentHTML('beforebegin','<h2>' + "TABLE OF CONTENTS" + '</h2>');
  
  // 添加导航栏
  h2.forEach(function (ele, index) {
    var h3Id = ele.id || Math.random().replace('0.', '');
    ele.id = h3Id;
    // 创建H2级别导航目录
    var nav = document.createElement('a');
    nav.href = '#' + h3Id;
    nav.className = "aside-h2-list hover:text-purple-700 dark:hover:text-yellow-700"; // 默认不高亮 css
    nav.innerHTML = ele.textContent;
    navbanner.insertAdjacentElement('beforebegin', nav);
    
    // console.log('nav',nav);
    ele.navActive = function () {
      // 对应的导航元素高亮，这个地方 navActive 只是起到了一个筛选的作用，没有实际的 CSS
      nav.parentElement.querySelectorAll('.navActive').forEach(function (eleActive) {
        ele.isActived = false;
        eleActive.classList.remove('navActive', 'text-purple-700', 'dark:text-yellow-700');
      });
      nav.classList.add('navActive', 'text-purple-700', 'dark:text-yellow-700');
      ele.isActived = true;
    };
    Observer.observe(ele);
    
    // 创建H3级别导航目录
    var parent = h2[index].parentElement;
    var element = h2[index];
    // console.log('element', element);
    var h3active = false;
    while(1) {
      if ((element == parent.lastElementChild) || (element == h2[index + 1])) {
        break; //搜索结束
      }
      element = element.nextElementSibling;
      if (element.tagName.toLowerCase() == 'h3') {
         h3active = true;
         var h3Id = element.id || Math.random().replace('0.', '');
         var h3nav = document.createElement('a');
         h3nav.href = '#' + h3Id;
         h3nav.className = "aside-h3-list hover:text-purple-700 dark:hover:text-yellow-700"; // 默认不高亮 css
         h3nav.innerHTML = element.textContent;
         navbanner.insertAdjacentElement('beforebegin', h3nav);
         element.navActive = function () {
           // 对应的导航元素高亮，这个地方 navActive 只是起到了一个筛选的作用，没有实际的 CSS
           h3nav.parentElement.querySelectorAll('.navActive').forEach(function (eleActive) {
             element.isActived = false;
             eleActive.classList.remove('navActive', 'text-purple-700', 'dark:text-yellow-700');
           });
           h3nav.classList.add('navActive', 'text-purple-700', 'dark:text-yellow-700');
           element.isActived = true;
        };
      Observer.observe(element);
      }
    }
    ele.unnavActive = function () {
      // 对应的导航元素高亮
      if (document.scrollingElement.scrollTop > lastScrollTop) {
        h2[index + 1] && h2[index + 1].navActive();
      } else {
        h2[index - 1] && h2[index - 1].navActive();
      }
      nav.classList.remove('navActive');
      ele.isActived = false;
    };
    
  });
}
