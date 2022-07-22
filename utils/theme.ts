export const HandleTheme = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)){
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
    } else {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
    }
}

export const ChangeTheme = () => {
    if (localStorage?.theme === 'dark') {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
    }else{
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
    }
}