import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json";


export default function App() {
  const [currentAccount, setCurrentAccount] = useState("");

  const [waversList, setWaversList] = useState([]);

  const checkIfWalletIsConnected = async () => {

    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have metamask!");
      } else {
        console.log("We have the ethereum object", ethereum);
      }
      const accounts = await ethereum.request({ method: "eth_accounts" });
      console.log(accounts);
      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }

    } catch (error) {
      console.error(error);
    }

  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected()
  }, [])

  useEffect(() => {
    refreshWavers()
  }, [])

  const wave = async () => {
    try {
      const { ethereum } = window;
      const contractAddress = '0x468125E63368aE35358F650032B22f85606Bd21f';
      const contractABI = abi.abi;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        // console.log(await allWavers());

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }


  const refreshWavers = async () => {
    try {
      const { ethereum } = window;
      const contractAddress = '0x468125E63368aE35358F650032B22f85606Bd21f';
      const contractABI = abi.abi;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
        const [waverAddress, waversCount] = await wavePortalContract.getAllWavers();
        const wavers = []
        for (let i = 0; i < waverAddress.length; i++) {
          wavers[i] = {
            address: waverAddress[i],
            count: parseInt(waversCount[i]._hex)
          }
        }
        setWaversList(wavers);
        console.log(waversList);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function DynamicTable() {
    if (waversList.length === 0) {
      return (<div></div>);
    }
    // get table column
    const column = Object.keys(waversList[0]);
    // get table heading data
    const ThData = () => {

      return column.map((data) => {
        return <th key={data}>{data}</th>
      })
    }
    // get table row data
    const tdData = () => {

      return waversList.map((data) => {
        return (
          <tr>
            {
              column.map((v) => {
                return <td>{data[v]}</td>
              })
            }
          </tr>
        )
      })
    }

    return (
      <table className="table">
        <thead>
          <tr>{ThData()}</tr>
        </thead>
        <tbody>
          {tdData()}
        </tbody>
      </table>
    )
  }


  return (
    <div>
      <div className="mainContainer">

        <div className="dataContainer">
          <div className="header">
            👋 Hey there!
          </div>

          <div className="bio">
            I am Vipul. Connect your Ethereum wallet and wave at me!
          </div>

          <button className="waveButton" onClick={wave}>
            Wave at Me
          </button>

          {!currentAccount && (
            <button className="waveButton" onClick={connectWallet}>
              Connect Wallet
            </button>
          )}

          <button className="refreshButton" onClick={refreshWavers}>
            Refresh
          </button>
        </div>
      </div>
      {<DynamicTable />}
    </div>
  );
}
