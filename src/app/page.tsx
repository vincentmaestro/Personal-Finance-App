import Pot from '../assets/icons/icon-pot.fed0644d.svg';

export default function Home() {
  return (
    <div className="w-full bg-light-2 p-8">
      <h1 className="text-2xl mb-5 font-semibold">Overview</h1>
      <div className="flex flex-col gap-y-5">
        <div className="grid grid-cols-3 gap-x-5">
          <div className="bg-dark pl-4 py-3 rounded-lg text-light">
            <h1>Current Balance</h1>
            <span className="text-2xl font-semibold">$4836.00</span>
          </div>
          <div className="bg-light pl-4 py-3 rounded-lg">
            <h1>Income</h1>
            <span className="text-2xl font-semibold">$3814.25</span>
          </div>
          <div className="bg-light pl-4 py-3 rounded-lg">
            <h1>Expenses</h1>
            <span className="text-2xl font-semibold">$1700.50</span>
          </div>
        </div>
        <div className="grid grid-cols-10 gap-6 auto-rows-auto">
          <div className="bg-light pt-4 pb-6 px-4 col-start-1 col-span-6 flex flex-col gap-3.5 rounded-lg">
            <div className="flex justify-between">
              <h1 className='font-semibold text-xl'>Pots</h1>
              <button className='text-light-text text-sm cursor-pointer'>See Details&rarr;</button>
            </div>
            <div className="grid grid-cols-2 gap-x-6">
              <div className="flex bg-light-2 items-center justify-center gap-x-8 rounded-xl">
                <Pot />
                <div>
                  <h1 className="mb-4 text-light-text">Total Saved</h1>
                  <span className='text-4xl font-semibold'>$920</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex gap-x-3">
                  <div className="w-2 h-14 bg-green rounded-2xl" />
                  <div className="flex flex-col justify-between">
                    <h1 className='text-light-text'>Savings</h1>
                    <span className='font-semibold'>$159</span>
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <div className="w-2 h-14 bg-navy rounded-2xl" />
                  <div className="flex flex-col justify-between">
                    <h1 className='text-light-text'>Concert Ticket</h1>
                    <span className='font-semibold'>$110</span>
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <div className="w-2 h-14 bg-light-cyan rounded-2xl" />
                  <div className="flex flex-col justify-between">
                    <h1 className='text-light-text'>Gift</h1>
                    <span className='font-semibold'>$110</span>
                  </div>
                </div>
                <div className="flex gap-x-3">
                  <div className="w-2 h-14 bg-margenta rounded-2xl" />
                  <div className="flex flex-col justify-between">
                    <h1 className='text-light-text'>Laptop</h1>
                    <span className='font-semibold'>$10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-start-7 col-span-4 bg-light p-4 rounded-lg">
            <div className="flex justify-between">
              <h1 className='font-semibold text-xl'>Budget</h1>
              <button className='text-sm cursor-pointer'>See Details&rarr;</button>
            </div>
            <div className="">

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
