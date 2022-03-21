import {
   CheckIcon,
   ClockIcon,
   QuestionMarkCircleIcon,
   XIcon,
} from "@heroicons/react/solid";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
   removeFromCart,
   setQuantity,
   setTotal,
} from "../features/Car/carSlice";
import { useCartState } from "../hooks/useReducerState";
import { ImSad } from "react-icons/im";
import Header from "../components/Header";

export default function CartPage() {
   const dispatch = useDispatch();
   const _products = useCartState();
   const products = [..._products];
   const navigation = useNavigate();

   let shipEsti = 500;
   let tax = 834.89;
   const subtotal = products.reduce((acc, curr) => {
      acc = curr.price * curr.quantity + acc;
      return acc;
   }, 0);
   const total = shipEsti + tax + subtotal;

   return (
      <div className="bg-white">
         <Header bgColor={"bg-white border-b"} />
         <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
               Cart
            </h1>
            ,
            <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
               <section
                  aria-labelledby="cart-heading"
                  className="lg:col-span-7"
               >
                  <h2 id="cart-heading" className="sr-only">
                     Items in your shopping cart
                  </h2>

                  <ul
                     role="list"
                     className="border-t border-b border-gray-200 divide-y divide-gray-200"
                  >
                     {products.length !== 0 ? (
                        products
                           .sort((a, b) => a.id - b.id)
                           .map((product, productIdx) => (
                              <li
                                 key={product.id}
                                 className="flex py-6 sm:py-10"
                              >
                                 <div className="flex-shrink-0">
                                    <img
                                       src={`/images/${product.backgroundImg}`}
                                       alt={product.title}
                                       className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                                    />
                                 </div>

                                 <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                    <div className="relative pr-9 flex sm:flex-row flex-col sm:gap-x-6 sm:pr-0">
                                       <div>
                                          <div className="flex justify-between">
                                             <h3 className="text-sm">
                                                <Link
                                                   to={`/cars/${product.id}`}
                                                   className="font-medium text-gray-700 hover:text-gray-800"
                                                >
                                                   {product.title}
                                                </Link>
                                             </h3>
                                          </div>
                                          <div className="mt-1 flex text-sm">
                                             <p className="text-gray-500">
                                                {product.description
                                                   .substring(0, 100)
                                                   .concat("...")}
                                             </p>
                                          </div>
                                          <p className="mt-1 text-sm font-medium text-gray-900">
                                             $
                                             {new Intl.NumberFormat(
                                                "en-GB"
                                             ).format(product.price)}
                                          </p>
                                       </div>

                                       <div className="mt-4 sm:mt-0 ml-auto mr-12">
                                          <label
                                             htmlFor={`quantity-${productIdx}`}
                                             className="sr-only"
                                          >
                                             Quantity, {product.title}
                                          </label>
                                          <select
                                             onChange={(e) =>
                                                dispatch(
                                                   setQuantity({
                                                      id: product.id,
                                                      quantity: parseInt(
                                                         e.target.value
                                                      ),
                                                   })
                                                )
                                             }
                                             id={`quantity-${productIdx}`}
                                             name={`quantity-${productIdx}`}
                                             className="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                          >
                                             <option value={1}>1</option>
                                             <option value={2}>2</option>
                                             <option value={3}>3</option>
                                             <option value={4}>4</option>
                                             <option value={5}>5</option>
                                             <option value={6}>6</option>
                                             <option value={7}>7</option>
                                             <option value={8}>8</option>
                                          </select>

                                          <div className="absolute top-0 right-0">
                                             <button
                                                onClick={() =>
                                                   dispatch(
                                                      removeFromCart(product.id)
                                                   )
                                                }
                                                type="button"
                                                className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                                             >
                                                <span className="sr-only">
                                                   Remove
                                                </span>
                                                <XIcon
                                                   className="h-5 w-5"
                                                   aria-hidden="true"
                                                />
                                             </button>
                                          </div>
                                       </div>
                                    </div>

                                    <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                                       {product.inStock ? (
                                          <CheckIcon
                                             className="flex-shrink-0 h-5 w-5 text-green-500"
                                             aria-hidden="true"
                                          />
                                       ) : (
                                          <ClockIcon
                                             className="flex-shrink-0 h-5 w-5 text-gray-300"
                                             aria-hidden="true"
                                          />
                                       )}
                                    </p>
                                    {product.inStock ? "" : "Out Of Stock!"}
                                 </div>
                              </li>
                           ))
                     ) : (
                        <div className="flex items-center justify-center gap-2  text-lg ">
                           <p className="mt-30">Cart is Empty!</p>
                           <ImSad></ImSad>
                           <button
                              onClick={() => {
                                 navigation(`/`);
                              }}
                              type="submit"
                              className=" ml-20 w-200 bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                           >
                              Shop Now!
                           </button>
                        </div>
                     )}
                  </ul>
               </section>

               {/* Order summary */}
               <section
                  aria-labelledby="summary-heading"
                  className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
               >
                  <h2
                     id="summary-heading"
                     className="text-lg font-medium text-gray-900"
                  >
                     Order summary
                     {}
                  </h2>

                  <dl className="mt-6 space-y-4">
                     <div className="flex items-center justify-between">
                        <dt className="text-sm text-gray-600">Subtotal</dt>
                        <dd className="text-sm font-medium text-gray-900">
                           ${new Intl.NumberFormat("en-GB").format(subtotal)}
                        </dd>
                     </div>
                     <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                        Shipping Estimate
                        <dd className="text-sm font-medium text-gray-900">
                           $
                           {subtotal !== 0
                              ? new Intl.NumberFormat("en-GB").format(shipEsti)
                              : 0}
                        </dd>
                     </div>
                     <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                        <dt className="flex text-sm text-gray-600">
                           <span>Tax estimate</span>
                        </dt>
                        <dd className="text-sm font-medium text-gray-900">
                           $
                           {subtotal !== 0
                              ? new Intl.NumberFormat("en-GB").format(tax)
                              : 0}
                        </dd>
                     </div>
                     <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                        <dt className="text-base font-medium text-gray-900">
                           Order total
                        </dt>
                        <dd className="text-base font-medium text-gray-900">
                           $
                           {subtotal !== 0
                              ? new Intl.NumberFormat("en-GB").format(total)
                              : 0}
                        </dd>
                     </div>
                  </dl>

                  <div className="mt-6">
                     <Link to={"/checkout"}>
                        <button
                           onClick={() => dispatch(setTotal(total))}
                           type="submit"
                           className="w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
                        >
                           Checkout
                        </button>
                     </Link>
                  </div>
               </section>
            </form>
         </div>
      </div>
   );
}
