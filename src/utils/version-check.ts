// Node.js version check utility
export function checkNodeVersion(): void {
  const nodeVersion = process.version;
  const versionParts = nodeVersion.slice(1).split('.');
  const majorVersionStr = versionParts[0];
  
  if (!majorVersionStr) {
    console.error('❌ Error: Could not determine Node.js version.');
    process.exit(1);
  }
  
  const majorVersion = parseInt(majorVersionStr, 10);
  
  if (majorVersion < 18) {
    console.error(`❌ Error: liusha-cli requires Node.js v18 or higher. You are using ${nodeVersion}.`);
    console.error('Please upgrade Node.js: https://nodejs.org/');
    process.exit(1);
  }
}