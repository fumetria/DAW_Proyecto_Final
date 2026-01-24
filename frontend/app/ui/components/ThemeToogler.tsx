'use client';
import { useState, useEffect } from 'react';
//https://github.com/vercel/next.js/discussions/53063
const SetTheme = () => {
    const [theme, setTheme] = useState(global.window?.__theme || 'light');

    const isDark = theme === 'dark';

    const toggleTheme = () => {
        global.window?.__setPreferredTheme(theme === 'light' ? 'dark' : 'light');
    };

    useEffect(() => {
        global.window.__onThemeChange = setTheme;
    }, []);

    return <button onClick={toggleTheme}>{isDark ? 'dark' : 'light'}</button>;
};

export default SetTheme;