const setSquads = (squads) => {
  return { type: "SET SQUADS", squads: squads }
}

const deleteRequest = (squad, userRequest) => {
  return { type: 'DELETE REQUEST', squad: squad, userRequest: userRequest }
}

const pushRequest = (squad, userRequest) => {
  return { type: 'PUSH REQUEST', squad: squad, userRequest: userRequest }
}

export { setSquads, deleteRequest, pushRequest }
