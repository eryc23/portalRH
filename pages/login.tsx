import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import type { NextPage } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { CheckCircle, GoogleLogo, GithubLogo } from 'phosphor-react';

import { HandleTheme } from '../utils/theme';
import { BtnTheme } from './components/btnTheme';
import HeaderContainer from './components/header';


export async function getServerSideProps(context){
  const session = await getSession(context);

  if(session){
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

const Login: NextPage = () => {
  const [isDark, setIsDark] = useState<Boolean>(false);
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    setIsDark(localStorage?.theme == 'dark');

    HandleTheme();
  }, []);

  return (
    <div className="relative bg-white dark:bg-slate-900 dark:text-white overflow-hidden min-h-screen transition-all" style={{backgroundImage: "url('/bg.svg')", backgroundAttachment: 'fixed', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom right'}}>
      <HeaderContainer title={'Logar'} />
      <div className="bg-transparent flex justify-end p-6 px-4">
          <BtnTheme isDark={isDark} setIsDark={setIsDark} />
      </div>
      <div className="relative py-20 xl:pt-6 xl:pb-24 bg-transparent">
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 mb-20 lg:mb-0">
              <img src="logo.svg" className="inline-block py-px px-2 mb-4 text-xs leading-5 font-medium uppercase rounded-9xl w-52" />
              <h1 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight text-coolGray-900 font-bold tracking-tight">RH+</h1>
              <h1 className="mb-6 text-3xl md:text-5xl lg:text-3xl leading-tight text-coolGray-900 font-bold tracking-tight">O RH cada vez mais próximo de você.</h1>
              <p className="mb-8 text-lg md:text-xl leading-7 text-coolGray-500 font-medium">Simples, fácil e prático.</p>
              <ul className='dark:text-slate-400'>
                <li className="mb-6 flex items-center">
                  <CheckCircle className="mr-3" color='#5e17eb' size={28} weight='fill' />
                  <p className="text-lg md:text-xl leading-7 text-coolGray-500 font-medium">Acesso ao contra-cheque.</p>
                </li>
                <li className="mb-6 flex items-center">
                  <CheckCircle className="mr-3" color='#5e17eb' size={28} weight='fill' />
                  <p className="text-lg md:text-xl leading-7 text-coolGray-500 font-medium">Acesso ao crachá digital.</p>
                </li>
                <li className="flex items-center">
                  <CheckCircle className="mr-3" color='#5e17eb' size={28} weight='fill' />
                  <p className="text-lg md:text-xl leading-7 text-coolGray-500 font-medium">Acesso ao service desk direto com RH.</p>
                </li>
              </ul>
            </div>
            <div className="w-full lg:w-1/2">
              <Transition 
                show={isRegister}
                enter="transition-scale ease-linear duration-500"
                enterFrom="scale-x-[-1]"
                enterTo="scale-x-[+1]"
                leave="transition-opacity ease-linear duration-0"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 lg:max-w-xl lg:ml-auto rounded-4xl shadow-2xl backdrop-blur-sm bg-slate-800/[.04]"
                >
                  <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">Realizar cadastro</h2>
                  <label className="mb-4 flex flex-col w-full">
                    <input className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border bg-transparent border-coolGray-200 outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 rounded-lg shadow-sm" type="text" placeholder="Informe seu email" />
                  </label>
                  <label className="mb-4 flex flex-col w-full">
                    <input className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border bg-transparent border-coolGray-200 outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 rounded-lg shadow-sm" type="text" placeholder="Informe sua senha" />
                  </label>
                  <a className="mb-4 inline-block py-3 px-7 w-full leading-6 text-orange-50 font-medium text-center bg-indigo-700 hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50 rounded-md" href="#">Criar conta</a>
                  <a onClick={() => setIsRegister(false)} className="mb-4 inline-block py-3 px-7 w-full leading-6 text-orange-50 font-medium text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md" href="#">Voltar</a>
              </Transition>

              <Transition 
                show={!isRegister}
                enter="transition-scale ease-linear duration-500"
                enterFrom="scale-x-[-1]"
                enterTo="scale-x-[+1]"
                leave="transition-opacity ease-linear duration-0"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 lg:max-w-xl lg:ml-auto rounded-4xl shadow-2xl backdrop-blur-sm bg-slate-800/[.04]"
                >
                <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">Realizar acesso</h2>
                <h3 className="mb-7 text-base md:text-lg text-coolGray-500 font-medium text-center">{
                  new Date().getHours() > 18 ? 'Boa noite' : ( new Date().getHours() > 12 ? 'Boa tarde' : 'Bom dia' )
                }, Seja muito bem-vindo</h3>
                <label className="mb-4 flex flex-col w-full">
                  <input className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border bg-transparent border-coolGray-200 outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded-lg shadow-sm" type="text" placeholder="Informe seu email" />
                </label>
                <label className="mb-4 flex flex-col w-full">
                  <input className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border bg-transparent border-coolGray-200 outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded-lg shadow-sm" type="text" placeholder="Informe sua senha" />
                </label>
                <a className="mb-4 inline-block py-3 px-7 w-full leading-6 text-orange-50 font-medium text-center bg-indigo-700 hover:bg-indigo-800 focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50 rounded-md" href="#">Começar</a>
                <a onClick={() => setIsRegister(true)} className="mb-4 inline-block py-3 px-7 w-full leading-6 text-orange-50 font-medium text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-md" href="#">Cadastre-se</a>
                <div className="flex items-center mb-4 w-full text-xs text-coolGray-400">
                  <div className="flex-1 h-px bg-coolGray-100"></div>
                  <span className="px-2 font-medium">OU</span>
                  <div className="flex-1 h-px w-24 bg-coolGray-100"></div>
                </div>
                <a onClick={() => signIn('google')} className="mb-4 w-full text-coolGray-500 hover:text-coolGray-600 font-medium text-center border border-coolGray-200 hover:border-coolGray-300 rounded-md shadow-sm" href="#">
                  <div className="flex items-center justify-center py-3 px-3 leading-5">
                    <GoogleLogo size={24} weight='bold' className="mr-3" />
                    <span>Entrar com Google</span>
                  </div>
                </a>
                <a onClick={() => signIn('github')} className="mb-6 w-full text-coolGray-500 hover:text-coolGray-600 font-medium text-center border border-coolGray-200 hover:border-coolGray-300 rounded-md shadow-sm" href="#">
                  <div className="flex items-center justify-center py-3 px-3 leading-5">
                    <GithubLogo weight='bold' size={24} className="mr-3" />
                    <span>Entrar com Github</span>
                  </div>
                </a>
              </Transition>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
