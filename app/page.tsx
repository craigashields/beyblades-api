import siteMetadata from '@/data/siteMetadata'
import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/data/logo.png'
import {getAllBeyblades,getUniqueBeyblade } from '@/data/examples/apiResponse'
import React from 'react';

const logo = Logo


export default function Home() {
  return (
    <>
    <div className="flex flex-col gap-y-4 items-center justify-center">
      <Link href="/" aria-label={siteMetadata.headerTitle}>
      <Image
          alt={'logo'}
          width={150}
          height={150}
          src={logo}          
        />
        </Link>
      <h1 className="text-black dark:text-white text-4xl sm:text-5xl font-semibold text-center" >Welcome to the Beyblade API!</h1>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-10 gap-6 max-w-[960px] px-4">
      <div className="col-span-2 lg:col-span-10 relative bey-gradient-border">
        <div className="bey-gradient-left absolute left-0 inset-y-0 w-[20%] bg-gradient-to-r to-transparent from-orange-400 rounded-xl z-1 transition-opacity duration-300"></div>
        <div className="bey-gradient-right absolute right-0 inset-y-0 w-[20%] bg-gradient-to-l to-transparent from-cyan-500 rounded-xl z-1 transition-opacity duration-300"></div>
        <div className="flex flex-col rounded-xl items-center gap-y-4 pt-[58px] px-4 sm:px-28 pb-6 z-10" >
          <h2 className="font-semibold text-2xl text-black dark:text-white" >Getting Started</h2>
          <p className="mb-2 text-center" >The API provides access to information about various Beyblades, their product information, parts and other related data. Check out the endpoints below. Full documentation coming soon</p>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow overflow-x-auto">
      <table className="min-w-full leading-normal">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Endpoint</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Method</th>
            <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-5 py-5 border-b border-gray-200 text-sm">
              <code className="font-mono">/api/v1/beyblades</code>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 text-sm">GET</td>
            <td className="px-5 py-5 border-b border-gray-200 text-sm">Retrieve all Beyblades</td>
          </tr>
          <tr>
            <td className="px-5 py-5 border-b border-gray-200 text-sm">
              <code className="font-mono">/api/v1/beyblades?limit=[limit]&amp;offset=[offset]</code>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 text-sm">GET</td>
            <td className="px-5 py-5 border-b border-gray-200 text-sm">
              Retrieve all Beyblades with optional pagination
              <div className="accordion">
                <input type="checkbox" id="accordion-1" className="accordion-input"/>
                <label htmlFor="accordion-1" className="accordion-label text-blue-600">Response Body Example</label>
                <div className="accordion-content px-5 py-2">
                  <pre>
                    <code className="font-mono">
                      <React.Fragment>
                      {getAllBeyblades && JSON.stringify(getAllBeyblades, null, 2)}
                      </React.Fragment>                    
                    </code>
                  </pre>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-5 py-5 border-b border-gray-200 text-sm">
              <code className="font-mono">/api/v1/beyblades/[id]</code>
            </td>
            <td className="px-5 py-5 border-b border-gray-200 text-sm">GET</td>
            <td className="px-5 py-5 border-b border-gray-200 text-sm">
              Retrieve a specific Beyblade by ID
              <div className="accordion">
                <input type="checkbox" id="accordion-2" className="accordion-input"/>
                <label htmlFor="accordion-2" className="accordion-label text-blue-600">Response Body Example</label>
                <div className="accordion-content px-5 py-2">
                  <pre>
                    <code className="font-mono">
                    <React.Fragment>
                      {getUniqueBeyblade && JSON.stringify(getUniqueBeyblade, null, 2)}
                    </React.Fragment>                    
                    </code>
                  </pre>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>      
    </>
  )
}
