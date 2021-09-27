snippet = function () {
  var snippets = document.querySelectorAll('pre');
  var copyHtml = '';
  copyHtml += '<button class="btn-copy" data-clipboard-snippet="">';
  copyHtml += '  <i class="fa fa-clipboard" aria-hidden="true"></i><span>copy</span>';
  copyHtml += '</button>';
  console.log(copyHtml);
  [].forEach.call(snippets, function(snippet) {
    if (snippet !== null) {
      snippet.firstChild.insertAdjacentHTML('beforebegin', copyHtml);
    }
  });
  var clipboard = new ClipboardJS('.btn-copy', {
      target: function (trigger) {
          return trigger.nextElementSibling;
      }
  });
  clipboard.on('success', function (e) {
      e.trigger.innerHTML = "<i class='fa fa-check' aria-hidden=\"true\"></i><span>copy success</span>"
      setTimeout(function () {
          e.trigger.innerHTML = "<i class='fa fa-clipboard' aria-hidden=\"true\"></i><span>copy</span>"
      }, 1000)
     
      e.clearSelection();
  });
  clipboard.on('error', function (e) {
      e.trigger.innerHTML = "<i class='fa fa-times aria-hidden=\"true\"'></i><span>copy failed</span>"
      setTimeout(function () {
          e.trigger.innerHTML = "<i class='fa fa-clipboard' aria-hidden=\"true\"></i><span>copy</span>"
      }, 1000)
      e.clearSelection();
  });

}
