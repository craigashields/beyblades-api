type SiteMetadata = {
  title: string;
  author: string;
  headerTitle: string;
  description: string;
  language: string;
  theme: 'system' | 'dark' | 'light';
  siteUrl: string;
  siteRepo: string;
  siteLogo: string;
  socialBanner: string;
  email: string;
  github: string;
  locale: string;
  contentDir: string;
}
const siteMetadata: SiteMetadata 
   = {
     title: 'Beyblades API',
     author: 'Craig Shields',
     headerTitle: 'Beyblades API',
     description: 'A Beyblade API, providing access to information about various Beyblades, their product information, parts and other related data',
     language: 'en-gb',
     theme: 'system',
     siteUrl: 'https://beyblades-api.vercel.app/',
     siteRepo: 'https://github.com/craigashields/beyblades-api',
     siteLogo: '/static/images/logo.png',
     socialBanner: '/static/images/banner.jpeg',
     email: 'craig.a.shields84@gmail.com',
     github: 'https://github.com/craigashields',
     locale: 'en-GB',
     contentDir: '/app/data/content',
   };
  
  export default siteMetadata;