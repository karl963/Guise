// Copyright 2007 Gennadiy Shvets
// The program is distributed under the terms of the GNU General
// Public License 3.0
//
// See http://www.allmyscripts.com/Table_Sort/index.html for usage details.

// Script version 1.3
	
function TSort_StoreDef () {
	this.sorting = [];
	this.nodes = [];
	this.rows = [];
	this.row_clones = [];
	this.sort_state = [];
	this.initialized = 0;
	this.last_sorted = -1;
	this.history = [];
	this.sort_keys = [];
	this.sort_colors = [ '#FF0000', '#800080', '#0000FF' ];
};

function tsInitOnload ()
{
	tsInit();
	if	(window.onload_sort_table)
		window.onload_sort_table();
}

function tsInit()
{
	if	(TSort_Data == null)
	{
		return;
	}
	if	(TSort_Data.push == null)
		return;

	var table = document.getElementById(TSort_Data[0]);
	// Find thead
	var thead = table.getElementsByTagName('thead')[0];
	if	(thead == null)
	{
		return;
	}
	var cols = thead.getElementsByTagName('th');
	if	(cols.length == 0)
		cols = thead.getElementsByTagName('td');
	for (var i = 0; i < cols.length; i++)
	{
		if	(i >= TSort_Data.length - 1)
			break;
		var node = cols[i];
		var sorting = TSort_Data[i + 1].toLowerCase();
		if	(sorting == null)  sorting = '';
		TSort_Store.sorting.push(sorting);

		if	((sorting != null)&&(sorting != ''))
		{
			node.tsort_col_id = i;
			node.onclick = tsDraw;
			node.innerHTML = '<a href="" onClick="return false">' + node.innerHTML + '</a><b><span id="TS_' + i + '"></span></b>';
//			node.innerHTML += '<span id="TS_' + i + '"></span>';
//			node.style.fontWeight = "normal";
			node.style.cursor = "pointer";
		}
	}
	// Get body data
	var tbody = table.getElementsByTagName('tbody')[0];
	// Get TR rows
	var rows = tbody.getElementsByTagName('tr');
	var len;
	for (var i = 0; i < rows.length; i++)
	{
		var row = rows[i];
		var cols = row.getElementsByTagName('td');
		var row_data = [];
		for (var j = 0; j < cols.length; j++)
		{
			// Get cell text
			var text = cols[j].innerHTML.replace(/^\s+/, '');
			text = text.replace(/\s+$/, '');
			var sorting = TSort_Store.sorting[j];
			if	(sorting == 'h')
			{
				text = text.replace(/<[^>]+>/g, '');
				text = text.toLowerCase();
			}
			if	(sorting == 's')
				text = text.toLowerCase();
			if (sorting == 'i')
			{
				text = parseInt(text);
				if	(isNaN(text))	text = 0;
			}
			if (sorting == 'f')
			{
				text = parseFloat(text);
				if	(isNaN(text))	text = 0;
			}
			row_data.push(text);
		}
		TSort_Store.rows.push(row_data);
		// Save a reference to the TR element
		var new_row = row.cloneNode(true);
		new_row.tsort_row_id = i;
		TSort_Store.row_clones[i] = new_row;
	}
	TSort_Store.initialized = 1;

	var itype = typeof TSort_Initial;
	if	((itype == 'number')||(itype == 'string'))
		tsDraw(TSort_Initial);
	else if (itype != 'undefined')
	{
		for (var i = TSort_Initial.length - 1; i >= 0; i--)
		{
			tsDraw(TSort_Initial[i]);
		}
	}
	
}

