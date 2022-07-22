import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { HandleTheme } from '../utils/theme';
import { Navbar } from './components/navbar';

const Home: NextPage = () => {
  const [isDark, setIsDark]= useState<Boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    HandleTheme();
    setIsDark(localStorage?.theme == 'dark');
  }, []);

  return (
    <div className="relative bg-white dark:bg-slate-900 dark:text-white overflow-hidden min-h-screen  transition-all">
      <Navbar isDark={isDark} setIsDark={setIsDark} userData={session?.user} />
      <h1>Seja bem-vindo {session?.user?.name}</h1>
    </div>
  )
}

export default Home
