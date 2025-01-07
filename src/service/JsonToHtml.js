function renderSectionLayout(layout, content) {
    var html = "";
    if (layout.before) {
        html += layout.before;
    }
    if (layout.children) {
        if (typeof layout.children === "string") {
            html += content[layout.children];
        }
        else if (Array.isArray(layout.children)) {
            html += layout.children.map(function (value) { return renderSectionLayout(value, content); }).join("");
        }
        else {
            html += renderSectionLayout(layout.children, content);
        }
    }
    if (layout.after) {
        html += layout.after;
    }
    return html;
}
function getSectionHtml(section) {
    var _a, _b;
    var content = section.content, layout = section.layout;
    if (content.length === 0)
        return '';
    var sectionHtml = content.map(function (sectionItem) {
        var sectionItemHtml = renderSectionLayout(layout.children, sectionItem);
        return sectionItemHtml;
    }).join("");
    return ((_a = layout.before) !== null && _a !== void 0 ? _a : '') + sectionHtml + ((_b = layout.after) !== null && _b !== void 0 ? _b : '');
}
;

function renderMainLayout(layout, data) {
    var html = "";
    if (layout.before) {
        html += layout.before;
    }
    if (layout.children) {
        if (typeof layout.children === "string") {
            html += getSectionHtml(data[layout.children]);
        }
        else if (Array.isArray(layout.children)) {
            html += layout.children.map(function (value) { return renderMainLayout(value, data); }).join("");
        }
        else {
            html += renderMainLayout(layout.children, data);
        }
    }
    if (layout.after) {
        html += layout.after;
    }
    return html;
}

export { renderMainLayout }