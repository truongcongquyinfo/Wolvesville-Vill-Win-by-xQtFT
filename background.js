chrome.runtime.onMessage.addListener(({ x, y }) => {
  chrome.tabs.query({ url: '*://www.wolvesville.com/*' }, (tabs) => {
    if (!tabs.length) return console.warn('No Wolvesville tab found');
    const target = { tabId: tabs[0].id };

    chrome.debugger.attach(target, '1.3', () => {
      chrome.debugger.sendCommand(target, 'Input.dispatchMouseEvent', {
        type: 'mouseMoved',
        x, y,
        buttons: 1
      });

      chrome.debugger.sendCommand(target, 'Input.dispatchMouseEvent', {
        type: 'mousePressed',
        x, y,
        button: 'left',
        clickCount: 1
      });

      chrome.debugger.sendCommand(target, 'Input.dispatchMouseEvent', {
        type: 'mouseReleased',
        x, y,
        button: 'left',
        clickCount: 1
      });
    });
  });
});