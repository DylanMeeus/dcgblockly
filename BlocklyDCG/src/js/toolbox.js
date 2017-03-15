/**
 * Created by dmeeus1 on 15-3-2017.
 */


var colourMap = new Map();
colourMap.set("Logica","#D73E68");
colourMap.set("Text","#1FCB4A");
colourMap.set("Varia","silver");
colourMap.set("Variabelen","#BC2EBC");
colourMap.set("HTML", "#62A9FF");
colourMap.set("Lijsten", "#8D18AB");
colourMap.set("default", "black"); // Default for in case no other colour is found
/**
 * Give the items listen in the toolbox a custom colour, to make it easier to navigate.
 */
function colourToolbox(){
    var toolboxRows = document.getElementsByClassName("blocklyTreeLabel"); // todo: this returns double the actual elements. Fix this. (filter)
    console.log(toolboxRows);
    window.clearInterval(interval);

    if(toolboxRows){
        for(var i = 0; i < toolboxRows.length; i++)
        {
            var toolboxItem = toolboxRows[i];
            var treeLabel = toolboxItem.innerHTML;
            var associatedColour = colourMap.get(treeLabel)
            if(associatedColour == null){
                associatedColour = colourMap.get("default");
            }
            toolboxItem.innerHTML = '<label style=\' font-size:125%; color:' + associatedColour + '\'>&bull;</label> ' + treeLabel;
        }
    }

}

var interval = setInterval(colourToolbox,1000); // poll for existance of toolbox. (this is rendered later than this script is executed
