import React from 'react'
import about_logo from "../assets/About us page-amico.png"
import dev_logo from "../assets/image.png"

const About = () => {
  return (
    <div>
          <section class="relative bg-gray-800 text-white">
              <div class="container mx-auto px-4 py-16 text-center">
                  <h1 class="text-5xl font-bold mb-4 text-[#2ee8c3]">Our Story</h1>
                  <p class="text-lg mb-8 text-gray-400">Discover how SpendSmart is simplifying finance management and empowering users to take control of their financial health.</p>
              </div>
          </section>

          <section class="container mx-auto px-4 py-16">
              <div class="flex flex-row justify-around items-center gap-8">
                  <div class="max-w-[500px]">
                      <h2 class="text-3xl font-semibold mb-4 text-[#2ee8c3]">Who We Are</h2>
                      <p class="text-lg text-justify text-gray-400">SpendSmart is a 4-factor finance management app designed to make managing your money easier. It keeps track of four key financial factors: Earnings, Expenses, Investments, and Liabilities. With SpendSmart, you can effortlessly monitor your financial health, helping you understand your financial state with a comprehensive summary section that displays total spendings, earnings, assets, liabilities, and more.</p>
                  </div>
                  <div>
                      <img src={about_logo} alt="Who We Are" class="max-w-[500px] max-h-[500px] rounded-lg"/>
                  </div>
              </div>
          </section>

          <section class="bg-gray-800 py-16">
              <div class="container mx-auto px-4 text-center">
                  <h2 class="text-3xl font-semibold mb-4 text-[#2ee8c3]">Our Mission</h2>
                  <p class="text-lg text-gray-400 max-w-2xl mx-auto">Our mission is to simplify finance management and empower users to keep track of their financial health. We believe in providing an intuitive and comprehensive platform that helps you make informed decisions and achieve your financial goals.</p>
              </div>
          </section>

          <section class="container mx-auto px-4 py-16">
              <div class="flex flex-row justify-around items-center gap-8">
                  <div>
                      <img src={dev_logo} alt="Nishit Patel" class="w-full rounded-lg max-w-[450px] max-h-[500px] border-4 border-[#2ee8c3]"/>
                  </div>
                  <div className='max-w-[500px]'>
                      <h2 class="text-3xl font-semibold mb-4 text-[#2ee8c3]">Meet the Developer</h2>
                      <p class="text-lg text-justify text-gray-400">Hello! I'm Nishit Patel, a graduate student with a Master's degree in Big Data Analytics. I'm a passionate frontend developer and programmer, and I created SpendSmart as part of my journey to apply for jobs in the tech industry. My goal was to build an application that not only demonstrates my technical skills but also provides a meaningful tool for users to manage their finances effectively.</p>
                  </div>
              </div>
          </section>

          <section class="bg-gray-800 py-16">
              <div class="container mx-auto px-4">
                  <h2 class="text-3xl font-semibold mb-8 text-[#2ee8c3] text-center">Our Values</h2>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div class="text-center">
                          <h3 class="text-2xl font-bold text-[#2ee8c3] mb-4">Simplicity</h3>
                          <p class="text-lg text-gray-400">We strive to create a user-friendly experience that makes finance management straightforward and easy.</p>
                      </div>
                      <div class="text-center">
                          <h3 class="text-2xl font-bold text-[#2ee8c3] mb-4">Transparency</h3>
                          <p class="text-lg text-gray-400">We believe in clear, honest communication and providing users with all the information they need.</p>
                      </div>
                      <div class="text-center">
                          <h3 class="text-2xl font-bold text-[#2ee8c3] mb-4">Empowerment</h3>
                          <p class="text-lg text-gray-400">Our goal is to empower users with tools and insights to make informed financial decisions.</p>
                      </div>
                  </div>
              </div>
          </section>

          <section class="container mx-auto px-4 py-16">
            <div class="text-center">
                <h2 class="text-3xl font-semibold mb-4 text-[#2ee8c3]">Get in Touch</h2>
                <p class="text-lg text-gray-400 mb-4">Have questions or need support? Feel free to reach out. We're here to help you make the most of SpendSmart!</p>
                <div class="text-lg text-gray-400">
            <p>Email: <a href="mailto:nishpatel1142@gmail.com" class="text-[#2ee8c3] hover:text-[#24d6a6] transition-all duration-300">nishpatel1142@gmail.com</a></p>
            <p>Mobile: <a href="tel:+17058081837" class="text-[#2ee8c3] hover:text-[#24d6a6] transition-all duration-300">+1 (705)-808-1837</a></p>
        </div>
            </div>
          </section>
    </div>
  )
}

export default About
