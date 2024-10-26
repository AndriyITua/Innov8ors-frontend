export const selectUser = state => state.user;
export const selectUserId = state => state.user.id;
export const selectUserName = state => state.user.username;
export const selectUserEmail = state => state.user.email;
export const selectUserPhoto = state => state.user.photo;
export const selectUserLoading = state => state.user.isLoading;
export const selectUserError = state => state.user.error;
