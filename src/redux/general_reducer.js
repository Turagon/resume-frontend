
const initGeneralState = { user: '', open: false, error: '', display: true, adminBaseURL: 'https://turagon.github.io/resume-frontend/admin', userBaseURL: 'https://turagon.github.io/resume-frontend/user' }
export default function generalReducer(preState = initGeneralState, action) {
  const { type, data } = action

  switch (type) {
    case 'initGeneralEdit':
      return { ...data }

    case 'editGeneralUsername':
      preState.username = data
      return preState

    case 'editAdminBaseURL':
      preState.adminBaseURL = data
      return preState

    case 'editUser':
      preState.user = data
      return preState

    case 'editOpen':
      preState.open = data
      return preState

    case 'editError':
      preState.error = data
      return preState

    case 'editDisplay':
      preState.display = data
      return preState

    default:
      return initGeneralState
  }
}