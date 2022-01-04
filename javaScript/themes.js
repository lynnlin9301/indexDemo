window.onload = function () {
  var ifAsideNav = document.getElementById('navBanner');
  if (ifAsideNav != null) {
    nav();
    snippet();
  }
  var anim = bodymovin.loadAnimation({
    container: document.getElementById('themes'),
    path: 'animationData.json',
    renderer: 'svg',
    loop: false,
    autoplay: false,
  });
  anim.setSpeed(1.3);
  
  if (localStorage.themes === 'light') {
    anim.goToAndStop(2,true);
  }
   else if (localStorage.themes === 'dark') {
    anim.goToAndStop(51,true);
  }
  
  setStylesSheet = function () {
    if (localStorage.themes === 'dark') {
      anim.playSegments([51, 96],true);
      document.documentElement.setAttribute('themes', 'light');
      localStorage.themes = "light";
    } else if (localStorage.themes === 'light') {
      anim.playSegments([2, 50], true);
      document.documentElement.setAttribute('themes', 'dark');
      localStorage.themes = "dark";
    } else {
      alert("主题加载出错，请刷新！")
    }
  };
  searchInput = function () {
    var searchInput = document.getElementById('search-input');
    if (searchInput.className === 'search-input-none') {
      searchInput.className="search-input";
      document.getElementById('search-input').focus();
    } else if (searchInput.className === 'search-input') {
      searchInput.className="search-input-none"
    }
  }
  enterSearch = function () {
    var keyEvent = window.event || arguments.callee.caller.arguments[0];
    if (keyEvent.keyCode === 13) {
      alert("跳转搜索");
    }
  }
}
