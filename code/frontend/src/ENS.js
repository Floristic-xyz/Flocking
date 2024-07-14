import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Card, Input, Space, Avatar, List, Divider, Flex, Tag, Button } from 'antd';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useEnsName } from 'wagmi'
import abi from './abi';
import { useWriteContract } from 'wagmi'


// const { Search } = Input;

function ENS({ onFinish }) {
  const { writeContract } = useWriteContract();

  const [ens, setEns] = useState('')
  const [txId, setTxId] = useState('')
  const [text, setText] = useState('')

  const onChangeText = (e) => {
    setText(e.target.value);
  }

  const onSearchENS = () => {
    console.log('onSearchENS ', text);
    writeContract({
      abi,
      address: '0x0F83bAfCa8529a254B2C8Af46108c9F39540b653',
      functionName: 'register',
      args: [
        text
      ],
    }, {
    onSuccess: (txId) => {
      setEns(text);
      setTxId(txId);
    }
   });
  }

  const onContinue = () => {
    onFinish();
  }

  if (txId) {
    return (
        <>
            <div className='header small'>
                <p>
                    You got it!
                </p>
                <br/>
                <span>
                    You are now ready discovering crypto in a new way.
                </span>
                <br/>
                <a href={`https://eth-sepolia.blockscout.com/tx/${txId}`} target='_blank'>View on BlockScout</a>
                <br/>
                <Button type="primary" onClick={onContinue}>Continue</Button>
            </div>
        
        </>
    )
  }

  return (
    <>
        <div className='header'>
          <p>
            Create a username
          </p>
        </div>
        <div className='searchBar' >
              <Input placeholder="ENS name" onChange={onChangeText} size="large" />
              <br/><br/>
              <Button type="primary" onClick={onSearchENS}>Confirm</Button>
        </div>        
    </>
  );
}

export default ENS;
