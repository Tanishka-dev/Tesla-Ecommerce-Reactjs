/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  
*/
import { Disclosure } from "@headlessui/react";

import { useCartState } from "../hooks/useReducerState";
import React from "react";
import Header from "../components/Header";
import { useAppSelector } from "../app/store";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
   const products = useCartState();
   const navigation = useNavigate();
   const total = useAppSelector((state) => state.car.total);
   return (
      <>
         <main className="lg:min-h-full lg:overflow-hidden lg:flex lg:flex-row-reverse">
            <Header bgColor={"bg-white border-b"} />
            <h1 className="sr-only">Checkout</h1>

            {/* Mobile order summary */}
            <section
               aria-labelledby="order-heading"
               className="bg-gray-50 px-4 py-6 sm:px-6 lg:hidden mt-10"
            >
               <Disclosure as="div" className="max-w-lg mx-auto ">
                  {({ open }) => (
                     <>
                        <div className="flex items-center justify-between">
                           <h2
                              id="order-heading"
                              className="text-lg font-medium text-gray-900"
                           >
                              Your Order
                           </h2>
                           <Disclosure.Button className="font-medium text-indigo-600 hover:text-indigo-500">
                              {open ? (
                                 <span>Hide full summary</span>
                              ) : (
                                 <span>Show full summary</span>
                              )}
                           </Disclosure.Button>
                        </div>

                        <Disclosure.Panel>
                           <ul
                              role="list"
                              className="divide-y divide-gray-200 border-b border-gray-200 "
                           >
                              {products.map((product) => (
                                 <li
                                    key={product.id}
                                    className="flex py-6 space-x-6 "
                                 >
                                    <img
                                       src={`/images/${product.backgroundImg}`}
                                       alt={product.title}
                                       className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md"
                                    />
                                    <div className="flex flex-col justify-between space-y-4">
                                       <div className="text-sm font-medium space-y-1">
                                          <h3 className="text-gray-900">
                                             {product.title}
                                          </h3>
                                          <p className="text-gray-900">
                                             Price- $
                                             {new Intl.NumberFormat(
                                                "en-GB"
                                             ).format(product.price)}
                                          </p>
                                          <p className="text-gray-500">
                                             {product.description
                                                .substring(0, 100)
                                                .concat("...")}
                                          </p>
                                       </div>
                                    </div>
                                 </li>
                              ))}
                           </ul>
                        </Disclosure.Panel>

                        <p className="flex items-center justify-between text-sm font-medium text-gray-900 border-t border-gray-200 pt-6 mt-6">
                           <span className="text-base">Total</span>
                           <span className="text-base">
                              ${new Intl.NumberFormat("en-GB").format(total)}
                           </span>
                        </p>
                     </>
                  )}
               </Disclosure>
            </section>

            {/* Order summary */}
            <section
               aria-labelledby="summary-heading"
               className="hidden bg-gray-50 w-full max-w-md flex-col lg:flex mt-16"
            >
               <h2 id="summary-heading" className="sr-only">
                  Order summary
               </h2>

               <ul
                  role="list"
                  className="flex-auto overflow-y-auto divide-y divide-gray-200 px-6"
               >
                  {products.map((product) => (
                     <li key={product.id} className="flex py-6 space-x-6">
                        <img
                           src={`/images/${product.backgroundImg}`}
                           alt={product.title}
                           className="flex-none w-40 h-40 object-center object-cover bg-gray-200 rounded-md"
                        />
                        <div className="flex flex-col justify-between space-y-4">
                           <div className="text-sm font-medium space-y-1">
                              <h3 className="text-gray-900">{product.title}</h3>
                              <p className="text-gray-900">
                                 {" "}
                                 Price- $
                                 {new Intl.NumberFormat("en-GB").format(
                                    product.price
                                 )}
                              </p>
                              <p className="text-gray-500">
                                 {product.description
                                    .substring(0, 50)
                                    .concat("...")}
                              </p>
                           </div>
                        </div>
                     </li>
                  ))}
               </ul>

               <div className="sticky bottom-0 flex-none bg-gray-50 border-t border-gray-200 p-6">
                  <dl className="text-sm font-medium text-gray-500 mt-1">
                     <div className="flex items-center justify-between border-t border-gray-200 text-gray-900 pt-2">
                        <dt>Total</dt>
                        <dd className="text-base">
                           {" "}
                           ${new Intl.NumberFormat("en-GB").format(total)}
                        </dd>
                     </div>
                  </dl>
               </div>
            </section>

            {/* Checkout form */}
            <section
               aria-labelledby="payment-heading"
               className="flex-auto overflow-y-auto px-4 pt-12 pb-16 sm:px-6 sm:pt-16 lg:px-8 lg:pt-0 lg:pb-24"
            >
               <h2 id="payment-heading" className="sr-only">
                  Payment and shipping details
               </h2>

               <div className="max-w-lg mx-auto lg:pt-16">
                  <form className="mt-6">
                     <div className="grid grid-cols-12 gap-y-6 gap-x-4">
                        <div className="col-span-full">
                           <label
                              htmlFor="email-address"
                              className="block text-sm font-medium text-gray-700"
                           >
                              Email address
                           </label>
                           <div className="mt-1">
                              <input
                                 type="email"
                                 id="email-address"
                                 name="email-address"
                                 autoComplete="email"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="col-span-full">
                           <label
                              htmlFor="name-on-card"
                              className="block text-sm font-medium text-gray-700"
                           >
                              Name on card
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 id="name-on-card"
                                 name="name-on-card"
                                 autoComplete="cc-name"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="col-span-full">
                           <label
                              htmlFor="card-number"
                              className="block text-sm font-medium text-gray-700"
                           >
                              Card number
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 id="card-number"
                                 name="card-number"
                                 autoComplete="cc-number"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="col-span-8 sm:col-span-9">
                           <label
                              htmlFor="expiration-date"
                              className="block text-sm font-medium text-gray-700"
                           >
                              Expiration date (MM/YY)
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 name="expiration-date"
                                 id="expiration-date"
                                 autoComplete="cc-exp"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="col-span-4 sm:col-span-3">
                           <label
                              htmlFor="cvc"
                              className="block text-sm font-medium text-gray-700"
                           >
                              CVC
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 name="cvc"
                                 id="cvc"
                                 autoComplete="csc"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="col-span-full">
                           <label
                              htmlFor="address"
                              className="block text-sm font-medium text-gray-700"
                           >
                              Address
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 id="address"
                                 name="address"
                                 autoComplete="street-address"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="col-span-full sm:col-span-4">
                           <label
                              htmlFor="city"
                              className="block text-sm font-medium text-gray-700"
                           >
                              City
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 id="city"
                                 name="city"
                                 autoComplete="address-level2"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="col-span-full sm:col-span-4">
                           <label
                              htmlFor="regino"
                              className="block text-sm font-medium text-gray-700"
                           >
                              State / Province
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 id="regino"
                                 name="regino"
                                 autoComplete="address-level1"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>

                        <div className="col-span-full sm:col-span-4">
                           <label
                              htmlFor="postal-code"
                              className="block text-sm font-medium text-gray-700"
                           >
                              Postal code
                           </label>
                           <div className="mt-1">
                              <input
                                 type="text"
                                 id="postal-code"
                                 name="postal-code"
                                 autoComplete="postal-code"
                                 className="appearance-none block w-full px-3 py-2  rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              />
                           </div>
                        </div>
                     </div>

                     <div className="mt-6 flex space-x-2">
                        <div className="flex items-center h-5">
                           <input
                              id="same-as-shipping"
                              name="same-as-shipping"
                              type="checkbox"
                              defaultChecked
                              className="h-4 w-4 border-gray-100 rounded text-indigo-600 focus:ring-indigo-500"
                           />
                        </div>
                        <label
                           htmlFor="same-as-shipping"
                           className="text-sm font-medium text-gray-900"
                        >
                           Billing address is the same as shipping address
                        </label>
                     </div>

                     <button
                        onClick={() => navigation("/orderpage")}
                        type="submit"
                        className="w-full mt-6 bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                     >
                        Pay ${new Intl.NumberFormat("en-GB").format(total)}
                     </button>
                  </form>
               </div>
            </section>
         </main>
      </>
   );
}
