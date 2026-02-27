// Global chat opener — simple callback pattern for cross-component communication
// More reliable than CustomEvent.detail which can be lost in some environments

type OpenChatCallback = (aiGreeting?: string) => void;

let _callback: OpenChatCallback | null = null;

/** Called by ChatWidget on mount to register its open handler */
export function registerChatOpener(cb: OpenChatCallback) {
    _callback = cb;
}

/** Called by ChatWidget on unmount */
export function unregisterChatOpener() {
    _callback = null;
}

/** Called by any CTA button to open the chat, optionally with a custom AI greeting */
export function openChatWithGreeting(aiGreeting?: string) {
    if (_callback) {
        _callback(aiGreeting);
    }
}
