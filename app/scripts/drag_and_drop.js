var ready = function(evt) {
	var gallery = document.getElementById('gallery');
	gallery.style.position = 'relative';

	var imgCollection = gallery.querySelectorAll('.gallery-image')

	for(var i = imgCollection.length - 1; i >= 0; i--) {
		var img = imgCollection[i];

		var leftPos = img.offsetLeft + 'px';
		var topPos = img.offsetTop + 'px';

		img.dataset.draggable = false;
		img.style.position = 'absolute';
		img.style.left = leftPos;
		img.style.top = topPos;
		img.style.cursor = 'default';
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

			deltaX = evt.pageX - evt.target.offsetLeft;
			deltaY = evt.pageY - evt.target.offsetTop;

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
