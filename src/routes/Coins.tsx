import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { brands, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const coinToss = keyframes`
  from{
    transform: rotateY(0deg)
  }
  to{
    transform: rotateY(360deg);
  }
`;

const Icon = styled.div`
  font-size: 40px;
  color: ${(props) => props.theme.reverseAccColor};
  animation: ${coinToss} 2s linear infinite;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;
const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 35px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.bgColor};
  border: none;
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.2);
  }

  a {
    display: flex;
    align-items: center;
  }
`;

const ConisList = styled.ul``;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 15px;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }

  a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    transition: color 0.2s ease-in;
    div {
      display: flex;
      align-items: center;

      span:nth-child(2) {
        margin-left: 10px;
      }
    }
    div:last-child {
      justify-content: space-between;
      width: 45%;
    }
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

const Percent = styled.span`
  color: ${(props) => props.color};
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  quotes: {
    USD: {
      price: number;
      percent_change_15m: number;
    };
  };
}

interface ICoinsProps {}

function Coins({}: ICoinsProps) {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);

  return (
    <Container>
      <Helmet>
        <title>Coin Tracker</title>
      </Helmet>
      <Header>
        <Icon>
          <FontAwesomeIcon icon={brands("bitcoin")} />
        </Icon>
        <Title>Coin Tracker</Title>
        <Btn onClick={toggleDarkAtom}>
          <FontAwesomeIcon icon={solid("circle-half-stroke")} />
        </Btn>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <ConisList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link
                to={{
                  pathname: `/${coin.id}`,
                  state: { name: coin.name },
                }}
              >
                <div>
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name}
                </div>
                <div>
                  <span>$ {coin.quotes.USD.price.toFixed(2)}</span>
                  {JSON.stringify(coin.quotes.USD.percent_change_15m).includes(
                    "-"
                  ) ? (
                    <Percent color={"#ff4757"}>
                      {coin.quotes.USD.percent_change_15m}%
                    </Percent>
                  ) : (
                    <Percent color={"#5352ed"}>
                      +{coin.quotes.USD.percent_change_15m}%
                    </Percent>
                  )}
                </div>
              </Link>
            </Coin>
          ))}
        </ConisList>
      )}
    </Container>
  );
}
export default Coins;
