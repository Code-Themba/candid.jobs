import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

const STORAGE_KEY = "cj-theme";

const getSystemTheme = () => {
  return window.matchMedia("(prefers-color-scheme:dark").matches
    ? "dark"
    : "light";
};

const applyThemeToDom = (theme) => {
  document.documentElement.setAttribute("data-theme", theme);
};

const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved || getSystemTheme();
  });

  /* Apply to DOM whenever theme changes occur */
  useEffect(() => {
    applyThemeToDom(theme);
  }, [theme]);

  /* Listen for OS preference changes  - only applies when the user hasn't manually chosen a theme. */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme:dark)");
    const handler = (e) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setThemeState(e.matches ? "dark" : "light");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const setTheme = useCallback((next) => {
    localStorage.setItem(STORAGE_KEY, next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export const ThemeToggle = ({ className = "", style }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      className={`cj-theme-toggle ${className}`.trim()}
      style={style}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span className="cj-theme-toggle-icon" aria-hidden="true">
        {isDark ? "☀" : "☾"}
      </span>
      <span className="cj-theme-toggle-icon">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
};
