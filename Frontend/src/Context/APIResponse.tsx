import { createContext, useContext, useState, useRef, type ReactNode } from "react";

export interface APIResponseContextType {
    executionStatus: boolean | null;
    message: string | null;
    showSuccess: (message?: string, autoCloseMs?: number) => void;
    showFailure: (message?: string, autoCloseMs?: number) => void;
    clearStatus: () => void;
}

export const APIResponseContext =
    createContext<APIResponseContextType | undefined>(undefined);

export const APIResponseProvider = ({ children }: { children: ReactNode }) => {
    const [executionStatus, setExecutionStatus] = useState<boolean | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const timeoutRef = useRef<any>(null);

    const clearStatus = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setExecutionStatus(null);
        setMessage(null);
    };

    const showSuccess = (message?: string, autoCloseMs?: number) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setExecutionStatus(true);
        setMessage(message || "Operation completed successfully");
        if (autoCloseMs && autoCloseMs > 0) {
            timeoutRef.current = setTimeout(clearStatus, autoCloseMs);
        }
    };

    const showFailure = (message?: string, autoCloseMs?: number) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setExecutionStatus(false);
        setMessage(message || "An error occurred");
        if (autoCloseMs && autoCloseMs > 0) {
            timeoutRef.current = setTimeout(clearStatus, autoCloseMs);
        }
    };

    return (
        <APIResponseContext.Provider
            value={{
                executionStatus,
                message,
                showFailure,
                showSuccess,
                clearStatus
            }}
        >
            {children}
        </APIResponseContext.Provider>
    );
};

export const useAPIResponse = (): APIResponseContextType => {
    const context = useContext(APIResponseContext);
    if (!context) {
        throw new Error("useAPIResponse must be used within an APIResponseProvider");
    }
    return context;
};