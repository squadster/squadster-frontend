const setSquads = (squads) => {
  return { type: "SET SQUADS", squads: squads }
}

const deleteRequest = (squad, userRequest) => {
  return { type: 'DELETE REQUEST', squad: squad, userRequest: userRequest }
}

const pushRequest = (squad, userRequest) => {
  return { type: 'PUSH REQUEST', squad: squad, userRequest: userRequest }
}

const deleteSquad = (squad) => {
  return { type: 'DELETE SQUAD', squad: squad }
}

const updateSquad = (squad, params) => {
  return { type: 'UPDATE SQUAD', squad: squad, params: params }
}

const setSquadTimetable = (squad, timetables) => {
  return { type: "SET SQUAD TIMETABLE", squad: squad, timetables: timetables }
}

export { setSquads, deleteRequest, pushRequest, deleteSquad, updateSquad, setSquadTimetable }
