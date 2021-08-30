setStylesSheet = function () {
  var themes = localStorage.themes;
  console.log('themes', themes);
  if (themes === 'dark') {
    document.getElementById("themes").innerHTML = "当前白色，点击切换";
    document.getElementById("html").className="light";
    console.log( document.getElementById("html"));
    localStorage.themes = "light";
  } else if (themes === 'light') {
    document.getElementById("themes").innerHTML = "当前黑色，点击切换";
    document.getElementById("html").className="dark";
    console.log( document.getElementById("html"));
    localStorage.themes = "dark";
  } else {
    alert("主题加载出错，请刷新！")
  }
};
