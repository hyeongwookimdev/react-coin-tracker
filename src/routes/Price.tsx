import { useQuery } from "@tanstack/react-query";
import { fetchCoinPrice } from "../api";
import styled from "styled-components";

const PriceInfoList = styled.ul`
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const PriceInfo = styled.li`
  display: flex;
  justify-content: space-between;

  padding: 5px 10px;
  background-color: white;
  color: black;
  margin: 5px;
  border-radius: 10px;
  div {
  }
`;
const PriceInfoTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 12.5px;
  font-weight: 600;
  font-size: 18px;
  div:nth-child(3) {
    color: #e84118;
  }
  div:last-child {
    color: #00a8ff;
  }
`;

interface PriceProps {
  coinId: string;
}

interface IPrice {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IPrice[]>(["CoinPrice", coinId], () =>
    fetchCoinPrice(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading..."
      ) : (
        <PriceInfoList>
          <PriceInfoTitle>
            <div>Close Time</div>
            <div>Close Price</div>
            <div>High Price</div>
            <div>Low Price</div>
          </PriceInfoTitle>
          {data?.map((price, index) => (
            <PriceInfo key={index}>
              <div>
                {String(
                  new Date(price.time_close * 1000).getFullYear()
                ).padStart(2, "0")}
                -
                {String(new Date(price.time_close * 1000).getMonth()).padStart(
                  2,
                  "0"
                )}
                -
                {String(new Date(price.time_close * 1000).getDate()).padStart(
                  2,
                  "0"
                )}
              </div>
              <div>${price.close}</div>
              <div>${price.high}</div>
              <div>${price.low}</div>
            </PriceInfo>
          ))}
        </PriceInfoList>
      )}
    </div>
  );
}

export default Price;
