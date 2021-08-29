const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const fetch = require('node-fetch');
require('dotenv').config()
const bodyParser = require("body-parser");
var chai = require('chai');  
var assert = chai.assert;    // Using Assert style
var expect = chai.expect;    // Using Expect style
var should = chai.should();  // Using Should style

app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());



const t1 = async () => {
    const url = 'https://exercisetrker.herokuapp.com';
    const res = await fetch(url + '/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=fcc_test_${Date.now()}`.substr(0, 29)
    });
    assert.isTrue(res.ok);
    if(!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`)
    }
    else{
        console.log("t1 ok!");
    }
  };



const t2 = async (getUserInput) => {
    const url = 'https://exercisetrker.herokuapp.com';
    const res = await fetch(url + '/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=fcc_test_${Date.now()}`.substr(0, 29)
    });
    if (res.ok) {
      const { _id, username } = await res.json();
      assert.exists(_id);
      assert.exists(username);
      console.log("t2 ok!")
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    
  };

const t3 = async(getUserInput) => {
    const url = 'https://exercisetrker.herokuapp.com';
    const res = await fetch(url + '/api/users');
    assert.isTrue(res.ok);
    if(!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`)
    }
    else{
        console.log("t3 ok!");
    }

  };


const t4 = async(getUserInput) => {
    const url = 'https://exercisetrker.herokuapp.com';
    const res = await fetch(url + '/api/users');
    if(res.ok){
      const users = await res.json();
      assert.isArray(users);
      console.log("t4 ok!");
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    };
  };


const t5 = async(getUserInput) => {
    const url = 'https://exercisetrker.herokuapp.com';
    const res = await fetch(url + '/api/users');
    if(res.ok){
      const users = await res.json();
      const user = users[0];
      assert.exists(user);
      assert.exists(user.username);
      assert.exists(user._id);
      assert.isString(user.username);
      assert.isString(user._id);
      console.log("t5 ok!");
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    };
  };

const t6 = async (getUserInput) => {
    const url = 'https://exercisetrker.herokuapp.com';
    const res = await fetch(url + '/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=fcc_test_${Date.now()}`.substr(0, 29)
    });
    if (res.ok) {
      const { _id, username } = await res.json();
      const expected = {
        username,
        description: 'test',
        duration: 60,
        _id,
        date: 'Mon Jan 01 1990'
      };
      const addRes = await fetch(url + `/api/users/${_id}/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `description=${expected.description}&duration=${expected.duration}&date=1990-01-01`
      });
    assert.isTrue(addRes.ok);

    if(!addRes.ok) {
      throw new Error(`${addRes.status} ${addRes.statusText}`)
    };
    console.log("t6 ok!");
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    }
  };
  

const t7 = async (getUserInput) => {
    const url = 'https://exercisetrker.herokuapp.com';
    const res = await fetch(url + '/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=fcc_test_${Date.now()}`.substr(0, 29)
    });
    if (res.ok) {
      const { _id, username } = await res.json();
      const expected = {
        username,
        description: 'test',
        duration: 60,
        _id,
        date: 'Mon Jan 01 1990'
      };
      const addRes = await fetch(url + `/api/users/${_id}/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `description=${expected.description}&duration=${expected.duration}&date=1990-01-01`
      });
      if (addRes.ok) {
        const actual = await addRes.json();
        console.log(expected, actual);
        assert.deepEqual(actual, expected);
        assert.isString(actual.description);
        assert.isNumber(actual.duration);
        assert.isString(actual.date);
      } else {
        throw new Error(`${addRes.status} ${addRes.statusText}`);
      }
      console.log("t7 ok!");
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    }
  };
  
const t8 = async (getUserInput) => {
    const url = 'https://exercisetrker.herokuapp.com';
    const res = await fetch(url + '/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=fcc_test_${Date.now()}`.substr(0, 29)
    });
    if (res.ok) {
      const { _id, username } = await res.json();
      const expected = {
        username,
        description: 'test',
        duration: 60,
        _id,
        date: new Date().toDateString()
      };
      const addRes = await fetch(url + `/api/users/${_id}/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `description=${expected.description}&duration=${expected.duration}`
      });
      if (addRes.ok) {
        const logRes = await fetch(url + `/api/users/${_id}/logs`);
      assert.isTrue(logRes.ok);
      if(!logRes.ok) {
        throw new Error(`${logRes.status} ${logRes.statusText}`)
      };
      console.log("t8 ok!");
      } else {
        throw new Error(`${addRes.status} ${addRes.statusText}`);
      }
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    }
  };
  

const t9 = async (getUserInput) => {
    const url = 'https://exercisetrker.herokuapp.com';
    const res = await fetch(url + '/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=fcc_test_${Date.now()}`.substr(0, 29)
    });
    if (res.ok) {
      const { _id, username } = await res.json();
      const expected = {
        username,
        description: 'test',
        duration: 60,
        _id,
        date: new Date().toDateString()
      };
      const addRes = await fetch(url + `/api/users/${_id}/exercises`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `description=${expected.description}&duration=${expected.duration}`
      });
      if (addRes.ok) {
        const logRes = await fetch(url + `/api/users/${_id}/logs`);
        if (logRes.ok) {
          const { count } = await logRes.json();
          assert(count);
          console.log("t9 ok!");
        } else {
          throw new Error(`${logRes.status} ${logRes.statusText}`);
        }
      } else {
        throw new Error(`${addRes.status} ${addRes.statusText}`);
      }
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    }
  };
  

t1();
t2();
t3();
t4();
t5();
t6();
t7();
t8();
t9();