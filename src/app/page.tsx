'use client';

import Image from 'next/image'
import Header from './components/Header'
import Footer from './components/Footer'

import type { RootState } from './GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
import {setFormLogin, login, addContact} from './GlobalRedux/Features/login/loginSlice';
import {setDisplayedMenu, setDisplayedMenuIndex, incrementDisplayedMenuIndex, decrementDisplayedMenuIndex, setContactInput } from './GlobalRedux/Features/display/displaySlice';
import { useEffect } from 'react';

export default function Home() {

  const user = useSelector((state: RootState) => state.login.user);
  const formLogin = useSelector((state: RootState) => state.login.formLogin);
  const isConnected = useSelector((state: RootState) => state.login.isConnected);
  const displayedMenuIndex = useSelector((state: RootState) => state.display.displayedMenuIndex);
  const displayedMenu = useSelector((state: RootState) => state.display.displayedMenu);
  const contactInput = useSelector((state: RootState) => state.display.contactInput);
  const menus = useSelector((state: RootState) => state.login.user.menus);

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFormLogin(e.target))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    dispatch(login(formLogin.email))
  }

  const handleClickMinus = () => {
    dispatch(decrementDisplayedMenuIndex())
  }

  const handleClickPlus = () => {
    dispatch(incrementDisplayedMenuIndex())
  }

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    dispatch(setContactInput(e.target.value));
  }

  const handleSubmitContact = () => {
    dispatch(addContact(contactInput))
    dispatch(setContactInput(''))
  }
  useEffect(() => {
    if(isConnected) {
      const date = (new Date()).toLocaleDateString();
      // dispatch(setDisplayedMenu(menus.find((menu, index) => menu.date === date)));
      const foundMenu = menus.find((menu, index: number) => {
        dispatch(setDisplayedMenuIndex(index))
        return menu.date === date
      });
      if (foundMenu) dispatch(setDisplayedMenu(foundMenu));
    }
  }, [isConnected])

  useEffect(() => {
    if(isConnected) {
      if (displayedMenuIndex !== null) dispatch(setDisplayedMenu(user.menus[displayedMenuIndex]));
      
    }
  }, [displayedMenuIndex])

  const jsxPensionnaires = user.children.map((child) => (
    <div key={child.id} className='mb-2'>
      <h3 className='underline underline-offset-4 text-bold font-medium mb-2'>{child.firstname} {child.lastname}</h3>
      <div className='flex flex-col md:flex-row gap-2 ml-4'>
        <div className='flex-1 border p-2'>
          <h4 className='text-center font-semibold'>Informations</h4>
          <ul>
            <li>Classe : {child.class}</li>
            <li>Date de naissance : {child.naissance}</li>
          </ul>
        </div>
        <div className='flex-1 border p-2'>
          <h4 className='text-center font-semibold'>Présence</h4>
          <div className='flex flex-wrap md:flex-nowrap gap-2'>

            {child.présences.map(jour => (
              <div key={jour.id}>
                {jour.jour}
                {jour.wasHere &&
                  <div className='w-6 h-6 bg-green-400 rounded-full m-auto'></div>
                }
                {jour.wasHere === false &&
                  <div className='w-6 h-6 bg-red-400 rounded-full m-auto'></div>
                }
                {jour.wasHere === null &&
                  <div className='w-6 h-6 border border-black rounded-full m-auto'></div>
                }
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ))

  const jsxNotes = user.notes.map(note => (
    <div key={note.id} className='bg-orange-100 p-2 mb-2'>
      <h4 className='font-semibold'>{note.title}</h4>
      <p className='ml-2'>{note.message}</p>
    </div>
  ))
  
  const jsxContacts = user.contacts.map(contact => (
    <div key={contact.id} className={`${contact.me ? "bg-blue-100 w-[90%] p-2 mb-2 border rounded-3xl self-end" : 'bg-gray-100 w-[90%] p-2 mb-2 border rounded-3xl'}`}>
      <p>{contact.message}</p>
    </div>
  ))

  return (
    <div className='min-h-screen flex flex-col bg-gray-200'>
      <Header/>

      {isConnected && 
        <div className='bg-blue-200 flex-1  lg:w-[70%] md:m-auto p-5 flex flex-col md:flex-row md:flex-wrap gap-4'>

        <div className='flex-[2]'>
          <div className='bg-red-200 border rounded-lg p-2 mb-4'>
            <h2 className='text-red-800 font-semibold text-xl text-center'>Gérer vos informations</h2>
            <h3 className='underline underline-offset-4 text-bold font-medium'>Mes informations</h3>
            <div className='ml-md-5'>
              <ul>
                <li>
                  Prénom: {user.firstname}
                </li>
                <li>
                  Nom: {user.lastname}
                </li>
                <li>
                  Rue: {user.street}
                </li>
                <li>
                  Code postal: {user.zipcode}
                </li>
                <li>
                  Pays: {user.country}
                </li>
              </ul>
            </div>
            <h3 className='underline underline-offset-4 text-bold font-medium'>Informations de paiements</h3>
            <div className='ml-md-5'>
              <ul>
                <li>
                  Méthode de paiement: {user.payments.method}
                </li>
                <li>
                  Périodicité: {user.payments.periodicity}
                </li>
              </ul>
            </div>
            <h3 className='underline underline-offset-4 text-bold font-medium'>Informations sur vos aides</h3>
            <p className='ml-md-5'>
              Selon vos revenus déclarés, vous ne pouvez bénéficier d&apos;aucunes aides.
            </p>
          </div>

          <div className='bg-red-200 border rounded-lg p-2'>
            <h2 className='text-red-800 font-semibold text-xl text-center'>Gérer vos pensionnaires</h2>

            {jsxPensionnaires}

          </div>
        </div>

        <div className='bg-orange-200 flex-[1] border rounded-lg p-4'>
          <div>
            <h3 className='text-orange-800 font-semibold text-xl text-center'>Menu</h3>
            <div className='bg-green-200 p-2 border rounded-md text-center mb-2'>
              <div className='mb-2 flex justify-around'>
                <div onClick={handleClickMinus} className='cursor-pointer flex-[1]'>
                  <Image
                    src='/arrow.png'
                    alt='arrow'
                    height={25}
                    width={25}
                  />
                </div> 
                <div className='flex-[2]'>

                  <span className=''>{displayedMenu.jour} {displayedMenu.date}</span>
                </div>
                <div onClick={handleClickPlus} className='rotate-180 cursor-pointer flex-[1]'>
                  <Image
                    src='/arrow.png'
                    alt='arrow'
                    height={25}
                    width={25}
                  />
                </div>
              </div>
              <h4 className='font-semibold text-green-800'>Entrées</h4>
              <ul className='mb-2'>
                <li className='font-light italic'>{displayedMenu.entrées[0]}</li>
                <li className='font-light italic'>{displayedMenu.entrées[1]}</li>
              </ul>
              <h4 className='font-semibold text-green-800'>Plats</h4>
              <ul className='mb-2'>
                <li className='font-light italic'>{displayedMenu.plats[0]}</li>
                <li className='font-light italic'>{displayedMenu.plats[1]}</li>
              </ul>
              <h4 className='font-semibold text-green-800'>Desserts</h4>
              <ul className='mb-2'>
                <li className='font-light italic'>{displayedMenu.desserts[0]}</li>
                <li className='font-light italic'>{displayedMenu.desserts[1]}</li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className='text-orange-800 font-semibold text-xl text-center'>Notes</h3>
            {jsxNotes}
          </div>
          <div>
            <h3 className='text-orange-800 font-semibold text-xl text-center'>Contact</h3>
            <div className='flex flex-col bg-yellow-100 p-2 rounded-lg'>

              {jsxContacts}
              <div className='flex'>
                <input type="text" className='md:flex-1'  placeholder='tapez votre message' onChange={handleContactChange}/>
                <button className='bg-yellow-200 text-sm hover:bg-blue-200 px-2' onClick={handleSubmitContact}>envoyer</button>
              </div>
            </div>
          </div>
        </div>
        </div>
      }

      {
        !isConnected && 
        <form onSubmit={handleSubmit} className='flex-1 flex flex-col items-center align-middle justify-center'>

          <label className='text-center'>
            <p className='mb-1'>Adresse email</p>
            <input
              type="text"
              name="email"
              value={formLogin.email}
              onChange={handleInputChange}
              required
              placeholder='email@xxx.com'
              className='border border-red-500 rounded-3xl p-2'
            />
          </label>

          <label className='text-center mb-5'>
            <p className='mb-1'>Mot de passe</p>
            <input
              type="text"
              name="password"
              value={formLogin.password}
              onChange={handleInputChange}
              required className='border border-red-500 rounded-3xl p-2'
              placeholder='mot de passe'
            />
          </label>

          <button className='text-center text-white bg-red-500 border border-red-500 rounded-3xl py-2 px-5' type="submit">Envoyer</button>

        </form>
      }
      

      <Footer/>
    </div>
    
  )
}
