import footer from '../../assets/footer.png'
import fb from '../../assets/fb.png'
import insta from '../../assets/insta.jpeg'
import x from '../../assets/x.png'

const Footer = () => {
    return (
        <>
            <footer class="bg-green-800 text-white py-8">
                <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
                    <div>
                    <h2 class="text-xl font-bold mb-4">FarmEase</h2>
                    <p class="text-sm">
                        Empowering farmers and connecting them directly to consumers. Fair prices, zero middlemen.
                    </p>
                    </div>

                    <div>
                    <h3 class="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul class="space-y-2">
                        <li><a href="#" class="hover:text-gray-300">About Us</a></li>
                        <li><a href="#" class="hover:text-gray-300">Categories</a></li>
                        <li><a href="#" class="hover:text-gray-300">Communities</a></li>
                        <li><a href="#" class="hover:text-gray-300">Contact Us</a></li>
                    </ul>
                    </div>

                    <div>
                    <h3 class="text-lg font-semibold mb-4">Contact Us</h3>
                    <p class="text-sm mb-2">📍 Address: FarmEase HQ, Rural India</p>
                    <p class="text-sm mb-2">📞 Phone: +91-6355121720</p>
                    <p class="text-sm mb-4">📧 Email: support@farmease.com</p>

                    <div class="flex space-x-4">
                        <a href="#" class="hover:text-gray-300 flex gap-2 justify-center items-center"><img src={fb} className = 'h-4 w-4' /> Facebook</a>
                        <a href="#" class="hover:text-gray-300 flex gap-2 justify-center items-center"><img src={x} className = 'h-4 w-4' /> X</a>
                        <a href="#" class="hover:text-gray-300 flex gap-2 justify-center items-center"><img src={insta} className = 'h-4 w-4' /> Instagram</a>
                    </div>
                    </div>
                </div>

                <div class="mt-8 border-t border-green-600 pt-4 text-center text-sm">
                    © 2025 FarmEase. All rights reserved.
                </div>
            </footer>
        </>
    )
}

export default Footer