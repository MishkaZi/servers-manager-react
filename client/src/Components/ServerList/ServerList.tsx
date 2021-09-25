/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import ServerModel from '../../ServerModel';
import './ServerList.css';
import Axios from 'axios';
import ServerCard from '../ServerCard/ServerCard';
import { useDispatch, useSelector } from 'react-redux';
import { setServersAction } from '../../redux/actions';
import { defaultStateI } from '../../redux/reducers';

function ServerList() {
  const [isFilteredByDate, setIsFilteredByDate] = useState(false);
  const [isFilteredByStatus, setIsFilteredByStatus] = useState(false);

  const dispatch = useDispatch();

  const servers = useSelector<defaultStateI, defaultStateI['servers']>(
    (state) => state.servers
  );

  const getServersFromDB = async () => {
    try {
      const servers = await Axios.get<ServerModel[]>(
        'http://localhost:3001/servers/'
      );

      dispatch(setServersAction(servers.data));
    } catch (error) {
      alert(error);
    }
  };

  const filterByDate = () => {
    if (isFilteredByDate === false) {
      if (isFilteredByStatus === true) {
        setIsFilteredByStatus(false);
      }
      setIsFilteredByDate(true);
      servers?.sort((a: ServerModel, b: ServerModel) =>
        a.dateTime > b.dateTime ? 1 : -1
      );
    } else {
      setIsFilteredByDate(false);
      getServersFromDB();
    }
  };

  const filterByStatus = async () => {
    if (isFilteredByStatus === false) {
      if (isFilteredByDate === true) {
        setIsFilteredByDate(false);
      }
      setIsFilteredByStatus(true);
      servers?.sort((a: ServerModel, b: ServerModel) =>
        a.status < b.status ? 1 : -1
      );
    } else {
      setIsFilteredByStatus(false);
      getServersFromDB();
    }
  };

  useEffect(() => {
    getServersFromDB();
  }, []);

  useEffect(() => {
    if (servers!) {
      dispatch(setServersAction(servers));
    }
  }, [servers]);

  return (
    <>
      <div className='server-list'>
        {servers?.map((server: ServerModel) => (
          <ServerCard key={server.serverId} server={server} />
        ))}
      </div>
      <div className='filter-by-date-div'>
        <label>Filter servers by date: </label>
        <input
          type='checkbox'
          name='filterByDate'
          id='filterByDate'
          checked={isFilteredByDate}
          onChange={() => filterByDate()}
        />
      </div>
      <div className='filter-by-status-div'>
        <label>Filter servers by status: </label>
        <input
          type='checkbox'
          name='filterByDate'
          id='filterByDate'
          checked={isFilteredByStatus}
          onChange={() => filterByStatus()}
        />
      </div>
    </>
  );
}

export default ServerList;
