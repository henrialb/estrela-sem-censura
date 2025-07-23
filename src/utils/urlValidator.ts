export const isFacebookUrl = (url: string) => {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    console.log(hostname);

    // Check for various Facebook domains
    const facebookDomains = [
      'facebook.com',
      'www.facebook.com',
      'm.facebook.com',
      'mobile.facebook.com',
      'fb.com',
      'www.fb.com',
      'fb.me',
      'www.fb.me',
    ];

    return facebookDomains.includes(hostname);
  } catch (_error) {
    // Invalid URL format
    return false;
  }
};
