import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import Config from '../config/Config';

interface IProps {
  children: React.ReactNode;
}

export const Context = createContext({} as any);

const Wrapper: React.FC<IProps> = ({ children }) => {
  const [data, setData] = useState<any>(undefined);
  const [selectedAsset, setSelectedAsset] = useState<any>(undefined);
  const [assets, setAssets] = useState<string[]>([]);
  const [selected, setSelected] = useState<string>('');

  const getData = async () => {
    const response = await axios.get(
      `${Config.apiUrl}/get_assets?pg=1&tvl_min=50000&sort=tvlStaked&sort_order=desc&farms_tvl_staked_gte=10000000`
    );

    // Replacing Infinity with 999999999999999999 because parsing issue.
    const tmpData = JSON.parse(
      response.data.replaceAll('Infinity', 999999999999999999)
    );

    const data = createFakeApr(tmpData.data);
    handleAssetsData(data);

    setData(data);
    setSelectedAsset(data[0]);
  };

  const handleAssetsData = (data) => {
    const assets = data.map((item) => item.assetId);
    setAssets(assets);
    setSelected(assets[0]);
  };

  const createFakeApr = (data) => {
    return data.map((item) => {
      if (!item.selected_farm) {
        return item;
      }

      let initialAPR = 2;
      item.fakeApr = item.selected_farm[0].tvlStakedHistory.map(
        (subItem, index) => {
          initialAPR = initialAPR + initialAPR * 0.05;

          return { ...subItem, value: initialAPR };
        }
      );

      return item;
    });
  };

  useEffect(() => {
    setSelectedAsset(data && data.find((item) => item.assetId === selected));
  }, [data, selectedAsset, selected]);

  return (
    <Context.Provider
      value={{
        assets,
        getData,
        selected,
        setSelected,
        selectedAsset,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Wrapper;
