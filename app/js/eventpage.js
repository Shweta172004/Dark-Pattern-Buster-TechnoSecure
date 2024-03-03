// First, create the main context menu item
var mainContextElement = {
    "id": "SurakshaNet",
    "title": "SurakshaNet",
    "contexts": ["all"]
};
chrome.contextMenus.create(mainContextElement);

// Then, add sub-items for each specific action
var actions = [
    { id: "removeInsiteHighlightKeepContent", title: "Remove Insite Highlight but Keep Content" },
    { id: "addInsiteHighlight", title: "Add Insite Highlight" },
    { id: "removeSpanEntirely", title: "Remove Span Entirely" }
];

actions.forEach(action => {
    chrome.contextMenus.create({
        id: action.id,
        title: action.title,
        parentId: "SurakshaNet",
        contexts: ["all"]
    });
});

// Listen for clicks on your context menu items
chrome.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId === "removeInsiteHighlightKeepContent") {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: function removeInsiteHighlightKeepContent() {
                // Assuming you've managed to add 'hovered-insite-highlight' class to the element being hovered over
                var element = document.querySelector(".insite-highlight:hover");
                console.log(element);
                if (!element) return; // Exit if no element is marked
                // Remove 'modal-content' and 'insite-highlight-body' divs inside the highlighted element
                var modalContents = element.querySelectorAll(".modal-content, .insite-highlight-body");
                console.log("meow");
                console.log(modalContents);
                modalContents.forEach(function(modalContent) {
                    modalContent.parentNode.removeChild(modalContent);
                });
                
                element.classList.remove("insite-highlight");
                element.classList.remove("Urgency");
                element.classList.remove("SocialProof");
                element.classList.remove("Scarcity");
                element.classList.remove("Misdirection");
                element.classList.remove("ForcedAction");
                element.classList.remove("Obstruction");
                element.classList.remove("Sneaking");
                // Move the remaining child nodes out of the '.insite-highlight' span
                // while (element.firstChild){;
                //     element.parentNode.insertBefore(element.firstChild, element);
                // }
                // // Remove the '.insite-highlight' span itself
                // element.parentNode.removeChild(element);
            }
        });
    }    
     else if (info.menuItemId === "addInsiteHighlight") {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: function addInsiteHighlight() {
                var selection = window.getSelection();
                console.log(selection)
                if (!selection.rangeCount) return; // No selection
                var range = selection.getRangeAt(0);
                var newSpan = document.createElement("span");
                newSpan.className = "insite-highlight";
                newSpan.textContent = selection.toString();
                range.deleteContents(); // Remove selected text
                range.insertNode(newSpan); // Insert new highlighted span
                selection.removeAllRanges(); // Clear selection
            }
        });
    }   
    else if (info.menuItemId === "removeSpanEntirely") {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: function removeSpanEntirely() {
                var element = document.querySelector(".insite-highlight:hover");
                if (element) {
                    element.parentNode.removeChild(element);
                }
            }
        });
    }
});

