// Next two lines for JS-Lint, first a pragma instruction, then global vars specified
"use strict";
var $, iScroll, window, google;

// create our own namespace
var RocknCoder = RocknCoder || {};
RocknCoder.Pages = RocknCoder.Pages || {};

RocknCoder.Pages.Kernel = function (event) {
	var that = this,
		eventType = event.type,
		pageName = $(this).attr("data-rockncoder-jspage");
	if (RocknCoder && RocknCoder.Pages && pageName && RocknCoder.Pages[pageName] && RocknCoder.Pages[pageName][eventType]) {
		RocknCoder.Pages[pageName][eventType].call(that);
	}
};

RocknCoder.Pages.Events = (function () {
	$("div[data-rockncoder-jspage]").on(
		'pagebeforecreate pagecreate pagebeforeload pagebeforeshow pageshow pagebeforechange pagechange pagebeforehide pagehide pageinit',
		RocknCoder.Pages.Kernel
	);
}());

RocknCoder.Dimensions = (function () {
	var width, height, headerHeight, footerHeight, contentHeight,
		getContent = function () {
			return {
				width: width,
				height: contentHeight
			};
		},
		init = function () {
			width = $(window).width();
			height = $(window).height();
			headerHeight = $("header", $.mobile.activePage).height();
			footerHeight = $("footer", $.mobile.activePage).height();
			contentHeight = height - headerHeight - footerHeight;
		};
	return {
		init: init,
		getContent: getContent
	};
}());

RocknCoder.Pages.page1 = (function () {
	var map,
		// ladies and gentlemen, welcome to Los Angeles, California
		latLong = new google.maps.LatLng(34.0522, -118.2428),
		mapElement = $("#map").get(0),
		options  = {
			center: latLong,
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		},
		// event handler for the jQuery Mobile pageshow event
		pageshow = function () {
			// we need to wait until jQuery Mobile is ready and has rendered
			RocknCoder.Dimensions.init();
			var dim = RocknCoder.Dimensions.getContent();
			// set the CSS height dynamically
			$("#map").css('height', dim.height);
			map = new google.maps.Map(mapElement, options);
		};
	return {
		pageshow: pageshow
	};
}());