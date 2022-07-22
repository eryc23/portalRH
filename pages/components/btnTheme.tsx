import React from 'react';
import { Sun, Moon } from 'phosphor-react';

import { ChangeTheme } from '../../utils/theme';

interface paramsBtn {
    isDark: Boolean,
    setIsDark: (isDark: Boolean) => void
}

export const BtnTheme = ({isDark, setIsDark}: paramsBtn) => {
    return (
        <button className="navbar-burger self-center cursor-pointer transition-all drop-shadow-xl backdrop-blur-md shadow-lg to-transparent bg-slate-200 dark:bg-slate-500 rounded-3xl p-1.5" 
            onClick={() => {
              setIsDark(!isDark);
              ChangeTheme();
            }}>
            {isDark ? <Sun size={23} weight='fill' color='#e6e7e9' /> : <Moon size={23} color='#8f9db2' weight='fill' />} 
          </button>
    )
}