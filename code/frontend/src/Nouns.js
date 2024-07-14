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

function Nouns() {

  const onClick = () => {
    window.open('https://nouns.wtf/', '_blank')
  }

  return (
    <>
        <div className='header'>
          <p>
            You are an early Noun!
          </p>
        </div>  
        <div className='nouns-container'>
            <Card className='nouns-1'>
              <Button size="large" type="primary" onClick={onClick}>Convert a Noun to $Nouns</Button>
            </Card>   
            <Card className='nouns-2'>
              <Button size="large" type="primary" onClick={onClick}>Trade your Noun</Button>
            </Card>  
        </div>   
    </>
  );
}

export default Nouns;
