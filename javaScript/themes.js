window.onload = function () {
  var html = document.querySelectorAll('html');
  localStorage.setItem("themes", html[0].className);
  var ifasidenav = document.getElementById('navbanner');
  if (ifasidenav != null) {
    nav();
  }
  
  setStylesSheet = function () {
    var themes = localStorage.themes;
    // console.log('themes', themes);
    if (themes === 'dark') {
      document.getElementById("themes").innerHTML = "当前黑色，点击切换";
      document.getElementById("html").className="light";
      document.documentElement.removeAttribute('theme');
      localStorage.themes = "light";
    } else if (themes === 'light') {
      document.getElementById("themes").innerHTML = "当前白色，点击切换";
      document.getElementById("html").className="dark";
      document.documentElement.setAttribute('theme', 'dark');
      localStorage.themes = "dark";
    } else {
      alert("主题加载出错，请刷新！")
    }
  };
}
