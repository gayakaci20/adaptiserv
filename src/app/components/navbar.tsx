'use client'

import { useState } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline'
import {
  BoltIcon,
  BuildingStorefrontIcon,
  CommandLineIcon,
  PhoneIcon,
  UsersIcon,
} from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'

const navigation = [
  { name: 'Acceuil', href: '/' },
  { name: 'Contact', href: '/contact' },
  { name: 'Boutique', link: 'https://achathub.com' },
]

const solutions = [
  {
    name: 'Courtage Energrie',
    description: 'Comparez et sélectionnez les meilleures offres.',
    href: '/energie',
    icon: BoltIcon,
  },
  {
    name: 'Service Digital',
    description: 'Creation Digitale Sites et apps selon vos Projets.',
    href: '/site',
    icon: CommandLineIcon,
  },
  {
    name: 'Sérigraphie et Impression',
    description: 'Conception, impression, pose.',
    href: '/serigraphie',
    icon: BuildingStorefrontIcon,
  },
  {
    name: 'Agents Commerciaux',
    description: 'Présence commerciaux foires, distribution, publicité et revente de produits.',
    href: '/commerciale',
    icon: UsersIcon,
  },
]
 

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showSolutions, setShowSolutions] = useState(false)

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-white shadow-sm">
      <nav className="flex justify-between items-center px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <Link href="/" className="flex gap-3 items-center group">
          <Image
            src="/logo.png"
            alt="ADAPTISERV"
            className="w-auto h-10 transition-transform duration-500 group-hover:rotate-180"
            width={150}
            height={150}
          />
          <span className="text-xl font-bold text-gray-900">ADAPTISERV</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex lg:gap-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-purple-600"
            >
              {item.name}
            </Link>
          ))}

          <Popover className="relative">
            <Popover.Button className="flex gap-x-1 items-center text-sm font-semibold text-gray-900 hover:text-purple-600">
              Solutions
              <ChevronDownIcon className="w-5 h-5" />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-screen max-w-md bg-white rounded-3xl ring-1 ring-gray-200 shadow-lg -translate-x-1/2">
                <div className="p-4">
                  {solutions.map((item) => (
                    <Link key={item.name} href={item.href} className="flex gap-4 p-3 rounded-lg hover:bg-purple-50">
                      <div className="flex justify-center items-center w-10 h-10 bg-purple-100 rounded-lg">
                        <item.icon className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
        </div>

        {/* Connexion button */}
        <div className="hidden lg:flex">
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-semibold text-white bg-purple-600 rounded-md transition hover:bg-purple-700"
          >
            Connexion →
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-gray-700 rounded-md hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <Dialog.Panel className="overflow-y-auto fixed inset-y-0 right-0 z-50 px-6 py-6 w-full max-w-sm bg-white sm:ring-1 sm:ring-gray-900/10">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex gap-2 items-center">
              <Image src="/logo.png" alt="logo" className="w-auto h-8" width={200} height={200} />
              <span className="text-lg font-bold text-gray-900">ADAPTISERV</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-gray-700 rounded-md hover:bg-purple-100"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-900 rounded-md hover:bg-purple-50"
              >
                {item.name}
              </Link>
            ))}

            <button
              onClick={() => setShowSolutions(!showSolutions)}
              className="flex justify-between items-center px-3 py-2 w-full text-base font-medium text-gray-900 rounded-md hover:bg-purple-50"
            >
              <span>Solutions</span>
              <ChevronDownIcon className={`h-5 w-5 transition-transform ${showSolutions ? 'rotate-180' : ''}`} />
            </button>

            {showSolutions && (
              <div className="pl-4 space-y-2">
                {solutions.map((item) => (
                  <Link key={item.name} href={item.href} className="block text-sm text-gray-700 hover:text-purple-600">
                    {item.name}
                  </Link>
                ))}
              </div>
            )}

            <Link
              href="/login"
              className="block px-4 py-2 w-full font-semibold text-center text-white bg-purple-600 rounded-md hover:bg-purple-700"
            >
              Connexion →
            </Link>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
