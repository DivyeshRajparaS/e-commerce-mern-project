import React from 'react'

const NewsletterBox = () => {

  // const onSubmitHandler = (event) => {
  //   event.preventDefault();
  // }

  // return (
  //   <div className='text-center'>
  //     <p className='text-2xl font-medium text-gray-800 dark:text-gray-300'>Subscribe now & get 20% off</p>
  //     <p className='text-gray-400 mt-3 dark:text-gray-400'>
  //       Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  //     </p>
  //     <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border dark:border-slate-400 pl-3'>
  //       <input className='w-full sm:flex-1 outline-none dark:bg-transparent dark:text-gray-300' type="email" placeholder='Enter your email' required />
  //       <button type='submit' className='bg-black text-white text-xs px-10 py-4 dark:bg-slate-700'>SUBSCRIBE</button>
  //     </form>
  //   </div>
  // )

  return (
    <>
      <div id="pricing" className="flex justify-center text-lg w-full mt-8 mb-32 scroll-mt-[150px]">
        <div className="mx-2 sm:mx-7 5xl:mx-0 p-2 xs:p-0 sm:p-0 flex flex-col gap-7 sm:gap-3 max-w-4xl self-center w-full">
          <h1 className="text-4xl pb-4 font-bold text-center text-slate-900 tracking-tight">
            Get started today
          </h1>
          <div dir="ltr" data-orientation="horizontal">
            <div
              role="tablist"
              aria-orientation="horizontal"
              className="items-center rounded-lg bg-muted text-muted-foreground flex justify-center gap-8 relative -mb-[2px]"
              tabIndex="0"
              style={{ outline: "none" }} >
              <button
                type="button"
                role="tab"
                aria-selected="false"
                className="flex items-center justify-center whitespace-nowrap md:px-6 text-base font-medium ring-offset-background transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-zinc-500 px-10 py-2 m-0 mb-2.5 rounded-lg border-none bg-gray-500/5" >
                <span className="inline-flex gap-2 pb-[2px] justify-center dark:text-gray-400 font-semibold">
                  Monthly
                </span>
              </button>
            </div>
          </div>
          <div className="sm:mt-2 flex flex-col-reverse md:flex-col md:grid md:grid-cols-3 gap-4 md:gap-8 lg:gap-12">
            {/* Free Plan */}
            <div className="rounded-xl border-2 transition-colors border-slate-200/50 hover:border-slate-200 p-6 sm:p-8 w-full flex flex-col text-center items-center justify-center">
              <h3 className="pt-5 text-3xl font-semibold text-slate-800 dark:text-gray-300 mb-1.5">Free</h3>
              <div className="text-slate-600/60 text-[1.05rem] font-semibold">
                <h4 className="text-xl text-slate-500 font-semibold">1,200 minutes</h4>
              </div>
              <div className="flex gap-2 items-center mt-3">
                <span className="font-bold text-5xl text-slate-900 dark:text-white">$0</span>
                <span className="text-slate-500/80 text-base font-medium dark:text-gray-400">per month</span>
              </div>
              <button className="mt-7 mb-5 bg-gray-100 text-black text-[1.1rem] px-6 py-3 rounded-xl font-semibold transition hover:bg-gray-200">
                Sign up
              </button>
              <p className="inline-block text-left text-slate-600/60 text-[1.05rem] font-semibold dark:text-white">
                Best for students
              </p>
            </div>

            {/* Pro Plan */}
            <div className="rounded-xl border-2 transition-colors border-slate-200/50 hover:border-slate-200 p-6 sm:p-8 w-full flex flex-col text-center items-center justify-center">
              <h3 className="pt-5 text-3xl font-bold text-slate-800 mb-1.5 dark:text-white">Pro</h3>
              <div className="text-slate-600/60 text-[1.05rem] font-semibold">
                <h4 className="text-xl text-primary font-semibold text-slate-500">6,000 minutes</h4>
              </div>
              <div className="flex gap-2 items-center mt-3">
                <span className="font-bold text-5xl text-slate-900 dark:text-white">$19</span>
                <span className="text-slate-500/80 text-base font-medium dark:text-gray-300">per month</span>
              </div>
              <button className="mt-7 mb-5 bg-black text-white text-[1.1rem] px-6 py-3 rounded-xl transition font-semibold hover:bg-gray-700">
                Subscribe
              </button>
              <p className="inline-block text-left text-slate-600/60 text-[1.05rem] font-semibold dark:text-white">
                Best for just work
              </p>
            </div>

            {/* Unlimited Plan */}
            <div className="rounded-xl border-2 transition-colors border-slate-200/50 hover:border-slate-200 p-6 sm:p-8 w-full flex flex-col text-center items-center justify-center">
              <h3 className="pt-5 text-3xl font-bold text-slate-800 mb-1.5 dark:text-white">Unlimited</h3>
              <div className="text-slate-600/60 text-[1.05rem] font-semibold">
                <h4 className="text-xl text-primary font-semibold text-slate-500">Unlimited minutes</h4>
              </div>
              <div className="flex gap-2 items-center mt-3">
                <span className="font-bold text-5xl text-slate-900 dark:text-white">$39</span>
                <span className="text-slate-500/80 text-base font-medium">per month</span>
              </div>
              <button className="mt-7 mb-5 bg-black text-white text-[1.1rem] px-6 py-3 rounded-xl transition font-semibold hover:bg-gray-700">
                Subscribe
              </button>
              <p className="inline-block text-left text-slate-600/60 text-[1.05rem] font-semibold dark:text-white">
                Best for work &amp; personal
              </p>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default NewsletterBox;