import React, { useState } from 'react';
import ServerModel from '../../ServerModel';
import Axios from 'axios';

import './ServerCard.css';


const ServerCard: React.FC<{ server: ServerModel }> = (props) => {
  const [status, setStatus] = useState(props.server.status);
  const statusChange = async () => {
    try {
      const newServer = { ...props.server };
      newServer.status = status === 1 ? 0 : 1;

      const response = await Axios.put(
        `https://servers-manager.herokuapp.com/servers/`,
        newServer
      );

      if (response.status === 200) {
        setStatus(status === 1 ? 0 : 1);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className={'server-card'}>
      <h2>{props.server.serverName}</h2>
      <p>{props.server.hostingCompany}</p>
      <p>{props.server.ip}</p>
      <p>{props.server.dateTime}</p>
      <div className='status-div'>
        <label>{status === 1 ? 'Online' : 'Offline'}</label>
        <label className='switch'>
          <input
            type='checkbox'
            name='status'
            id='status'
            checked={status === 1 ? true : false}
            onChange={() => statusChange()}
          />
          <span className='slider round'></span>
        </label>
      </div>
    </div>
  );
};

export default ServerCard;