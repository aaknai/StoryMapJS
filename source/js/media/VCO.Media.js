/*	VCO.Media
	Main media template for media assets.
	Takes a data object and populates a dom object
================================================== */
 
VCO.Media = VCO.Class.extend({
	
	includes: [VCO.Events],
	
	_el: {},
	
	/*	Constructor
	================================================== */
	initialize: function(data, options, add_to_container) {
		// DOM ELEMENTS
		this._el = {
			container: {},
			content_container: {},
			content: {},
			content_item: {},
			caption: {},
			credit: {},
			parent: {}
		};
		
		// Messege
		this.messege = null;
		
		// Media ID
		this.media_id = null;
	
		// Data
		this.data = {
			uniqueid: 			null,
			url: 				null,
			credit:				null,
			caption:			null
		};
	
		//Options
		this.options = {
			api_key_flickr: 		"f2cc870b4d233dd0a5bfe73fd0d64ef0"
		};
	
		this.animator = {};
		
		// Merge Data and Options
		VCO.Util.mergeData(this.options, options);
		VCO.Util.mergeData(this.data, data);
		
		this._el.container = VCO.Dom.create("div", "vco-media");
		this._el.container.id = this.data.uniqueid;
		
		this._initLayout();
		
		if (add_to_container) {
			add_to_container.appendChild(this._el.container);
			this._el.parent = add_to_container;
		};
		
	},
	
	/*	Media Specific
	================================================== */
		loadMedia: function() {
		
		},
		
		_updateMediaDisplay: function() {
			
		},
	
	/*	Public
	================================================== */
	show: function() {
		
	},
	
	hide: function() {
		
	},
	
	addTo: function(container) {
		container.appendChild(this._el.container);
		this.onAdd();
	},
	
	removeFrom: function(container) {
		container.removeChild(this._el.container);
		this.onRemove();
	},
	
	// Update Display
	updateDisplay: function(w, h, animate) {
		this._updateDisplay(w, h, animate);
	},

	/*	Events
	================================================== */
	onLoaded: function() {
		this.fire("loaded", this.data);
		if (this.messege) {
			this.messege.hide();
		}
	},
	
	onAdd: function() {
		this.fire("added", this.data);
	},

	onRemove: function() {
		this.fire("removed", this.data);
	},
	
	/*	Private Methods
	================================================== */
	_initLayout: function () {
		
		// Messege
		this.messege = new VCO.Messege({}, this.options);
		this.messege.addTo(this._el.container);
		
		// Create Layout
		this._el.content_container			= VCO.Dom.create("div", "vco-media-content-container", this._el.container);
		this._el.content					= VCO.Dom.create("div", "vco-media-content", this._el.content_container);
		
		
		
		// Credit
		if (this.data.credit != "") {
			this._el.credit					= VCO.Dom.create("div", "vco-credit", this._el.content_container);
			this._el.credit.innerHTML		= this.data.credit;
		}
		
		// Caption
		if (this.data.caption != "") {
			this._el.caption				= VCO.Dom.create("div", "vco-caption", this._el.content_container);
			this._el.caption.innerHTML		= this.data.caption;
		}
		
		
	},
	
	// Update Display
	_updateDisplay: function(w, h, animate) {
		if (w) {
			this.options.width = w;
		}
		if (h) {
			this.options.height = h;
		}
		this._updateMediaDisplay();
		
	}
	
});