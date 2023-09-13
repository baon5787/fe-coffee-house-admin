import { createSlice } from '@reduxjs/toolkit'
import { EMPTY_ARRAY } from '~/constants/AppConstant';
import { getIsDeleteSelect } from '~/utils/HandleTable';

const UserSlice = createSlice({
    name: "user",
    initialState: {
        allUser: EMPTY_ARRAY,
        isFetching: false,
        isSelected: false,
        error: false,
        msg: "",
    },
    reducers: {
        deleteChangeSelectUsers: (state, action) => {
            state.isSelected = getIsDeleteSelect(action.payload);
            state.allUser = {
                ...state.allUser,
                users: action.payload,
            }
        },
        getUsersStart: (state) => {
            state.isFetching = true;
        },
        getUsersSuccess: (state, action) => {

            const { users, totalPage } = action.payload;

            state.allUser = {
                users: users,
                totalPage: totalPage
            };

            state.isFetching = false;
            state.isSelected = false;
        },
        getUsersFailed: (state) => {
            state.isFetching = false;
            state.error = true;
        },
    }
})

export const {
    deleteChangeSelectUsers,
    getUsersStart,
    getUsersSuccess,
    getUsersFailed
} = UserSlice.actions;

export default UserSlice.reducer;