function tsDraw(p_id)
{
	if	(TSort_Store.initialized == 0)
		return;

	var i = 0;
	var sort_keys = TSort_Store.sort_keys;
	var id;
	var new_order = '';
	if	(p_id)
	{
		if	(typeof p_id == 'number')
			id = p_id;
		else	if	((typeof p_id == 'string')&&(p_id.match(/^\d+[ADU]$/i)))
		{
			id = p_id.replace(/^(\d+)[ADU]$/i, "$1");
			new_order = p_id.replace(/^\d+([ADU])$/i, "$1").toUpperCase();
		}
	}
	if	(id == null)	id = this.tsort_col_id;

	order = TSort_Store.sort_state[id];
	if	(new_order == 'U')
	{
		if	(order != null)
		{
			TSort_Store.sort_state[id] = null;
			obj = document.getElementById ('TS_' + id);
			if	(obj != null)	obj.innerHTML = '';
		}
	}
	else if	(new_order != '')
	{
		TSort_Store.sort_state[id] = (new_order == 'A')? true: false;
		//	Add column number to the sort keys array
		sort_keys.unshift(id);
		i = 1;
	}
	else
	{
		if	((order == null)||(order == true))
		{
			TSort_Store.sort_state[id] = (order == null)? true: false;
			//	Add column number to the sort keys array
			sort_keys.unshift(id);
			i = 1;
		}
		else
		{
			TSort_Store.sort_state[id] = null;
			obj = document.getElementById ('TS_' + id);
			if	(obj != null)	obj.innerHTML = '';
		}
	}

	var len = sort_keys.length;
	//	This will either remove the column completely from the sort_keys
	//	array (i = 0) or remove duplicate column number if present (i = 1).
	while (i < len)
	{
		if	(sort_keys[i] == id)
		{
			sort_keys.splice(i, 1);
			len--;
			break;
		}
		i++;
	}
	if	(len > 3)
	{
		i = sort_keys.pop();
		obj = document.getElementById ('TS_' + i);
		if	(obj != null)	obj.innerHTML = '';
		TSort_Store.sort_state[i] = null;
	}

	// Sort the rows
	TSort_Store.row_clones.sort(tsSort);

	// Save the currently selected order
	var new_tbody = document.createElement('tbody');
	var row_clones = TSort_Store.row_clones;
	len = row_clones.length;
	if	(typeof TSort_Classes == 'undefined')
	{
		for (i = 0; i < len; i++)
		{
			new_tbody.appendChild (row_clones[i].cloneNode(true));
		}
	}
	else
	{
		var clone;
		var j = 0;
		var cl_len = TSort_Classes.length;
		for (i = 0; i < len; i++)
		{
			clone = row_clones[i].cloneNode(true);
			clone.className = TSort_Classes[j++];
			if	(j >= cl_len)  j = 0;
			new_tbody.appendChild (clone);
		}
	}

	// Replace table body
	var table = document.getElementById(TSort_Data[0]);
	var tbody = table.getElementsByTagName('tbody')[0];
	table.removeChild(tbody);
	table.appendChild(new_tbody);

	var obj;
	var color;
	len = sort_keys.length;
	for (i = 0; i < len; i++)
	{
		id = sort_keys[i];
		obj = document.getElementById ('TS_' + id);
		if	(obj == null)  continue;
		obj.innerHTML = '<font color="' + TSort_Store.sort_colors[i] + '">' +
			((TSort_Store.sort_state[id])? "\u2193" : "\u2191") + '</font>';
	}
}

function tsSort(a, b)
{
	var data_a = TSort_Store.rows[a.tsort_row_id];
	var data_b = TSort_Store.rows[b.tsort_row_id];
	var sort_keys = TSort_Store.sort_keys;
	var len = sort_keys.length;
	var id;
	var type;
	var order;
	var result;
	for (var i = 0; i < len; i++)
	{
		id = sort_keys[i];
		type = TSort_Store.sorting[id];

		var v_a = data_a[id];
		var v_b = data_b[id];
		if	(v_a == v_b)  continue;
		if	((type == 'i')||(type == 'f'))
			result = v_a - v_b;
		else
			result = (v_a < v_b)? -1: 1;
		order = TSort_Store.sort_state[id];
		return (order)? result: 0 - result;
	}

	return (a.tsort_row_id < b.tsort_row_id)? -1: 1;
}

var TSort_Store = new TSort_StoreDef();
var TSort_Store;

if	(window.addEventListener)
	window.addEventListener("load", tsInitOnload, false);
else if (window.attachEvent)
	window.attachEvent ("onload", tsInitOnload);
else
{
	if  ((window.onload_sort_table == null)&&(window.onload != null))
		window.onload_sort_table = window.onload;
	// Assign new onload function
	window.onload = tsInitOnload;
}
