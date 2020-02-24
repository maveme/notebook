define([
    'jquery',
    // 'base/js/namespace', //Gives access to the current instances of various Notebook components
    'components/d3/d3.min',
    'components/dagre-d3/dist/dagre-d3'
], function($, d3, dagreD3) {
    'use strict';
    
    var g = new dagreD3.graphlib.Graph().setGraph({}); // This represents the execution graph.

    var currentNode = null;

    var toggle = function toggleExecutionPanel() {
        let main_panel = $('#notebook_panel');

        var executionTreeDiv = $('#execution-tree');
        if (executionTreeDiv.length < 1) {
            executionTreeDiv = $('<div id="execution-tree"/>');
            executionTreeDiv.append("<h1>Execution Graph</h1>");

            executionTreeDiv.css('position', 'relative');
            executionTreeDiv.css('top', 0);
            executionTreeDiv.css('right', 0);
            executionTreeDiv.css('height', '100%');
            executionTreeDiv.css('overflow', 'auto');
            executionTreeDiv.css('text-align', 'center');

            var thisSVG = $("<svg id='svg-execution-tree' width=460 height=400><g/></svg");
            executionTreeDiv.append(thisSVG);

            executionTreeDiv.insertAfter(main_panel);
        } 

        main_panel.css({float: 'left', 'overflow-x': 'auto'});
        
        renderGraph();
    }

    var init = function init() {
        g.setNode("Root", { // The first parameter is the id of the cell
            shape: "circle",
            label: "Root",
            style: "fill: #afa"
        });
        setCurrentNode("Root");
    }

    var createNode = function createNode(name, values) {
        g.setNode(name, {
            shape: "circle",
            label: values,
            style: "fill: #5162c2"
        });
    }

    var createEdge = function createEdge(newNode) {
        g.setEdge(currentNode, newNode, {
            label: newNode,
            style: "stroke: #000000",
        });
        setCurrentNode(newNode);
    }

    function renderGraph() {
        var svg = d3.select("svg"), 
        inner = svg.select("g");

        var render = new dagreD3.render(); // Create the renderer
        render(inner, g); // Run the renderer. This is what draws the final graph.


        // Center the current graph
        var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
        inner.attr("transform", "translate(" + xCenterOffset + ", 20)");

        svg.attr('height', g.graph().height + 20); // SVG resize


        var selections = inner.selectAll("g.node");
        selections.on('click', function (node_id) { // Clicking the node triggers the execution of all the predecessors in the path.
            // Make a callback to the kernel changing the current node
            setCurrentNode(node_id)
            renderGraph();
        });
    }

    var getCurrentNode = function getCurrentNode() {
        return currentNode;
    }

    var setCurrentNode = function setCurrentNode(node) {
        if (currentNode != null) {
            changeNodeColor(currentNode, "#5162c2");
        }
        currentNode = node;
        // Change node color
        changeNodeColor(currentNode, "#afa");

    }

    function changeNodeColor(node_id, color) {
        let node = g.node(node_id);
        node.style = `fill\: ${color}`;
    }

    return {
        init: init,
        toggle: toggle,
        createNode: createNode,
        createEdge: createEdge,
        getCurrentNode: getCurrentNode,
        setCurrentNode: setCurrentNode
    }
});