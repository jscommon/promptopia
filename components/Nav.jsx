"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getProviders, signIn, signOut, useSession } from "next-auth/react";
const Nav = () => {
  const { data: session } =  useSession();

  const userData=session?.user;

  // console.log(userData);
  //  const [sessionData, setSessionData] = useState(session, session);
  const [providers, setProviders] = useState(null);

  const [toggleDropDown, settoggleDropDown] = useState(false);

  // console.log(process.env.MONGODB_URI)
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      // console.log(response);
      setProviders(response);
    };

    

    setUpProviders();

    // setSessionData(session);
  }, []);

  // console.log(session);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="assets/images/logo.svg"
          alt="Promptopia Logo"
          width={30}
          height={30}
        />
        <p className="logo_text">Promptopia</p>
      </Link>
      {/* Desktop Navigation*/}
      <div className="sm:flex hidden">

        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                alt="Profile"
                className="rounded-full"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              
              Object.values(providers).map((providers) => (
                <button
                  type="button"
                  key={providers.name}
                  onClick={() => signIn(providers.id)}
                  className="outline_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation*/}

      <div className="sm:hidden flex relative">
      
         {userData ? (
          <div className="flex">
            <Image
              src={userData?.image}
              width={37}
              height={37}
              alt="Profile"
              className="rounded-full"
              onClick={() => {
                settoggleDropDown((prev) => !prev);
              }}
            />
            {toggleDropDown && (
              
              <div className="dropdown">
                <Link
                  href="/profile"
                  onClick={() => settoggleDropDown(false)}
                  className="dropdown_link"
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  onClick={() => settoggleDropDown(false)}
                  className="dropdown_link"
                >
                  Create Prompt
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    settoggleDropDown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((providers) => (
                <button
                  type="button"
                  key={providers.name}
                  onClick={() => signIn(providers.id)}
                  className="outline_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
