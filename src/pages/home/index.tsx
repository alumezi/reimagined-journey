import React, { useEffect } from 'react';
import styled from 'styled-components';

import Chart from 'components/Chart';
import Select from 'components/Select';

import { Context } from 'lib/store';

const Home = () => {
  const { selectedAsset, getData, assets, selected, setSelected } =
    React.useContext(Context);
  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      {assets.length > 0 && (
        <Select
          selected={selected}
          selectData={assets}
          setSelected={setSelected}
        />
      )}
      <ChartWrapper>
        {selectedAsset && (
          <Chart selected={selected} data={selectedAsset.fakeApr} />
        )}
        {selectedAsset && (
          <Chart
            selected={selected}
            data={selectedAsset.selected_farm[0].tvlStakedHistory}
          />
        )}
      </ChartWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  text-align: center;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #242a44;
`;

const ChartWrapper = styled.div`
  gap: 30px;
  display: flex;
  padding: 30px;
  flex-direction: row;
  background-color: #303559;
`;

export default Home;
