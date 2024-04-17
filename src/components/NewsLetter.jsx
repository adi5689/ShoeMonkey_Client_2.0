
const NewsLetter = () => {
  return (
    <section className="mx-auto max-w-unset px-4 py-12 xl:pb-28">
        <div className="mx-auto xl:w[80%] flexCenter flex-col gap-y-8 w-full max-w-[666px]">
            <h3 className="capitalize font-anta text-white h3 text-center">Get Exclusive offers on your email</h3>
            <h4 className="uppercase bold-16 text-white text-center">Subscribe to our newsletter and stay up to date on the latest sneaker trendz!</h4>
            <div className="flexBetween rounded-full ring-1 ring-white hover:ring-slate-5 bg-primary w-full max-w-[588px]">
                <input type="email" placeholder="Your email address..." className="w-full bg-transparent ml-7 border-none outline-none regular-16"/>
                <button className="btn_dark_rounded">Subscribe</button>
            </div>
        </div>
    </section>
  )
}

export default NewsLetter;