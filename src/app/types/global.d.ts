// global.d.ts

declare global {
    interface Global {
      vercelUrl: string;
    }
  
    var vercelUrl: string; // Declaring that vercelUrl is a global variable
  }
  
  export {}; // To ensure the file is treated as a module
  