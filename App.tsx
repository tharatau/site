export default function App() {

  return (
    <div className='h-max p-4'>
      <div className='w-full flex items-end'>
        <span className='mx-0'>CV</span>
        <span className='mx-2'>Portfolio</span>
        <span className='mx-2'>Services</span>
        <span className='mx-2'>Blog</span>
      </div>

      <div className='h-full flex flex-col'>
        <br />

        <span className='text-2xl'>Ayushman Chhabra</span>
        <br />
        <ul>
          <li className='text-md'>Programmer based out of India.</li>
        </ul>
      </div>

      <div className='absolute bottom-5'>
        (c) 2024 Ayushman Chhabra
      </div>

    </div>
  )
}
