import {useEffect, useState} from 'react'
import CommunityBox from '../utils/CommunityBox'
import {Link} from 'react-router-dom'

const Community = () => {


    return (
        <>
            <section id="communities" class="bg-gray-200 py-8">
                <div class="container mx-auto">
                    <h2 class="text-2xl font-bold text-center mb-6">Communities</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link to='chatbox1'><CommunityBox roomId={1} communityName = {'Yantra Mitra'} communityDesc = {'Learn about modern farming tools.'} /></Link>
                        <Link to='chatbox2'><CommunityBox roomId={2} communityName = {'Annadata Ki Kahani'} communityDesc = {'Stories of inspiring farmers.'} /></Link>
                        <Link to='chatbox3'><CommunityBox roomId={3} communityName = {'Hariyali Samvad'} communityDesc = {'Discussions on sustainable farming.'} /></Link>
                        <Link to='chatbox4'><CommunityBox roomId={4} communityName = {'Shiksha Aur Kheti'} communityDesc = {'Education and farming insights.'} /></Link>
                        <Link to='chatbox5'><CommunityBox roomId={5} communityName = {'Bazaar'} communityDesc = {'Marketplace updates and resources.'} /></Link>
                        <Link to='chatbox6'><CommunityBox roomId={6} communityName = {'Videsh Bazaar'} communityDesc = {'Export opportunities for farmers.'} /></Link>
                        <Link to='chatbox7'><CommunityBox roomId={7} communityName = {'Jaivik Mandi'} communityDesc = {'Connect to organic produce markets.'} /></Link>
                        <Link to='chatbox8'><CommunityBox roomId={8} communityName = {'Kheti Salah'} communityDesc = {'Expert agricultural advice and solutions.'} /></Link>
                    </div>
                </div>
            </section>
        </>
    )
}


export default Community