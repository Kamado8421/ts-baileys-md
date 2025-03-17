import readline from 'readline';

export function InputText(message: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    
    return new Promise((resolve) => rl.question(message, resolve));
};