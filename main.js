/**
 * Playground Function Handler
 * Dynamically loads and executes functions from playground files
 */

const fs = require('fs').promises;
const fsSync = require('fs');
const path = require('path');
const readline = require('readline');
const vm = require('vm');

class PlaygroundHandler {
    constructor() {
        this.playgroundDir = path.join(__dirname, 'Playground');
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    /**
     * Get all JavaScript files in the playground directory
     */
    async getPlaygroundFiles() {
        try {
            const files = await fs.readdir(this.playgroundDir);
            return files.filter(file => file.endsWith('.js'));
        } catch (error) {
            console.error('Error reading playground directory:', error.message);
            return [];
        }
    }

    /**
     * Read and parse a playground file to extract functions
     */
    async parsePlaygroundFile(filename) {
        try {
            const filePath = path.join(this.playgroundDir, filename);
            const code = await fs.readFile(filePath, 'utf-8');
            
            // Extract function definitions using regex
            const functionRegex = /(?:function\s+(\w+)|const\s+(\w+)\s*=\s*(?:function|\([^)]*\)\s*=>)|(\w+)\s*\([^)]*\)\s*\{)/g;
            const functions = [];
            let match;
            
            while ((match = functionRegex.exec(code)) !== null) {
                const funcName = match[1] || match[2] || match[3];
                if (funcName && !['console', 'require', 'module', 'exports'].includes(funcName)) {
                    functions.push(funcName);
                }
            }
            
            return {
                filename,
                code,
                functions: [...new Set(functions)] // Remove duplicates
            };
        } catch (error) {
            console.error(`Error reading file ${filename}:`, error.message);
            return null;
        }
    }

    /**
     * Execute code safely using Node.js vm module
     */
    executeCode(code, functionName = null) {
        try {
            // Create a sandbox with limited console access
            const sandbox = {
                console: {
                    log: (...args) => console.log('[OUTPUT]:', ...args),
                    error: (...args) => console.error('[ERROR]:', ...args),
                    warn: (...args) => console.warn('[WARN]:', ...args)
                },
                setTimeout: setTimeout,
                setInterval: setInterval,
                clearTimeout: clearTimeout,
                clearInterval: clearInterval
            };

            // Create context for the sandbox
            const context = vm.createContext(sandbox);

            if (functionName) {
                // Try to execute a specific function
                const wrappedCode = `
                    ${code}
                    if (typeof ${functionName} === 'function') {
                        ${functionName}();
                    } else if (typeof ${functionName} !== 'undefined') {
                        console.log('${functionName} is not a function, value:', ${functionName});
                    } else {
                        console.log('${functionName} is not defined in this file');
                    }
                `;
                return vm.runInContext(wrappedCode, context, { timeout: 5000 });
            } else {
                // Execute the entire code
                return vm.runInContext(code, context, { timeout: 5000 });
            }
        } catch (error) {
            console.error('Execution error:', error.message);
            return null;
        }
    }

    /**
     * Display interactive menu
     */
    async showMenu() {
        console.log('\n🎮 Playground Function Handler');
        console.log('================================');
        
        const files = await this.getPlaygroundFiles();
        
        if (files.length === 0) {
            console.log('No JavaScript files found in the Playground directory.');
            this.rl.close();
            return;
        }

        console.log('\nAvailable files:');
        files.forEach((file, index) => {
            console.log(`${index + 1}. ${file}`);
        });

        console.log(`${files.length + 1}. Exit`);
        
        this.rl.question('\nSelect a file to explore: ', async (choice) => {
            const fileIndex = parseInt(choice) - 1;
            
            if (fileIndex === files.length) {
                console.log('Goodbye! 👋');
                this.rl.close();
                return;
            }
            
            if (fileIndex >= 0 && fileIndex < files.length) {
                await this.handleFileSelection(files[fileIndex]);
            } else {
                console.log('Invalid selection. Please try again.');
                await this.showMenu();
            }
        });
    }

    /**
     * Handle file selection and show function options
     */
    async handleFileSelection(filename) {
        const fileData = await this.parsePlaygroundFile(filename);
        
        if (!fileData) {
            console.log('Error loading file. Returning to main menu...');
            await this.showMenu();
            return;
        }

        console.log(`\n📁 File: ${filename}`);
        console.log('='.repeat(30));
        
        if (fileData.functions.length === 0) {
            console.log('No functions found. Executing entire file...\n');
            this.executeCode(fileData.code);
        } else {
            console.log('\nAvailable functions:');
            fileData.functions.forEach((func, index) => {
                console.log(`${index + 1}. ${func}()`);
            });
            console.log(`${fileData.functions.length + 1}. Execute entire file`);
            console.log(`${fileData.functions.length + 2}. Back to main menu`);
            
            this.rl.question('\nSelect an option: ', (choice) => {
                const funcIndex = parseInt(choice) - 1;
                
                if (funcIndex === fileData.functions.length + 1) {
                    this.showMenu();
                } else if (funcIndex === fileData.functions.length) {
                    console.log('\nExecuting entire file:\n');
                    this.executeCode(fileData.code);
                    this.showMenu();
                } else if (funcIndex >= 0 && funcIndex < fileData.functions.length) {
                    console.log(`\nExecuting function: ${fileData.functions[funcIndex]}\n`);
                    this.executeCode(fileData.code, fileData.functions[funcIndex]);
                    this.showMenu();
                } else {
                    console.log('Invalid selection. Please try again.');
                    this.handleFileSelection(filename);
                }
            });
        }
    }

    /**
     * Start the playground handler
     */
    async start() {
        try {
            await this.showMenu();
        } catch (error) {
            console.error('Error starting playground handler:', error.message);
            this.rl.close();
        }
    }

    /**
     * Clean up resources
     */
    close() {
        this.rl.close();
    }
}

// Create and start the playground handler
const playground = new PlaygroundHandler();

// Handle graceful shutdown
process.on('SIGINT', () => {
    console.log('\n\nGracefully shutting down...');
    playground.close();
    process.exit(0);
});

// Start the application
playground.start().catch((error) => {
    console.error('Failed to start playground handler:', error.message);
    process.exit(1);
});

module.exports = PlaygroundHandler;