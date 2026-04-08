import { createSlice } from '@reduxjs/toolkit';

const SEED_EMPLOYEES = [
  { id: 1, fname: 'Arjun',  lname: 'Mehta',    email: 'arjun.m@ems.com',  dept: 'Engineering', role: 'Lead Developer',     salary: 1400000, location: 'Bangalore', status: 'Active',   joinDate: '2021-03-15' },
  { id: 2, fname: 'Priya',  lname: 'Sharma',   email: 'priya.s@ems.com',  dept: 'Design',      role: 'UX Designer',        salary: 1100000, location: 'Mumbai',    status: 'Active',   joinDate: '2022-06-01' },
  { id: 3, fname: 'Rahul',  lname: 'Gupta',    email: 'rahul.g@ems.com',  dept: 'Marketing',   role: 'Marketing Manager',  salary: 980000,  location: 'Delhi',     status: 'Active',   joinDate: '2020-11-20' },
  { id: 4, fname: 'Sneha',  lname: 'Patel',    email: 'sneha.p@ems.com',  dept: 'Finance',     role: 'Financial Analyst',  salary: 1200000, location: 'Ahmedabad', status: 'Active',   joinDate: '2023-01-10' },
  { id: 5, fname: 'Vikram', lname: 'Singh',    email: 'vikram.s@ems.com', dept: 'HR',          role: 'HR Manager',         salary: 900000,  location: 'Pune',      status: 'Inactive', joinDate: '2019-08-05' },
  { id: 6, fname: 'Ananya', lname: 'Rao',      email: 'ananya.r@ems.com', dept: 'Engineering', role: 'Backend Engineer',   salary: 1300000, location: 'Hyderabad', status: 'Active',   joinDate: '2022-09-12' },
  { id: 7, fname: 'Kiran',  lname: 'Nair',     email: 'kiran.n@ems.com',  dept: 'Operations',  role: 'Ops Lead',           salary: 850000,  location: 'Chennai',   status: 'Active',   joinDate: '2021-07-22' },
  { id: 8, fname: 'Deepa',  lname: 'Krishnan', email: 'deepa.k@ems.com',  dept: 'Design',      role: 'Product Designer',   salary: 1050000, location: 'Bangalore', status: 'Active',   joinDate: '2023-04-03' },
];

const initialState = {
  list: SEED_EMPLOYEES,
  filter: 'All',
  search: '',
};

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    // Task 5 — Reducer examples using Immer (built into RTK)
    addEmployee: (state, action) => {
      // Immer allows direct "mutation" — internally returns new state
      state.list.push(action.payload);
    },
    editEmployee: (state, action) => {
      const index = state.list.findIndex((e) => e.id === action.payload.id);
      if (index !== -1) state.list[index] = { ...state.list[index], ...action.payload };
    },
    deleteEmployee: (state, action) => {
      state.list = state.list.filter((e) => e.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const {
  addEmployee,
  editEmployee,
  deleteEmployee,
  setFilter,
  setSearch,
} = employeeSlice.actions;

// Selectors
export const selectAllEmployees = (state) => state.employees.list;
export const selectFilter = (state) => state.employees.filter;
export const selectSearch = (state) => state.employees.search;
export const selectFilteredEmployees = (state) => {
  let list = state.employees.list;
  if (state.employees.filter !== 'All')
    list = list.filter((e) => e.dept === state.employees.filter);
  if (state.employees.search) {
    const q = state.employees.search.toLowerCase();
    list = list.filter((e) =>
      `${e.fname} ${e.lname} ${e.email} ${e.dept} ${e.role}`.toLowerCase().includes(q)
    );
  }
  return list;
};

export default employeeSlice.reducer;