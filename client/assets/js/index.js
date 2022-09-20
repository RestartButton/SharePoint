
const ws = io();

ws.on('message', (WebSocketMessage) => {
    const messageBody = JSON.parse(WebSocketMessage);
    const cursor = getOrCreateCursorFor(messageBody);
    cursor.style.transform = `translate(${messageBody.x}px, ${messageBody.y}px)`;
});

ws.on('close', (data) => {
    const messageBody = JSON.parse(data);
    const sender = messageBody.sender;
    const existing = document.querySelector(`[data-sender='${sender}']`);
    if(existing) existing.remove();
});

document.onmousemove = (evt) => {
    const messageBody = { x: evt.clientX, y: evt.clientY };
    ws.emit('message', JSON.stringify(messageBody));
};

function getOrCreateCursorFor(messageBody) {
    const sender = messageBody.sender;
    const existing = document.querySelector(`[data-sender='${sender}']`);
    if(existing) {
        return existing;
    }
    const template = document.getElementById('cursor');
    const cursor = template.content.firstElementChild.cloneNode(true);
    const svgPath = cursor.children[0];

    cursor.setAttribute("data-sender", sender);
    svgPath.setAttribute('fill', `hsl(${messageBody.color}, 50%, 50%)`);
    document.body.appendChild(cursor);

    return cursor;
}


