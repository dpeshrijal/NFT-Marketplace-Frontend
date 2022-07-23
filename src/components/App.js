import { BrowserRouter, Routes, Route } from "react-router-dom";
import NFTAbi from "../utils/NFT.json";
import NFTMarketplaceAbi from "../utils/NFTMarketplace.json";
import { useState } from "react";
import { ethers } from "ethers";
import Navigation from './Navbar';
import OnSale from './OnSale.js';
import Create from './Create.js';


import './App.css';

function App() {
    const [account, setAccount] = useState("");
    const [nft, setNFT] = useState("");
    const [marketplace, setMarketplace] = useState();

    const nftAddress = "0xC5AbBf156beC66dD38e28642D8aB79BA88c15E8e";
    const nftMarketplaceAddress = "0x425290587d24d49c29D088509325529988E4d504";

    const web3Handler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0])
        // Get provider from Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // Set signer
        const signer = provider.getSigner()

        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        })

        window.ethereum.on('accountsChanged', async function (accounts) {
            setAccount(accounts[0])
            await web3Handler()
        })
        loadContracts(signer)
    }
    const loadContracts = async (signer) => {
        // Get deployed copies of contracts

        setMarketplace(new ethers.Contract(nftMarketplaceAddress, NFTMarketplaceAbi.abi, signer));
        setNFT(new ethers.Contract(nftAddress, NFTAbi.abi, signer));
    }

    return (

        <BrowserRouter>
            <div className="App">
                <>
                    <Navigation web3Handler={web3Handler} account={account} />
                </>

                <div>

                    <Routes>
                        <Route exact path="/NFT-Marketplace-Frontend/" element={
                            <Create marketplace={marketplace} nft={nft} />
                        } />
                        <Route path="/NFT-Marketplace-Frontend/OnSale" element={
                            <OnSale marketplace={marketplace} nft={nft} />
                        } />

                    </Routes>
                </div>
            </div>
        </BrowserRouter>

    )

}


export default App;