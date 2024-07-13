import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Card, Input, Space, Avatar, List, Divider, Flex, Tag, Button } from 'antd';
const { Search } = Input;
import { ConnectButton } from '@rainbow-me/rainbowkit';


function App() {
  const [nfts, setNfts] = useState([])
  const [address, setAddress] = useState('')
  const [tokens, setTokens] = useState([])


  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const onSearch = (_address) => {
    setAddress(_address)
  };

  useEffect(() => {
    if (address) {
      getNfts();
      getTokens();
    }
  }, [address]);

  const getNfts = async () => {
      const res = await axios.get(`https://eth.blockscout.com/api/v2/addresses/${address}/nft`);
      console.log(res.data);
      const _nfts = res.data.items.map(nft => nft.image_url);
      setNfts(_nfts);
  }

  const getTokens = async () => {
    const res = await axios.get(`https://eth.blockscout.com/api/v2/addresses/${address}/tokens`);
    console.log(res.data);
    setTokens(res.data.items.filter(_token => _token.token.circulating_market_cap && _token.token.circulating_market_cap>10000));
  }

  const onClickButton = () => {
    console.log('click');
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

        <div className='searBar' >
          <Search placeholder="input search text" onSearch={onSearch} enterButton />
        </div>
        <Button onClick={onClickButton}>I don't have a wallet</Button>
        {
          address ?
            <Card title={address} bordered={false} className='profile-card'>
            </Card>
          : null
        }

        {
          address ?
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
          address ?
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
