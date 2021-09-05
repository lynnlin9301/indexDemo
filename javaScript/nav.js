nav = function () {
  var h2 = document.querySelectorAll('#main-page h2');
  var list = [];
  var Observer = new IntersectionObserver(function (entries) {
    entries.reverse().forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.navActive();
      } else if (entry.target.isActived) {
        entry.target.unactive();
      }
    });
    lastScrollTop = document.scrollingElement.scrollTop;
  });
  
  // 添加标题头
  navBanner.insertAdjacentHTML('beforebegin','<h2>' + "TABLE OF CONTENTS" + '</h2>');
  
  // 生成对应标题数组
  h2.forEach(function (ele, index) {
    list.push(ele);
    var parent = h2[index].parentElement;
    var element = h2[index];
    while(1) {
      if ((element == parent.lastElementChild) || (element == h2[index + 1])) {
        break; //搜索结束
      }
      element = element.nextElementSibling;
      if (element.tagName.toLowerCase() == 'h3') {
        list.push(element);
      }
    }
  });
  // 添加导航栏
  list.forEach(function (ele, index) {
    var id = ele.id || Math.random().replace('0.', '');
    ele.id = id;
    var nav = document.createElement('a');
    nav.href = '#' + id;
    if (ele.tagName.toLowerCase() == 'h2') {
      nav.className = "aside-h2-list";
    } else if (ele.tagName.toLowerCase() == 'h3') {
      nav.className = "aside-h3-list";
    } else {
      nav.className = "" // 容错，万一都不是，className = null
    }
    nav.innerHTML = ele.textContent;
    navBanner.insertAdjacentElement('beforebegin', nav);
    ele.navActive = function () {
      nav.parentElement.querySelectorAll('.navActive').forEach(function (eleActive) {
        ele.isActived = false;
        eleActive.classList.remove('navActive');
      });
      nav.classList.add('navActive');
      ele.isActived = true;
    };
    Observer.observe(ele);
    ele.unactive = function () {
      // 对应的导航元素高亮
      if (document.scrollingElement.scrollTop > lastScrollTop) {
        list[index + 1] && list[index + 1].navActive();
      } else {
        list[index - 1] && list[index - 1].navActive();
      }
      nav.classList.remove('navActive');
      ele.isActived = false;
    };
  });
}
