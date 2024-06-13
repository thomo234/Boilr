import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import exhibitionsSlice from './exhibitions/exhibitionsSlice';
import messagesSlice from './messages/messagesSlice';
import pagesSlice from './pages/pagesSlice';
import portfoliosSlice from './portfolios/portfoliosSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';
import artistsSlice from './artists/artistsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    exhibitions: exhibitionsSlice,
    messages: messagesSlice,
    pages: pagesSlice,
    portfolios: portfoliosSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
    artists: artistsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
