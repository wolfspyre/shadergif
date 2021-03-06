importScripts('/assets/lib/math.min.js');

/*
  This worker is called by shadergif.js to render mathjs images in the background
  (without locking the UI thread)
*/

function float_to_pixel(x) {
  const a = 0;
  const b = 255;
  return Math.max(Math.min(Math.floor(x * 256), b), a);
}

onmessage = function (m) {
  const w = m.data.w;
  const h = m.data.h;
  const code = m.data.code;
  const arr = new Uint8ClampedArray(w * h * 4);
  const time = m.data.time || 0;

  try {
    var expr = math.compile(code);
  } catch (e) {
    postMessage({
      error: e.toString()
    });
    return;
  }

  // Loop over each pixel and evaluate function
  for (let i = 0; i < arr.length; i += 4) {
    let x = (i % (w * 4)) / 4;
    let y = Math.floor(i / (w * 4));

    x = x / w - 0.5;
    y = y / h - 0.5;

    try {
      const scope = { x, y, time };
      let result = expr.eval(scope);

      // On multi-line scripts, the result is
      // in result.entries[0]
      if (typeof (result.entries) !== 'undefined') {
        result = result.entries[0];
      }

      if (typeof (scope.out) !== 'undefined') {
        result = scope.out;
      }

      if (typeof (result) === 'number') {
        result = float_to_pixel(result);
        // Black and white pixel
        arr[i + 0] = parseInt(result);
        arr[i + 1] = parseInt(result);
        arr[i + 2] = parseInt(result);
        arr[i + 3] = 255;
      } else if (result._data.length == 3) {
        // RGB pixel
        r = float_to_pixel(result._data[0]);
        g = float_to_pixel(result._data[1]);
        b = float_to_pixel(result._data[2]);

        arr[i + 0] = parseInt(r);
        arr[i + 1] = parseInt(g);
        arr[i + 2] = parseInt(b);
        arr[i + 3] = 255;
      } else if (result._data.length == 4) {
        // RGBA pixel
        r = float_to_pixel(result._data[0]);
        g = float_to_pixel(result._data[1]);
        b = float_to_pixel(result._data[2]);
        a = float_to_pixel(result._data[3]);

        arr[i + 0] = parseInt(r);
        arr[i + 1] = parseInt(g);
        arr[i + 2] = parseInt(b);
        arr[i + 3] = parseInt(a);
      }
    } catch (e) {
      postMessage({
        error: e.toString()
      });
      return;
    }
  }

  postMessage({
    data: arr,
    w,
    h
  });
};
