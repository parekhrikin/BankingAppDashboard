import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

const backendURL = 'http://localhost:8080'

export const registerUser = createAsyncThunk(
  'api/customer/register',
  async ({ username, fullname, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }
      await axios.post(
        `${backendURL}/api/customer/register`,
        { username, fullname, password },
        config
      )
    } catch (error) {
    // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
  }
)

export const loginCustomer = createAsyncThunk(
    `api/customer/authenticate`,
    async ({ username, password }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const response = await axios.post(
          `${backendURL}/api/customer/authenticate`,
          { username, password },
          config
        )

        return response.data;
      } catch (error) {
      // return custom error message from backend if present
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

  export const loginStaff = createAsyncThunk(
    `api/staff/authenticate`,
    async ({ username, password }, { rejectWithValue }) => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const response = await axios.post(
          `${backendURL}/api/staff/authenticate`,
          { username, password },
          config
        )

        return response.data;
      } catch (error) {
      // return custom error message from backend if present
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          return rejectWithValue(error.message)
        }
      }
    }
  )

  export const setAuthenticated = (value) => ({
    type: 'SET_AUTHENTICATED',
    payload: value,
  });