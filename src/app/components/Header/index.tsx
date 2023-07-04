'use client'
 
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../GlobalRedux/store';
import Image from "next/image"
import { toggleMobileMenu } from '@/app/GlobalRedux/Features/display/displaySlice';
import Link from 'next/link';

export default function Header() {
  const dispatch = useDispatch();
  const isConnected = useSelector((state: RootState) => state.login.isConnected);
  const mobileMenu = useSelector((state: RootState) => state.display.mobileMenu);

  const handleClickMenu = () => {
    dispatch(toggleMobileMenu(!mobileMenu))
  }

  return (
    <header className="flex justify-around bg-pink-200 items-center py-3">
      <div className='hidden md:block'>
        <h1 className="text-3xl text-center font-bold">Espace Restauration</h1>
        <nav>
          <ul className="flex gap-2">
            <li>
              Accueil
            </li>
            <li>
              Gestion pensionnaire
            </li>
            <li>
              Gestion des paiements
            </li>
          </ul>
        </nav>
      </div>
      <div className="">
        <Image
            src="/Franconville_LOGO.png"
            width={300}
            height={300}
            alt="Logo de la ville"
        />
      </div>
      
      {isConnected &&
        <div>
          <div className='hidden lg:block'>
            <span className="font-bold text-2xl">Bienvenue</span>
            <span className="text-lg"> Logan</span>
            <span className="text-lg mr-4"> Roy</span>
            <span className="text-xs"> Se déconnecter</span>

          </div>
          <div className=' md:hidden flex flex-col justify-between h-5 z-30' onClick={handleClickMenu}>
            <span className={mobileMenu ? 'hamburger-line hamburger-line--active z-30' : 'hamburger-line'}></span>
            <span className={mobileMenu ? 'hamburger-line hamburger-line--active z-30' : 'hamburger-line'}></span>
            <span className={mobileMenu ? 'hamburger-line hamburger-line--active z-30' : 'hamburger-line'}></span>

            <nav className={mobileMenu ?
                'absolute top-[12%] bg-white text-black  left-0 right-0 w-full ease-in duration-300'
              :
                'absolute top-[12%] bg-white text-black  left-[-100%] right-0 w-full ease-in duration-300'
              }>
              <ul>
                <li onClick={handleClickMenu} className='mb-1 p-2' >
                  <Link href='/'>Accueil</Link>
                </li >
                <li onClick={handleClickMenu} className='mb-1 p-2' >
                  <Link href='/#'>Gestion pensionnaire</Link>
                </li >
                <li onClick={handleClickMenu} className='mb-1 p-2' >
                  <Link href='/#'>Gestion des paiements</Link>
                </li >
              </ul>
            </nav>
          </div>
        </div>
      }

      {!isConnected &&
        <div>
          <div className='hidden lg:block'>
            <span className="font-bold text-2xl">Bonjour,</span>
            <span className="text-lg"> merci de vous connecter</span>
          </div>

          <div className=' md:hidden flex flex-col justify-between h-5 z-30' onClick={handleClickMenu}>
            <span className={mobileMenu ? 'hamburger-line hamburger-line--active z-30' : 'hamburger-line'}></span>
            <span className={mobileMenu ? 'hamburger-line hamburger-line--active z-30' : 'hamburger-line'}></span>
            <span className={mobileMenu ? 'hamburger-line hamburger-line--active z-30' : 'hamburger-line'}></span>

            <nav className={mobileMenu ?
                'absolute top-[12%] bg-white text-black  left-0 right-0 w-full ease-in duration-300'
              :
                'absolute top-[12%] bg-white text-black  left-[-100%] right-0 w-full ease-in duration-300'
              }>
              <ul>
                <li onClick={handleClickMenu} className='mb-1 p-2' >
                  <Link href='/'>Accueil</Link>
                </li >
                <li onClick={handleClickMenu} className='mb-1 p-2' >
                  <Link href='/#'>Gestion pensionnaire</Link>
                </li >
                <li onClick={handleClickMenu} className='mb-1 p-2' >
                  <Link href='/#'>Gestion des paiements</Link>
                </li >
              </ul>
            </nav>
          </div>
          
        </div>
      }
    </header>
  )
}
