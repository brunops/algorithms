function Graph(totalVertices) {
  this.totalVertices = totalVertices || 0;
  this.totalEdges = 0;
  this.adjList = [];
  this.visited = [];
  this.init();
}

Graph.prototype.init = function () {
  for (var i = 0; i < this.totalVertices; ++i) {
    this.adjList[i] = [];
    this.visited[i] = false;
  }
};

Graph.prototype.markAllVerticesUnvisited = function () {
  for (var i = 0; i < this.visited.length; ++i) {
    this.visited[i] = false;
  }
};

Graph.prototype.addEdge = function (v, w) {
  this.adjList[v].push(w);
  this.adjList[w].push(v);
  this.totalEdges++;
};

Graph.prototype.showGraph = function () {
  for (var i = 0; i < this.totalVertices; ++i) {
    console.log("Vertice %s: %s", i, this.adjList[i].join(' '));
  }
};

Graph.prototype.bfs = function (start, cb) {
  this.markAllVerticesUnvisited();

  var queue = [start];

  if (cb) {
    cb(start);
    this.visited[start] = true;
  }

  while (queue.length) {
    var curr = queue.shift();

    for (var i = 0; i < this.adjList[curr].length; ++i) {
      var vertex = this.adjList[curr][i];

      if (!this.visited[vertex]) {
        if (cb) {
          cb(vertex);
        }
        this.visited[vertex] = true;
        queue.push(vertex);
      }
    }
  }
};

var graph = new Graph(5);
graph.addEdge(4,3);
graph.addEdge(0,1);
graph.addEdge(3,2);
graph.addEdge(0,2);
graph.addEdge(1,3);
graph.addEdge(2,4);


graph.showGraph();


graph.bfs(2, function (curr) {
  console.log('visiting %s', curr);
});



