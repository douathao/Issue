require([
	"dojo/ready",
	"dojo/on",
	"dojo/_base/declare",
	"dgrid/OnDemandGrid",
	"dgrid/Keyboard",
	"dgrid/Selection",
	"dgrid/selector",
	"dgrid/tree",
	"dgrid/extensions/DijitRegistry",
	"dojo/store/Memory",
	"dojo/store/Observable",
	"dojo/dom",
	"dijit/form/CheckBox",
	"dojo/_base/lang",
	"dojo/parser"
], function(
	ready,
	on,
	declare,
	OnDemandGrid,
	Keyboard,
	Selection,
	selector,
	tree,
	DijitRegistry,
	Memory,
	Observable,
	dom,
	CheckBox,
	lang,
	parser
	) {
	parser.parse();
	ready(function() {
		/**
		 * The issue is in List.js (dgrid)
		 * LINE: 568 - swap the nextNode and beforeNode
		 * parentNode = (beforeNode && beforeNode.parentNode) ||
		 *				(nextNode && nextNode.parentNode) || self.contentNode;
		 * to
		 * parentNode = (nextNode && nextNode.parentNode) || (beforeNode && beforeNode.parentNode) || self.contentNode;
		 *
		 */
		var data = [];

		var layout = [tree({
			field: "object",
			label: "label",
			sortable: false,
			indentWidth: 30,
			renderCell: function(object, value, node, options) {
				var chbx = new CheckBox();
				chbx.placeAt(node);
				node.innerHTML = node.innerHTML + object.label;
			}
		})];

		var contentStore = new Observable(new Memory({
			data: data,
			idProperty: "object",
			mayHaveChildren: function(storeItem) {
				return this.getChildren(storeItem).length > 0;
			},
			getChildren: function(storeItem, options) {
				return this.query({
					parent: storeItem.object
				}, options);
			}
		}));

		// creates new dgrid constructor
		var DgridMixin = declare([
			OnDemandGrid,
			Keyboard,
			Selection,
			DijitRegistry]);

		// creates dgrid
		var dgrid = new DgridMixin({
			store: contentStore,
			className: "dgrid-autoheight",
			query: {
				parent: "root"
			},
			columns: layout,
			showHeader: false
		}, "dgrid");
		window.grid = dgrid;

		var obj1 = {
			object: "obj1",
			parent: "root",
			label: "Obj1"
		};

		var obj2 = {
			object: "obj2",
			parent: "obj1",
			label: "Obj2"
		};

		var obj3 = {
			object: "obj3",
			parent: "obj2",
			label: "Obj3"
		};

		var obj4 = {
			object: "obj4",
			parent: "obj3",
			label: "Obj4"
		};
		var obj5 = {
			object: "obj5",
			parent: "obj3",
			label: "Obj5"
		};


		on(dom.byId("create"), "click", createItems);
		on(dom.byId("delete"), "click", deleteItems);
		on(dom.byId("update"), "click", updateItems);

		function createItems() {
			dgrid.store.add(obj5);
			dgrid.store.add(obj4);
			dgrid.store.add(obj3);
			dgrid.store.add(obj2);
			dgrid.store.add(obj1);
		}

		function updateItems() {

			var o5 = lang.clone(obj5);
			var o4 = lang.clone(obj4);
			var o3 = lang.clone(obj3);
			var o2 = lang.clone(obj2);
			var o1 = lang.clone(obj1);
			o5.label = "Object 5";
			o4.label = "Object 4";
			o3.label = "Object 3";
			o2.label = "Object 2";
			o1.label = "Object 1";

			dgrid.store.put(o4);
			dgrid.store.put(o5);
			dgrid.store.put(o2);
			dgrid.store.put(o3);
			dgrid.store.put(o1);

			/**
			 * Another fix is update the store and set the grid store
			 */
//					contentStore.put(o5);
//					contentStore.put(o3);
//					contentStore.put(o2);
//					contentStore.put(o1);
//					grid.set('store', contentStore);
		}

		function deleteItems() {
			dgrid.store.remove("obj5");
			dgrid.store.remove("obj4");
			dgrid.store.remove("obj3");
			dgrid.store.remove("obj2");
			dgrid.store.remove("obj1");
		}
	});
});