import React from 'react';
import { InfoPopover, TitleInfoPopover } from '../../components';
import { InfoActionContainer } from '../InfoActionContainer';

const InfoContainer = ({ data }) => {
  return (
    <InfoPopover
      title={<TitleInfoPopover title={data.fullName} />}
      content={<InfoActionContainer data />}
      data={data}
    />
  );
};

export default InfoContainer;
