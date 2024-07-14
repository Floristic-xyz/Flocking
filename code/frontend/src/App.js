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
import ENS from './ENS';
import Nouns from './Nouns';
import { web3auth } from "./components/Web3Auth";

const { Search } = Input;

function App() {
  const { address: loggedInAddress } = useAccount()
  console.log('loggedInAddress ', loggedInAddress)

  const [nfts, setNfts] = useState([])
  const [address, setAddress] = useState('')
  const [tokens, setTokens] = useState([])
  const [ens, setEns] = useState('')
  const [txId, setTxId] = useState('')
  const [hasNouns, setHasNouns] = useState(false)
  const [showEns, setShowEns] = useState(false)
  const [afterEns, setAfterEns] = useState(false)
  const [provider, setProvider] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };


  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

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
        const nouns = res.data.items.filter(nft => nft.token.address === '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03');
        if (nouns.length > 0) {
          setHasNouns(true);
        }
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

  const onClickButton = async ()  => {
    await login();
  }


  const onClickMint = () => {
    setShowEns(true);
  }

  const onFinishEns = () => {
    setAfterEns(true);
    setShowEns(false);
  }

  return (
    <div className="App">

      <div className='container'>
        <ConnectButton />
        <br/><br/><br/><br/>
          {
            showEns ?
              <ENS onFinish={onFinishEns} />
            :
          <>
          {
          !afterEns ? 
          <>
          <div className='header'>
            <p>
              You new way to discover crypto
            </p>
          </div>

          {
            !showEns ?
              <div className='searchBar' >
                <Search placeholder="Address" onSearch={onSearch} enterButton />
              </div>
            : undefined
          }

          {
            !loggedInAddress ?
              <Button onClick={onClickButton}>I don't have a wallet</Button>
            : undefined
          }

          {/* {
            address ?
              <Card title={address} bordered={false} className='profile-card'>
              </Card>
            : null
          } */}

          <Divider orientation="left"></Divider>

          <Button type="primary" size="large" onClick={onClickMint}>Mint ENS</Button>

          <Divider orientation="left"></Divider>

          </>
          : undefined
        }

        {
          afterEns || address ?
            hasNouns ?
              <Nouns />
            : 
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
          : undefined
        }
        </>
        }
      </div>
    </div>
  );
}

export default App;
