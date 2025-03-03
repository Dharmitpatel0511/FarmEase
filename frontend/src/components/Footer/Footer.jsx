import fb from '../../assets/fb.png'
import insta from '../../assets/insta.jpeg'
import x from '../../assets/x.png'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate();

    return (
        <footer id="footer" className="bg-green-800 text-white py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
                <div>
                    <h2 className="text-2xl font-bold mb-4">FarmEase</h2>
                    <p className="text-sm leading-relaxed">
                        Empowering farmers and connecting them directly to consumers.
                        Fair prices, zero middlemen.
                    </p>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li 
                            className="cursor-pointer hover:text-gray-300 transition" 
                            onClick={() => {
                                navigate('/aboutus');
                                document.querySelector('#header')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            About Us
                        </li>
                        <li 
                            className="cursor-pointer hover:text-gray-300 transition" 
                            onClick={() => {
                                navigate('/');
                                setTimeout(() => {
                                    document.querySelector('#categories')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}
                        >
                            Categories
                        </li>
                        <li 
                            className="cursor-pointer hover:text-gray-300 transition" 
                            onClick={() => {
                                navigate('/');
                                setTimeout(() => {
                                    document.querySelector('#communities')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}
                        >
                            Communities
                        </li>
                        <li 
                            className="cursor-pointer hover:text-gray-300 transition" 
                            onClick={() => {
                                navigate(`/showproducts?search=&category=All&region=All`);
                                setTimeout(() => {
                                    document.querySelector('#header')?.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}
                        >
                            Products
                        </li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                    <p className="text-sm mb-2">📍 <span className="font-medium">Address:</span> FarmEase HQ, Rural India</p>
                    <p className="text-sm mb-2">📞 <span className="font-medium">Phone:</span> +91-6355121720</p>
                    <p className="text-sm mb-4">📧 <span className="font-medium">Email:</span> farmease.business@gmail.com</p>

                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-gray-300 flex gap-2 items-center transition">
                            <img src={fb} alt="Facebook" className="h-5 w-5" /> Facebook
                        </a>
                        <a href="#" className="hover:text-gray-300 flex gap-2 items-center transition">
                            <img src={x} alt="X" className="h-5 w-5" /> X
                        </a>
                        <a href="#" className="hover:text-gray-300 flex gap-2 items-center transition">
                            <img src={insta} alt="Instagram" className="h-5 w-5" /> Instagram
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-green-600 pt-4 text-center text-sm">
                © 2025 <span className="font-semibold">FarmEase</span>. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
