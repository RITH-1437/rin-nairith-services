// Shared by the server-rendered theme bootstrap in app/layout.tsx and the
// client ThemeProvider. It must live in a non-"use client" module, otherwise
// the server layout receives a client-reference stub instead of the string.
export const THEME_STORAGE_KEY = "2brothers-theme";
