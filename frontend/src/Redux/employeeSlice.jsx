import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    const response = await axios.get('http://localhost/api/employees');
    return response.data;
});

export const addEmployee = createAsyncThunk('employees/addEmployee', async (employeeData) => {
    const response = await axios.post('http://localhost/api/employees', employeeData);
    return response.data;
});

export const updateEmployee = createAsyncThunk('employees/updateEmployee', async ({ id, employeeData }) => {
    const response = await axios.put(`http://localhost/api/employees/${id}`, employeeData);
    return response.data;
});

export const deleteEmployee = createAsyncThunk('employees/deleteEmployee', async (id) => {
    await axios.delete(`http://localhost/api/employees/${id}`);
    return id;
});

const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addEmployee.fulfilled, (state, action) => {
                state.items.push(action.payload);
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                const updatedEmployee = action.payload;
                const index = state.items.findIndex(employee => employee._id === updatedEmployee._id);
                if (index !== -1) {
                    state.items[index] = updatedEmployee;
                }
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                const employeeId = action.payload;
                state.items = state.items.filter(employee => employee._id !== employeeId);
            });
    },
});

export default employeesSlice.reducer;