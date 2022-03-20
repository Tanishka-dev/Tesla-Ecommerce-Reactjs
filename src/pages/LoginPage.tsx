import React, { useState, useRef, BaseSyntheticEvent } from "react";
// Import the functions you need from the SDKs you need
import {
	getAuth,
	isSignInWithEmailLink,
	sendSignInLinkToEmail,
	signInWithEmailLink,
} from "firebase/auth";
import { Link } from "react-router-dom";

export default function LoginPage() {
	const [email, setEmail] = useState("");

	const login = async (e: BaseSyntheticEvent) => {
		e.preventDefault();
		const auth = getAuth();
		const actionCodeSettings = {
			url:
				process.env.NODE_ENV === "development"
					? `${window.location.href}`
					: "https://tesla-ecommerce.netlify.app",

			handleCodeInApp: true,
		};
		console.log(window.location.href);
		await sendSignInLinkToEmail(auth, email, actionCodeSettings);
		// Obtain emailLink from the user.
		// if (isSignInWithEmailLink(auth, emailLink)) {
		// 	await signInWithEmailLink(auth, "user@example.com", emailLink);
		// }
	};

	return (
		<>
			<div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<Link to="/">
						<img src="/images/logo.svg" className="mx-auto w-32"></img>
					</Link>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Sign in to your account
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Or{" "}
						<a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
							create new account
						</a>
					</p>
				</div>

				<form className="mt-8 sm:mx-auto sm:w-full sm:max-w-md" onSubmit={login}>
					<div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
						<div className="space-y-6">
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium text-gray-700"
								>
									Email address
								</label>
								<div className="mt-1">
									<input
										id="email"
										name="email"
										type="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										autoComplete="email"
										required
										className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							{/* <div>
                        <label
                           htmlFor="password"
                           className="block text-sm font-medium text-gray-700"
                        >
                           Password
                        </label>
                        <div className="mt-1">
                           <input
                              id="password"
                              name="password"
                              type="password"
                              autoComplete="current-password"
                              required
                              className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                           />
                        </div>
                     </div> */}

							<div className="flex items-center justify-between">
								<div className="flex items-center">
									<input
										id="remember-me"
										name="remember-me"
										type="checkbox"
										className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
									/>
									<label
										htmlFor="remember-me"
										className="ml-2 block text-sm text-gray-900"
									>
										Remember me
									</label>
								</div>

								<div className="text-sm">
									<a
										href="#"
										className="font-medium text-indigo-600 hover:text-indigo-500"
									>
										Forgot your password?
									</a>
								</div>
							</div>
							<div>
								<button
									type="submit"
									className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Sign in
								</button>
							</div>
						</div>

						<div className="mt-6">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-gray-300" />
								</div>
								<div className="relative flex justify-center text-sm">
									<span className="px-2 bg-white text-gray-500">
										Or continue with
									</span>
								</div>
							</div>

							<div className="mt-6 grid grid-cols-3 gap-3">
								<div>
									<a
										href="#"
										className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
									>
										<span className="sr-only">Sign in with Google</span>
										<svg
											className="w-5 h-5"
											aria-hidden="true"
											fill="currentColor"
											viewBox="0 0 20 20"
										>
											<path
												fillRule="evenodd"
												d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
												clipRule="evenodd"
											/>
										</svg>
									</a>
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		</>
	);
}
