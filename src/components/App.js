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

    const nftAddress = "0x9e599631D8af4D39D8E64e344bEd2bD4b2104B4C";
    const nftMarketplaceAddress = "0xD75cBfF07470F17F469860eAD501aCa84C4E0B13";

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
                        <Route path="/" element={
                            <Create marketplace={marketplace} nft={nft} />
                        } />
                        <Route path="/OnSale" element={
                            <OnSale marketplace={marketplace} nft={nft} />
                        } />

                    </Routes>
                </div>
            </div>
        </BrowserRouter>

    )

}


export default App;