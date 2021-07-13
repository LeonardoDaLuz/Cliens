export function waitForSeconds (seconds) {
    return new Promise((resolve, reject)=> setTimeout(()=>resolve(), seconds*1000));
};

export function waitForEndOfFrame() {
    return new Promise((resolve, reject)=> setTimeout(()=>resolve(), 16));
};

window.waitForSeconds = waitForSeconds;

window.waitForEndOfFrame = waitForEndOfFrame;

