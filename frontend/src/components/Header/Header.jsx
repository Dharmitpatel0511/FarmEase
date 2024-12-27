import logo from  '../../assets/logo.png'

const Header = () => {
    return (
        <>
            <div id = 'header' className = 'flex flex-col items-center justify-around w-full h-32 bg-red-300'>
                <div id = 'subheader1 ' className = 'h-[60%] flex items-center justify-around w-full border-b-2 border-red-950 p-[1%]'>
                    <div className = 'flex flex-[4_1_0%] h-full justify-center'>
                        <img src = {logo} className = 'h-full object-fill'/>
                    </div>
                    <div className = 'flex h-full flex-[7_1_0%]'>
                        <div className = 'flex-[1_1_0%] h-full flex justify-center items-center '>
                            <button><i class="fa fa-search"></i></button>
                        </div>
                        <div className = 'flex-[7_1_0%] flex items-center justify-center'>
                            <input type="text" name="searchbox" id="searchbox" placeholder='search products' className = 'pl-3 h-[50%] w-full border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500'/>
                        </div>
                    </div>
                    <div className = 'flex flex-[5_1_0%] h-full justify-center items-center'>
                        <div className = 'px-4 bg-rose-950 text-white rounded-full h-[70%] flex justify-center items-center'>
                            Sign in/Sign up
                        </div>
                    </div>
                    <div className = 'flex flex-[2_1_0%] h-full justify-center items-center'>
                        <div className = 'px-4 bg-rose-950 text-white rounded-full h-[70%] flex gap-2 justify-center items-center'>
                            <img className = 'h-[70%] object-fill' src='https://img.icons8.com/?size=100&id=9671&format=png&color=FFFFFF'/>
                            Cart
                        </div>
                    </div>
                    <div className = 'flex flex-[2_1_0%] h-full justify-center items-center'>
                        <div className = 'px-4 bg-rose-950 text-white rounded-full h-[70%] flex justify-center items-center'>
                            <img className = 'h-[70%] object-fill' src="https://img.icons8.com/?size=100&id=21622&format=png&color=FFFFFF"/>
                        </div>
                    </div>
                </div>

                <div id = 'subheader2' className = 'bg-rose-100 h-[40%] flex items-center justify-around w-full p-[1%]'>
                    <div className = 'flex justify-center items-center flex-[1_1_0%] h-full'>Home</div>
                    <div className = 'flex justify-center items-center flex-[1_1_0%] h-full'>About Us</div>
                    <div className = 'flex justify-center items-center flex-[1_1_0%] h-full'>
                        <div className = 'flex flex-col items-center justify-center h-full'>
                            Change Category
                            <select className = 'px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1'>
                                <option value="all">All</option>
                                <option value="fruit">Fruits</option>
                                <option value="vegetable">Vegetables</option>
                                <option value="dairy">Dairy Products</option>
                                <option value="farmcore">Farm Core</option>
                                <option value="dryfruit">Dryfruits</option>
                            </select>
                        </div>
                    </div>
                    <div className = 'flex justify-center items-center flex-[1_1_0%] h-full'>
                        <div className = 'flex flex-col items-center justify-center h-full'>
                            Change Region
                            <select className = 'px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-1'>
                                <option value="all">All</option>
                                <option value="north">Northern India</option>
                                <option value="east">Eastern India</option>
                                <option value="south">Southern India</option>
                                <option value="west">Western India</option>
                                <option value="central">Central India</option>
                                <option value ='northeastern'>Northeastern India</option>
                            </select>
                        </div>
                    </div>
                    <div className = 'flex justify-center items-center flex-[1_1_0%] h-full'>Contact Us</div>
                </div>
            </div>
        </>
    )
}

export default Header