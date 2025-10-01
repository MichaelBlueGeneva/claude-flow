import { execSync } from 'child_process';
import os from 'os';

/**
 * Check if Claude Code CLI is available in the system PATH
 * @returns {boolean} True if Claude CLI is found, false otherwise
 */
export function isClaudeCliAvailable() {
  try {
    const platform = os.platform();
    const command = platform === 'win32' ? 'where claude' : 'which claude';
    
    execSync(command, { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

/**
 * Get the path to the Claude CLI executable
 * @returns {string|null} Path to Claude CLI executable or null if not found
 */
export function getClaudeCliPath() {
  try {
    const platform = os.platform();
    const command = platform === 'win32' ? 'where claude' : 'which claude';
    
    const result = execSync(command, { encoding: 'utf8' });
    return result.trim().split('\n')[0]; // Return first result in case of multiple
  } catch {
    return null;
  }
}

/**
 * Check Claude CLI availability and show appropriate error messages
 * @param {boolean} isNonInteractive - Whether running in non-interactive mode
 * @returns {boolean} True if Claude CLI is available
 */
export function checkClaudeCliWithErrorMessage(isNonInteractive = false) {
  if (isClaudeCliAvailable()) {
    return true;
  }

  if (!isNonInteractive) {
    console.log('⚠️  Claude Code CLI not found in PATH');
    console.log('Install it with: npm install -g @anthropic-ai/claude-code');
    console.log('Or download from: https://claude.ai/download');
  } else {
    console.error(JSON.stringify({
      error: 'Claude Code CLI not found',
      message: 'Install with: npm install -g @anthropic-ai/claude-code or download from https://claude.ai/download',
      installCommand: 'npm install -g @anthropic-ai/claude-code'
    }));
  }
  
  return false;
}