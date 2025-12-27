export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // قيم الـ Light Mode
          primary: { main: "#2563EB" }, // أزرق ملكي
          background: {
            default: "#F8FAFC", // خلفية الصفحة (رمادي ثلجي)
            paper: "#FFFFFF", // خلفية الملاحظات (أبيض)
          },
          text: {
            primary: "#1E293B",
            secondary: "#64748B",
          },
        }
      : {
          // قيم الـ Dark Mode
          primary: { main: "#60A5FA" }, // أزرق سماوي مضيء
          background: {
            default: "#0F172A", // كحلي ليلي عميق
            paper: "#1E293B", // كروت ملاحظات كحلية متوسطة
          },
          text: {
            primary: "#F8FAFC",
            secondary: "#94A3B8",
          },
        }),
  },
});
