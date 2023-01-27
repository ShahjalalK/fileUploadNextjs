import Image from 'next/image'
import React from 'react'
import basUrl from '../helpers/baseUrl'

export default function Home() {
  const loader = ({src}) => {
    return `${basUrl}${src}`
  }
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-center text-5xl my-5">Hello Shahjalal</h1>
      <div className="grid grid-cols-4 gap-3">
        <Image loader={loader} src="/1.jpg" width={300} height={300} className="border rounded"></Image>
        <Image loader={loader} src="/1.jpg" width={300} height={300} className="border rounded"></Image>
        <Image loader={loader} src="/1.jpg" width={300} height={300} className="border rounded"></Image>
        <Image loader={loader} src="/1.jpg" width={300} height={300} className="border rounded"></Image>
        <Image loader={loader} src="/1.jpg" width={300} height={300} className="border rounded"></Image>
        {/* <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere quasi eligendi sapiente, aspernatur reprehenderit libero architecto non ea. Dolorum, ipsa.</div>
        <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere quasi eligendi sapiente, aspernatur reprehenderit libero architecto non ea. Dolorum, ipsa.</div>
        <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere quasi eligendi sapiente, aspernatur reprehenderit libero architecto non ea. Dolorum, ipsa.</div>
        <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere quasi eligendi sapiente, aspernatur reprehenderit libero architecto non ea. Dolorum, ipsa.</div>
        <div>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere quasi eligendi sapiente, aspernatur reprehenderit libero architecto non ea. Dolorum, ipsa.</div> */}
      </div>
    </div>
  )
}
