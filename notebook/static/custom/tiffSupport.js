/**
 * Created by mveranom on 23/05/2017.
 */

  function loadTiffImage(path, id) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', path);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function (e) {
      var buffer = xhr.response;
      var tiff = new Tiff({buffer: buffer});
      var canvas = tiff.toCanvas();
      var width = tiff.width();
      var height = tiff.height();
      if (canvas) {
        var $elem = $('<div></div>');
        $elem.append(canvas);
        // var ell= path.slice(2);

        $('#'+id).append($elem);
      }
    };
    xhr.send();
  };
