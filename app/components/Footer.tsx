
import Link from 'next/link';
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
    return (

      <footer className="relative border-t bg-white dark:bg-black border-gray-200 dark:border-gray-900 w-full h-[70px] flex items-center">
        <div className="absolute inset-x-0 flex items-center justify-center -top-3">
        </div>
        <div className="mx-auto sm:px-6 lg:px-8 px-4 w-full">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <div className="flex flex-col-reverse items-center gap-3 sm:flex-row">
              <span className="text-sm text-gray-700 dark:text-gray-300">© 2023 Craig Shields - MIT License</span>
            </div>
            <ul className="flex items-center justify-end gap-3">
              <li>
                  <SocialIcon kind="github" href={siteMetadata.siteRepo} size={6}/>
              </li>
            </ul>
          </div>
        </div>
      </footer>
  );
  }
