import Community from './Community.jsx'
import { useNavigate } from 'react-router-dom'
import Carousel from './Carousel.jsx'
function Home() {

    const navigate = useNavigate()

    const clickHandler = (e) => {
        navigate(`/showproducts?search=${encodeURIComponent('')}&category=${encodeURIComponent(`${e.target.innerHTML}`)}&region=${encodeURIComponent('All')}`)
    }

  return (
    <>

     

      <Carousel />

      {/* <!-- Categories Section --> */}
      <section id="categories" class="py-8 bg-gray-100">
        <div class="container mx-auto">
            <h2 class="text-2xl font-bold text-center mb-6">Categories</h2>
            <div class="flex justify-center space-x-4 overflow-x-auto px-4">
                <button onClick = {clickHandler} class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">All</button>
                <button  onClick = {clickHandler} class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">Fruits</button>
                <button  onClick = {clickHandler} class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">Vegetables</button>
                <button  onClick = {clickHandler} class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">Dairy Products</button>
                <button onClick = {clickHandler} class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">Farm Core</button>
                <button onClick = {clickHandler} class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">Dryfruits</button>
            </div>
        </div>
      </section>

      {/* <!-- Communities Section --> */}
      <Community />


      {/* <!-- Reviews Section --> */}
      <section id="reviews" class="bg-gray-100 py-8">
          <div class="container mx-auto">
              <h2 class="text-2xl font-bold text-center mb-6">What People Say</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div class="bg-white p-4 shadow-md rounded-lg">
                      <p class="italic">"FarmEase has revolutionized the way we sell our crops. No middlemen, better profits!"</p>
                      <h3 class="mt-4 text-right font-bold">- Ramesh Kumar, Farmer</h3>
                  </div>
                  <div class="bg-white p-4 shadow-md rounded-lg">
                      <p class="italic">"As a consumer, I feel more connected to farmers and get fresh produce directly."</p>
                      <h3 class="mt-4 text-right font-bold">- Priya Sharma, Consumer</h3>
                  </div>
                  <div class="bg-white p-4 shadow-md rounded-lg">
                      <p class="italic">"This platform is bridging the gap between farmers and urban markets seamlessly."</p>
                      <h3 class="mt-4 text-right font-bold">- Ankit Verma, Entrepreneur</h3>
                  </div>
                  <div class="bg-white p-4 shadow-md rounded-lg">
                      <p class="italic">"Finally, a platform that values the hard work of farmers. Kudos to the team!"</p>
                      <h3 class="mt-4 text-right font-bold">- Sunita Devi, Farmer</h3>
                  </div>
                  <div class="bg-white p-4 shadow-md rounded-lg">
                      <p class="italic">"FarmEase provides transparency and trust in every transaction."</p>
                      <h3 class="mt-4 text-right font-bold">- Ravi Patel, Retailer</h3>
                  </div>
                  <div class="bg-white p-4 shadow-md rounded-lg">
                      <p class="italic">"The ease of use and direct connection with farmers is unparalleled."</p>
                      <h3 class="mt-4 text-right font-bold">- Neha Kapoor, Consumer</h3>
                  </div>
              </div>
          </div>
      </section>

    </>
  )
}

export default Home
