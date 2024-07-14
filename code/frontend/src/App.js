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

const { Search } = Input;

function App() {
  const { writeContract } = useWriteContract();

  const { address: loggedInAddress } = useAccount()
  console.log('loggedInAddress ', loggedInAddress)

  const [nfts, setNfts] = useState([])
  const [address, setAddress] = useState('')
  const [tokens, setTokens] = useState([])
  const [ens, setEns] = useState('')
  const [txId, setTxId] = useState('')

  const onSearch = (_address) => {
    setAddress(_address);
  };

  useEffect(() => {
    console.log(loggedInAddress);
    if (loggedInAddress || address) {
      getNfts();
      getTokens();
    }
  }, [address, loggedInAddress]);

  const getNfts = async () => {
    try {
      const res = await axios.get(`https://eth.blockscout.com/api/v2/addresses/${address || loggedInAddress}/nft`);
      if (res.data) {
        const _nfts = res.data.items.map(nft => nft.image_url);
        setNfts(_nfts);
      }
    }
    catch(error) {

    }
  }

  const getTokens = async () => {
    try {
      const res = await axios.get(`https://eth.blockscout.com/api/v2/addresses/${address || loggedInAddress}/tokens`);
      if (res.data) {
        setTokens(res.data.items.filter(_token => _token.token.circulating_market_cap && _token.token.circulating_market_cap>10000));
      }
    }
    catch(error) {

    }
  }

  const onClickButton = () => {
    console.log('click');
  }

  const onSearchENS = (_ens) => {
    console.log('onSearchENS');
    writeContract({
      abi,
      address: '0x0F83bAfCa8529a254B2C8Af46108c9F39540b653',
      functionName: 'register',
      args: [
        _ens
      ],
    }, {
    onSuccess: (txId) => {
      setEns(_ens);
      setTxId(txId);
    }
   });
  }

  return (
    <div className="App">

      <div className='container'>
        <ConnectButton />;

        <div className='header'>
          <p>
            You new way to discover crypto
          </p>
        </div>

        <div className='searhBar' >
          <Search placeholder="input search text" onSearch={onSearch} enterButton />
        </div>
        <Button onClick={onClickButton}>I don't have a wallet</Button>
        {
          address ?
            <Card title={address} bordered={false} className='profile-card'>
            </Card>
          : null
        }

        <Divider orientation="left"></Divider>

        <div className='searhBar' >
          <Search placeholder="ENS name" onSearch={onSearchENS} enterButton />
        </div>

        <Divider orientation="left"></Divider>


        {
          loggedInAddress || address ?
            <>
              <Tag className='tag' color="magenta">Tokens</Tag>
              <List
                itemLayout="horizontal"
                dataSource={tokens}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={item.token.icon_url} />}
                      title={item.token.symbol}
                      description={item.value}
                    />
                  </List.Item>
                )}
                className='token-container'
              />
            </>
          : null
        }



        {
          loggedInAddress || address ?
            <>
              <Divider orientation="left"></Divider>
              <Space />
              <Tag className='tag' color="orange">NFTs</Tag>
              <Carousel>
              {
                  nfts.map((nft, i) => (
                      <img className='nft-image' src={nft} key={nft} />
                  ))
              }
      
              </Carousel>
            </>
          : undefined
        }

        </div>
        
    </div>
  );
}

export default App;
