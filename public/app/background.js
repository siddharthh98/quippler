/* eslint-disable no-undef */
const appActionName = "Quipit";

var contextMenuItem = {
    "id": appActionName,
    "title": appActionName,
    "contexts": ["selection"]
};

function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}

chrome.contextMenus.create(contextMenuItem);

chrome.storage.sync.get({highlights: []}, (result) => {

    var highlights = result.highlights;
    chrome.contextMenus.onClicked.addListener((click) => {

        highlights = result.highlights.length >= 10 ? [] : result.highlights;

        if (click.menuItemId === appActionName && click.selectionText) {

            if (click.selectionText.length <= 200) {
                const currentHighlight = {
                    highlightId : create_UUID(), 
                    highlight: click.selectionText
                }
    
                highlights.push(currentHighlight);
        
                chrome.storage.sync.set({ highlights: highlights }, () => {
                    alert(currentHighlight.highlight);
                });
            }
        }
     });

     chrome.runtime.onMessage.addListener((msg, _sender, response) => {
        switch (msg.type) {
            case "requestData":
                response(highlights);
                break;
            case "resetData":
                chrome.storage.sync.set({highlights: null}, () => {
                    console.log('Hello');
                    response("Successfully reset the data!");
                });
                break;
            default:
                response('unkown request!');
                break;
        }
    });
});

