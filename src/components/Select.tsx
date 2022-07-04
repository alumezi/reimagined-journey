import React from 'react';
import styled from 'styled-components';

interface IProps {
  selected: string;
  selectData: any[];
  setSelected(selected: string): void;
}

const Select: React.FC<IProps> = ({ selectData, selected, setSelected }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
  };

  return (
    <Wrapper>
      <select onChange={handleChange} value={selected}>
        {selectData.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin: 15px auto;
`;

export default Select;
