export const pause = (timeoutMs: number) => 
    new Promise<void>((resolve) => 
        setTimeout(() => resolve(), timeoutMs));