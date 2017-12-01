export const UPDATE_CAMERA_REMOTENESS = '@src/actions/camera/UPDATE_CAMERA_REMOTENESS'
export const UPDATE_CAMERA_ROTATION = '@src/actions/camera/UPDATE_CAMERA_ROTATION'

export const updateCameraRemoteness = deltaY => ({
  type: UPDATE_CAMERA_REMOTENESS,
  payload: { deltaY }
})

export const updateCameraRotation = deltaY => ({
  type: UPDATE_CAMERA_ROTATION,
  payload: { deltaY }
})
