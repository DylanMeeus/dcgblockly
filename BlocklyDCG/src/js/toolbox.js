/**
 * Created by dmeeus1 on 15-3-2017.
 */


var colourMap = new Map();
colourMap.set("Logica","#d29985");
colourMap.set("Text","#e35d6a");
colourMap.set("Varia","silver");
colourMap.set("Variabelen","#c98276");
colourMap.set("HTML", "#dbac98");
colourMap.set("Lijsten", "#eec1ad");
colourMap.set("default", "black"); // Default for in case no other colour is found
/**
 * Give the items listen in the toolbox a custom colour, to make it easier to navigate.
 */
function colourToolbox(){
    var toolboxRows = document.getElementsByClassName("blocklyTreeLabel"); // todo: this returns double the actual elements. Fix this. (filter)
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

// poll for existance of toolbox. (this is rendered later than this script is executed)
var interval = setInterval(colourToolbox,1000);
