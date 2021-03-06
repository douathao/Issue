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
	parser
	) {
	parser.parse();
	ready(function() {

		var data = [];
		var layout = [tree({
			field: "object",
			label: "object",
			sortable: false,
			indentWidth: 30,
			renderCell: function(object, value, node, options) {
				node.innerHTML = object.label;
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

		var DgridMixin = declare([
			OnDemandGrid,
			Keyboard,
			Selection,
			DijitRegistry]);

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

		on(dom.byId("create"), "click", createItems);
		on(dom.byId("delete"), "click", deleteItems);

		function createItems() {
			dgrid.store.add(obj4);
			dgrid.store.add(obj3);
			dgrid.store.add(obj2);
			dgrid.store.add(obj1);
		}

		function deleteItems() {
			dgrid.store.remove("obj4");
			dgrid.store.remove("obj3");
			dgrid.store.remove("obj2");
			dgrid.store.remove("obj1");
//					debugger;
		}
	});
});