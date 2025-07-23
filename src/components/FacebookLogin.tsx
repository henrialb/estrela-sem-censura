'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

export default function FacebookLogin() {
  const { login } = useAuth();
  const [FBready, setFBready] = useState(false);

  useEffect(() => {
    // Load Facebook SDK
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
        cookie: true,
        xfbml: true,
        version: 'v18.0',
      });
      setFBready(true);
    };

    // Load the SDK asynchronously
    ((d, s, id) => {
      var js: any,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode?.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  const handleFacebookLogin = () => {
    if (!FBready) {
      alert('Facebook SDK is still loading. Please wait a moment.');
      return;
    }

    window.FB.login(
      (response: any) => {
        if (response.authResponse) {
          login(response.authResponse.accessToken).catch((error) => {
            console.error('Login failed:', error);
            alert('Login failed. Please try again.');
          });
        }
      },
      { scope: 'public_profile' }
    );
  };

  return (
    <button
      type="button"
      onClick={handleFacebookLogin}
      disabled={!FBready}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
    >
      Entrar com Facebook
    </button>
  );
}
