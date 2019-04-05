var f = '';

try {
	chrome.storage.local.get('banglaFont', function (items) {
		if (chrome.runtime.error) {
			console.log(chrome.runtime.error);
			f = 'Siyam Rupali';
		} else {
			f = items.banglaFont || 'Siyam Rupali';
		}
		c(f);
	});
} catch (e) {
	f = 'Siyam Rupali';
	c(f);
}

function c(f) {
	var e = document.querySelector('body');
	var s = document.createElement('style');
	var b = (Math.floor(Math.random() * 999) + 100).toString();
	s.appendChild(document.createTextNode("\
		@font-face {\
				font-family: Bangla" + b + ";\
				src: local('" + f + "');\
				unicode-range: U+0980-09FF;\
		}\
		body {\
			font-family: Bangla" + b + ", " + window.getComputedStyle(e, null).getPropertyValue("font-family") + ";\
		}\
	"));
	document.body.appendChild(s);

	var eb = document.querySelectorAll('body *');
	for (el of eb) {
		var bfm = window.getComputedStyle(el, null).getPropertyValue("font-family");
		if (/Bangla/i.test(bfm)) {
			continue;
		}
		var ss = 'sans-serif';
		if (bfm.match(/(sans\-)?serif$/i)) {
			ss = bfm.match(/(sans\-)?serif$/i)[0];
		}
		bfm = bfm.replace(/(sans\-)?serif$/i, '');
		var fm = bfm + (/\, ?$/i.test(bfm) ? 'Bangla' : ', Bangla') + b + ', ' + ss;
		el.style.fontFamily = fm;
	}

	window.addEventListener('load', function () {

		var ea = document.querySelectorAll('body *');
		for (el of ea) {
			var bfm = window.getComputedStyle(el, null).getPropertyValue("font-family");
			if (/Bangla/i.test(bfm)) {
				continue;
			}
			var ss = 'sans-serif';
			if (bfm.match(/(sans\-)?serif$/i)) {
				ss = bfm.match(/(sans\-)?serif$/i)[0];
			}
			bfm = bfm.replace(/(sans\-)?serif$/i, '');
			var fm = bfm + (/\, ?$/i.test(bfm) ? 'Bangla' : ', Bangla') + b + ', ' + ss;
			el.style.fontFamily = fm;
		}

	}, { passive: true });

	var observer = new MutationObserver(function (mutations) {
		for (m of mutations) {
			for (perNode of m.addedNodes) {
				if (perNode.nodeType == 1) {
					if(perNode.innerHTML) {
						var arr = perNode.getElementsByTagName('*');
						for(a of arr) {
							if (!/Bangla/i.test(window.getComputedStyle(a, null).getPropertyValue("font-family"))) {
								var bfm = window.getComputedStyle(a, null).getPropertyValue("font-family");
								if (/Bangla/i.test(bfm)) {
									continue;
								}
								var ss = 'sans-serif';
								if (bfm.match(/(sans\-)?serif$/i)) {
									ss = bfm.match(/(sans\-)?serif$/i)[0];
								}
								bfm = bfm.replace(/(sans\-)?serif$/i, '');
								var fm = bfm + (/\, ?$/i.test(bfm) ? 'Bangla' : ', Bangla') + b + ', ' + ss;
								a.style.fontFamily = fm;
							}
						}
					}
				}
			}
		}
	});

	var container = document.documentElement || document.body;
	var config = { childList: true, subtree: true };
	observer.observe(container, config);
}