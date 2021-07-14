export function waitForSeconds (seconds: number) {
    return new Promise<void>((resolve, reject)=> setTimeout(()=>resolve(), seconds*1000));
};

export function waitForEndOfFrame() {
    return new Promise<void>((resolve, reject)=> setTimeout(()=>resolve(), 16));
};


