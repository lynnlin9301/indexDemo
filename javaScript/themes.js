window.onload = function () {
  var ifAsideNav = document.getElementById('navBanner');
  if (ifAsideNav != null) {
    nav();
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
      anim.playSegments([1, 50], true);
      document.documentElement.setAttribute('themes', 'dark');
      localStorage.themes = "dark";
    } else {
      alert("主题加载出错，请刷新！")
    }
  };
}
