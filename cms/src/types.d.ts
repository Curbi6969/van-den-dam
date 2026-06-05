// Type declaration for Payload's CSS side-effect import, which resolves at
// runtime but has no bundled .d.ts. Without this, `next build`'s type-check
// step fails on `import '@payloadcms/next/css'` in the generated route files.
declare module '@payloadcms/next/css'
