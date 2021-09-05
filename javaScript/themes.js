window.onload = function () {
  var ifAsideNav = document.getElementById('navBanner');
  if (ifAsideNav != null) {
    nav();
  }
  
  
  var html = document.querySelectorAll('html');
  var themes = localStorage.themes;
  console.log('themes', themes);
  if (themes === undefined) {
    localStorage.setItem("themes", html[0].className);
  } else if (themes === 'light') {
    document.getElementById("html").className="light";
    document.documentElement.removeAttribute('theme');
  } else if (themes === 'dark') {
    document.getElementById("html").className="dark";
    document.documentElement.setAttribute('theme', 'dark');
  }
  
  
  
  setStylesSheet = function () {
    var changeThemes = localStorage.themes;
    // console.log('changethemes', changethemes);
    if (changeThemes === 'dark') {
      document.getElementById("themes").innerHTML = "当白色，点击切换";
      document.getElementById("html").className="light";
      document.documentElement.removeAttribute('theme');
      localStorage.themes = "light";
    } else if (changeThemes === 'light') {
      document.getElementById("themes").innerHTML = "当前黑色，点击切换";
      document.getElementById("html").className="dark";
      document.documentElement.setAttribute('theme', 'dark');
      localStorage.themes = "dark";
    } else {
      alert("主题加载出错，请刷新！")
    }
  };
}
