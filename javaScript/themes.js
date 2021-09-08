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
  
  var html = document.querySelectorAll('html');
  var themes = localStorage.themes;
  console.log('themes', themes);
  if (themes === undefined) {
    localStorage.setItem("themes", html[0].className);
  } else if (themes === 'light') {
    document.getElementById("html").className="light";
    document.documentElement.removeAttribute('theme');
    anim.goToAndStop(2,true);
  } else if (themes === 'dark') {
    document.getElementById("html").className="dark";
    document.documentElement.setAttribute('theme', 'dark');
    anim.goToAndStop(51,true);
  }
  
  setStylesSheet = function () {
    var changeThemes = localStorage.themes;
    // console.log('changethemes', changethemes);
    if (changeThemes === 'dark') {
      anim.playSegments([51, 96],true);
      document.getElementById("html").className="light";
      document.documentElement.removeAttribute('theme');
      localStorage.themes = "light";
    } else if (changeThemes === 'light') {
      anim.playSegments([2, 50], true);
      document.getElementById("html").className="dark";
      document.documentElement.setAttribute('theme', 'dark');
      localStorage.themes = "dark";
    } else {
      alert("主题加载出错，请刷新！")
    }
  };
}
