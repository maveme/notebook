define([
    'jquery',
    // 'base/js/namespace', //Gives access to the current instances of various Notebook components
    'components/d3/d3.min',
    'components/dagre-d3/dist/dagre-d3'
], function($, d3, dagreD3) {
    'use strict';
    
    var g = new dagreD3.graphlib.Graph().setGraph({}); // This represents the execution graph.

    // var currentNode = null;

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
        setCurrentNode("Root", "Root");
    }

    var createNode = function createNode(name, values) {
        g.setNode(name, {
            shape: "circle",
            label: values,
            style: "fill: #5162c2"
        });
    }

    var createEdge = function createEdge(newNode) {
        g.setEdge(currentNode.id, newNode, {
            label: newNode,
            style: "stroke: #000000",
        });
        setCurrentNode(newNode, g.node(newNode).label);
    }

    var createGraph = function createGraph(cNode, nodes, edges) {
        g = new dagreD3.graphlib.Graph().setGraph({});

        // each element contains the input code and the result.
        nodes.forEach(element => {
            createNode(element.hash, element.hash);
        });

        edges.forEach(element => {            
            g.setEdge(element.nodeU, element.nodeV, {
                label: element.value,
                style: "stroke: #000",
            }); 
        });
        
        changeNodeColor(cNode, "#afa");

        currentNode = {id: cNode, value: g.node(cNode).label};
        // currentNode = g.node(cNode).label;
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
            setCurrentNode(node_id, g.node(node_id).label)
            renderGraph();
        });
    }

    var getCurrentNode = function getCurrentNode() {
        return currentNode;
    }

    var setCurrentNode = function setCurrentNode(idp, valuep) {
        if (currentNode != null) {
            changeNodeColor(currentNode.id, "#5162c2");
        }
        currentNode = {id: idp, value: valuep}
        // Change node color
        changeNodeColor(currentNode.id, "#afa");

    }

    function changeNodeColor(nodeP, color) {
        let node = g.node(nodeP); // FIX: redundant
        node.style = `fill\: ${color}`;
    }

    return {
        init: init,
        toggle: toggle,
        createNode: createNode,
        createEdge: createEdge,
        getCurrentNode: getCurrentNode,
        setCurrentNode: setCurrentNode,
        createGraph: createGraph
    }
});