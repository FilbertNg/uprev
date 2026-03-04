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
            {!state.isOpen && (
                <ChatToggle
                    isOpen={state.isOpen}
                    onClick={toggleChat}
                />
            )}
        </>
    );
}
