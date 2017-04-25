self.addEventListener('message', function(e) {
    var data = e.data;
    var points = data.points;
    switch (data.type) {
      case 'fruit':
        points = points + 3;
        self.postMessage(points);
        break;
      case 'coin':
        points = points + 1;
        self.postMessage(points);
        break;
      case 'end':
        time = data.time;
        points = points + time;
        self.postMessage(points);
      default:
        self.postMessage(points);
    };
});
