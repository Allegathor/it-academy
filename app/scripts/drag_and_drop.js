var getCoords = function(el) {
	var bcr = el.getBoundingClientRect();
	return {
		left: bcr.left + window.pageXOffset,
		top: bcr.top + window.pageYOffset
	}
}

var ready = function(evt) {
	var gallery = document.getElementById('gallery');
	var imgCollection = gallery.querySelectorAll('.gallery-image');

	for(var i = imgCollection.length - 1; i >= 0; i--) {
		var img = imgCollection[i];

		var imgCoords = getCoords(img);
		var leftPos = imgCoords.left + 'px';
		var topPos = imgCoords.top + 'px';

		img.dataset.draggable = false;
		img.style.position = 'absolute';
		img.style.left = leftPos;
		img.style.top = topPos;
		img.style.cursor = 'default';
		img.style.margin = '0';
	}

	var dragHandler = function(evt) {
		evt.preventDefault();
	}

	var deltaX = 0;
	var deltaY = 0;

	var mouseMoveHandler = function(evt) {
		var el = gallery.querySelector('[data-draggable=true]');
		el.style.left = evt.pageX - deltaX + 'px';
		el.style.top = evt.pageY - deltaY + 'px';
	}

	var mouseDownHandler = function(evt) {
		if(evt.target.tagName === 'IMG') {
			evt.target.dataset.draggable = true;
			evt.target.style.cursor = 'move';
			evt.target.style.zIndex = '10';
			var elCoords = getCoords(evt.target);

			deltaX = evt.pageX - elCoords.left;
			deltaY = evt.pageY - elCoords.top;

			document.body.addEventListener('mousemove', mouseMoveHandler);
		}
	}

	var mouseUpHandler = function(evt) {
		evt.target.dataset.draggable = false;
		evt.target.style.zIndex = '0';
		evt.target.style.cursor = 'default';

		gallery.removeChild(evt.target);
		gallery.appendChild(evt.target)
		document.body.removeEventListener('mousemove', mouseMoveHandler);
	}

	gallery.addEventListener('mouseup', mouseUpHandler);
	gallery.addEventListener('mousedown', mouseDownHandler);
	gallery.addEventListener('dragstart', dragHandler);

}

window.addEventListener('load', ready);
