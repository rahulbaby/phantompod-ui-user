import React, { Component, useRef, Fragment, useState, useEffect } from 'react';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';

import Layout from 'layouts/Main';

import { TableComp, CustomButton } from 'components/common';

import Form from './components/Form';
import Filter from './components/Filter';
import { instance } from 'lib';
import { showMessage } from 'store/messages/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const API = 'user';

const selectItem = createSelector((state) => state.items.rows);

const Batchcol = ({ row }) => {
  const batches = useSelector(({ items }) => items.rows.batches);
  let batch = batches.find((x) => x.batchId === row.batchId);
  return batch ? batch.batchName : '-NA-';
};

const StatusCol = ({ row }) => {
  const accountStatusArr = useSelector(({ items }) => items.rows.accountStatus);
  let accountStatus = accountStatusArr.find((x) => x.accountStatusId === row.accountStatus);
  let color = row.accountStatus == 1 ? 'green' : row.accountStatus == 2 ? 'blue' : 'red';
  return accountStatus ? (
    <Typography style={{ color }}>{accountStatus.accountStatusLabel}</Typography>
  ) : (
    '-NA-'
  );
};

const cols = [
  { label: 'Name', key: 'name' },
  { label: 'Phone', key: 'phone' },
  {
    label: 'Batch',
    key: 'batchId',
    formatter: (row) => <Batchcol row={row} />,
  },
  {
    label: 'Status',
    key: 'accountStatus',
    formatter: (row) => <StatusCol row={row} />,
  },
];

const where = { phone: 7034443377 };

const UserPage = () => {
  const classes = useStyles();
  const tableRef = useRef(null);
  const [showForm, setShowForm] = useState(false);
  const [row, setRow] = useState(null);
  const [where, setWhere] = useState({});
  //const [count, setCount] = useState(0);
  const dispatch = useDispatch();

  const fetchRows = () => tableRef && tableRef.current.fetchRows();

  useEffect(() => {
    fetchRows();
  }, [where]);

  const handleDelete = (row) => () => {
    setRow(row);
    instance.delete(`user/${row.id}`).then((res) => {
      if (res.error) return;
      dispatch(showMessage(`${row.name} removed from list`, 'error'));
      fetchRows();
    });
  };

  const handleEdit = (row) => () => {
    setRow(null);
    setShowForm(false);
    setTimeout(() => {
      setRow(row);
      setShowForm(true);
    }, 100);
  };

  return (
    <div className={classes.root}>
      <Drawer
        anchor={'right'}
        open={showForm}
        style={{ padding: '10vW' }}
        onClose={() => {
          setShowForm(false);
          setRow(null);
        }}
      >
        <Form
          onSuccess={() => {
            fetchRows();
            setShowForm(false);
            setRow(null);
          }}
          onCancel={() => {
            setShowForm(false);
            setRow(null);
          }}
          row={row}
        />
      </Drawer>
      <Filter onSuccess={(where) => setWhere(where)} />
      <TableComp
        where={where}
        ref={tableRef}
        cols={cols}
        API={API}
        DELETE_API={API}
        pKey={`id`}
        rowHightLighted={row ? row.id : null}
        onEditClick={handleEdit}
        handleDelete={handleDelete}
      />
      {!showForm && <CustomButton label="ADD NEW STUDENT" onClick={() => setShowForm(true)} />}
    </div>
  );
};

export default () => (
  <Layout>
    <UserPage />
  </Layout>
);
