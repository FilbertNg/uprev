"use client";

import { useChatState } from "@/hooks/useChatState";
import { ChatToggle } from "./ChatToggle";
import { ChatWindow } from "./ChatWindow";

export function ChatWidget() {
    const { state, toggleChat, sendMessage } = useChatState();

    return (
        <>
            <ChatWindow
                state={state}
                onSendMessage={sendMessage}
                onClose={toggleChat}
            />
            <ChatToggle
                isOpen={state.isOpen}
                onClick={toggleChat}
            />
        </>
    );
}
