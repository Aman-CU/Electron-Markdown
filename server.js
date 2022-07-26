const { app, BrowserWindow, globalShortcut } = require('electron');


const onAppReady = function () {

    let parent = new BrowserWindow({
        transparent: true,
        frame: false,
        fullscreen: true,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        },
        trafficLightPosition: {
            x: 0,
            y: 0
          }
    });

    const windowData = {
        isVisible: false,
        isClickThrough: true

    }

    parent.once('close', () => {
        parent = null;
    });

    parent.loadURL(`file://${__dirname}/public/index.html`)
    parent.setIgnoreMouseEvents(false);

    const ret = globalShortcut.register('Super+Control+S', () => {
        windowData.isVisible = !windowData.isVisible;

        if (windowData.isVisible == true) {
            parent.show()
            console.log("showing")

        } else {
            parent.hide()
            console.log("hidding")
        }

    })

    if (!ret) {
        console.log('registration failed')
    }

    globalShortcut.register('Super+Control+C', () => {
        windowData.isClickThrough = !windowData.isClickThrough;
        parent.focus();

        if (windowData.isClickThrough == true) {
            parent.setIgnoreMouseEvents(true)
        } else {
            parent.setIgnoreMouseEvents(false)
        }

    })

};

//~ app.on('ready', onAppReady);
app.on('ready', () => setTimeout(onAppReady, 500));


