import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

export default function Navbart({ label1, label2, label3, label5,label4 }) {
  const [open, setOpen] = useState(false); // Changed to false by default

  return (
    <div className="fixed w-full top-0 h-[120px] z-50 bg-white">
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-50 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-900">
                    {label1}
                  </Link>
                  <Link to={'/order'} className="-m-2 block p-2 font-medium text-gray-900">
                    {label2}
                  </Link>
                  <Link to={'/dashboard'} className="-m-2 block p-2 font-medium text-gray-900">
                    {label3}
                  </Link>
                  <Link to={'/'} className="-m-2 block p-2 font-medium text-gray-900">
                    <img
                      className="inline-block w-10 h-10 rounded-full"
                      src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                      alt="Profile"
                    />
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop */}
      <header className="bg-white shadow-md">
        <p
          style={{
            background: 'linear-gradient(92deg, #7c4dff 39.08%, #1783ff 98.17%, #ec3cdb 133.63%)',
          }}
          className="flex h-10 font-large items-center justify-center px-4 text-sm  text-white sm:px-6 lg:px-8"
        >
          Design Your Vision, Build Your Future.
        </p>

        <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl">
          <div className="flex h-16 items-center">
            <div className="ml-4 flex lg:ml-0">
              <Link to={'/'} className="flex">
                <h1 className="text-2xl font-bold text-black px-2 py-1 rounded">{label1}</h1>
              </Link>
            </div>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <Link
                  to={'/allproducts'}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {label2}
                </Link>
                <Link
                  to={'/order'}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {label3}
                </Link>
                <Link
                  to={'/my-websites'}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {label5}
                </Link>
                <Link
                  to={'/login'}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  {label4}
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}