/* Graph type */

var Graph = function() {
	this.vertices = {};
}

var GraphNode = function(val) {
	this.val = val;
	this.edges = {};
}

Graph.prototype.addVertex = function(val) {
	if(!this.vertices[val]) {
		this.vertices[val] = new GraphNode(val);
	}
}

Graph.prototype.addVertices = function(values) {
	for(var i = 0; i < values.length; i++) {
		if(!this.vertices[values[i]]) {
			this.vertices[values[i]] = new GraphNode(values[i]);
		}
	}
}

Graph.prototype.removeVertex = function(val) {
	if(this.vertices[val]) {
		delete this.vertices[val];

		for (key in this.vertices) {
			if (this.vertices[key].edges[val]) {
				delete this.vertices[key].edges[val];
			}
		}

	}
}

Graph.prototype.getVertex = function(val) {
	return this.vertices[val];
}

Graph.prototype.addEdge = function(start, end) {
	if(this.vertices[start] && this.vertices[end]) {
		this.vertices[start].edges[end] = true;
		this.vertices[end].edges[start] = true;
	}
}

Graph.prototype.removeEdge = function(start, end) {
	if(this.vertices[start] && this.vertices[end]) {

		if(this.vertices[start].edges[end]) {
			delete this.vertices[start].edges[end];
		}

	}
}

Graph.prototype.getEdge = function(start, end) {
	return this.vertices[start].edges[end] || null;
}

Graph.prototype.getNeighbors = function(val) {
	return this.vertices[val] ? this.vertices[val].edges : null;
}

var t1 = ['ТАРА','ЛИПА','ТУРА','ЛУЖА','ПАРК','ЛОЖЬ','ЛУПА','ПЛОТ','МУРА','ПАУК','ПАУТ','ПЛУТ','ЛОЖА','СЛОТ','ПАРА','МУХА','СЛОН','ЛИСА','ЛОСЬ'];

/**
 * Builds a graph based on an array of words
 * @param  {String[]} words Function must accept an array of strings for further work
 * @return {Object}      Return an undirected graph
 */
var buildGraph = function(words) {
	var dict = {};
	var wordsGraph = new Graph();
	wordsGraph.addVertices(words);

	var word;
	var bucket;

	for(var i = 0; i < words.length; i++) {
		var word = words[i];

		for(var n = 0; n < word.length; n++) {
			var chars = word.split('');
			chars.splice(n, 1, '_');
			var bucket = chars.join('');

			if(bucket in dict) {
				dict[bucket].push(word);
			} else {
				dict[bucket] = [word];
			}
		}

	}

	for(var b in dict) {
		for(var i = 0; i < b.length - 1; i++) {
			if(b.length > 1) {
				var word1 = dict[b][i];

				for(var j = i + 1; j < b.length; j++) {
				var word2 = dict[b][j];
					if(word1 !== word2)
						wordsGraph.addEdge(word1, word2);
				}

			} else {
				break;
			}
		}
	}

	return wordsGraph;
}

/**
 * Creates a bfsTree-like object
 *
 * @param {Object} g     Must accept a graph
 * @param {String} start Starting point(word)
 *
 * @return {Object} Object that contains nodes and their predecessors
 */
var bfsTree = function(g, start) {
	var preds = {}; // Key
	var visited = {};
	preds[start] = null;
	var verticesQueue = [];
	verticesQueue.push(start);

	while(verticesQueue.length > 0) {
		var currentVert = verticesQueue.shift();

		for(var nbr in g.getNeighbors(currentVert)) {
			if( !visited[nbr] ) {
				preds[nbr] = currentVert;
				verticesQueue.push(nbr);
				visited[nbr] = 'f'; // would be visited in future
			}
		}

		visited[currentVert] = 'v'; // visited
	}
	return preds;
}

var normalizeWords = function(words) {
	var wordUp;
	var normalized = words.map(function(word, i) {
		wordUp = word.toLowerCase();
		return wordUp;
	});

	return normalized;
}


/**
 * Creates a word ladder
 *
 * @param {String[]} dict  Dictionary of words
 * @param {String} start	Starting word
 * @param {String} end   Ending word
 *
 * @return {String} Ladder is the shortest path from the start to the end of the tree
 */
var buildLadder = function(dict, start, end) {
	var words = normalizeWords(dict);
	var graph = buildGraph(words);
	var searchTree = bfsTree(graph, start);
	var word = end;
	var words = [];

	do {

		if(word === start){
			words.unshift(word);
			break;
		}
		words.unshift(word);
		word = searchTree[word];

	} while(word !== null)

	return words.join('-');
}

console.log(buildLadder(t1, 'муха', 'слон'));
console.log(buildLadder(t1, 'лиса', 'лось'));
