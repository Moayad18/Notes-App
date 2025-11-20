export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Palette Values For Light Mode
        }
      : {
          // Palette Values For Dark Mode
        }),
  },
});
