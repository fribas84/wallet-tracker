import Image from 'next/image'

export default function Home() {
  return (
    <main className='m-5 flex'>
      <div className='m-auto'>
        <h1 className=" text-3xl font-bold mb-10">Wellcome to Wallet Tracker</h1>
        <p className='w-3/4 mb-5'>This application is a suit a of front end coded with Next.js and a backend with Nest.js, that allows you to track your favorite Etherem wallets balance.</p>
        <p className='w-3/4 mb-5'>Create an account to start!</p>
        <p className='w-3/4 mb-5'>also you can check the API documentation in the Docs section.</p>
      </div>
      
    </main>
  )
}
