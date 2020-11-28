import gql from 'graphql-tag'

const GET_CURRENT_USER = gql`
  query getCurrentUser {
    currentUser {
      id
      firstName
      lastName
      mobilePhone
      faculty
      university
      imageUrl
      smallImageUrl
      vkUrl
      hashId
      birthDate
      squadMember {
        id
        role
        queueNumber
        squad {
          id
          advertisment
          classDay
          squadNumber
          linkInvitationsEnabled
          timetables {
            date
            lessons {
              name
              teacher
              index
              note
              type
              classroom
            }
          }
          hashId
          requests {
            id
            approvedAt
            user {
              id
              firstName
              lastName
              faculty
              smallImageUrl
              vkUrl
            }
          }
          members {
            id
            role
            queueNumber
            user {
              id
              firstName
              lastName
              mobilePhone
              faculty
              university
              imageUrl
              smallImageUrl
              vkUrl
              birthDate
            }
          }
        }
      }
    }
  }
`

const UPDATE_ADVERTISMENT = gql`mutation updateSquad($id: Int, $advertisment: String) {
  updateSquad(
    id: $id,
    advertisment: $advertisment
  ) {
    advertisment
  }
}`

const UPDATE_NUMBER = gql`mutation updateSquad($id: Int, $number: String) {
  updateSquad(
    id: $id,
    squadNumber: $number
  ) {
    squadNumber
  }
}`

const DELETE_SQUAD_MEMBER = gql`mutation deleteSquadMember($id: Int) {
  deleteSquadMember(
    id: $id
  ) {
    id
  }
}`

const UPDATE_SQUAD_MEMBER = gql`mutation updateSquadMember($id: Int, $role: String, $quequeNumber: Int) {
  updateSquadMember(
    id: $id,
    queueNumber: $quequeNumber,
    role: $role
  ) {
    id
  }
}`

const GET_SQUADS = gql`
  {
    squads {
      id
      squadNumber
      linkInvitationsEnabled
      timetables {
        date
        lessons {
          name
          teacher
          index
          note
          type
          classroom
        }
      }
      members {
        role
        user {
          lastName
          firstName
        }
      }
      requests {
        id
        user {
          id
        }
      }
    }
  }
`

const SET_SQUAD = gql`
  mutation createSquad($squad_number: String!, $class_day: Int!) {
    createSquad(squadNumber: $squad_number, classDay: $class_day) {
      advertisment
      hashId
      classDay
      id
      squadNumber
      requests {
        id
        approvedAt
        user {
          id
          firstName
          lastName
          faculty
          smallImageUrl
          vkUrl
        }
      }
      members {
        role
        queueNumber
        user {
          id
          firstName
          lastName
          mobilePhone
          faculty
          university
          imageUrl
          smallImageUrl
          vkUrl
          birthDate
        }
      }
     }
   }
 `

const DELETE_SQUAD_REQUEST = gql`mutation deleteSquadRequest($id: Int) {
  deleteSquadRequest(
    id: $id
  ) {
    id
  }
}`

const CREATE_SQUAD_REQUEST = gql`mutation createSquadRequest($squadId: Int) {
  createSquadRequest(
    squadId: $squadId
  ) {
    id
  }
}`

const APPROVE_SQUAD_REQUEST = gql`mutation approveSquadRequest($id: Int) {
  approveSquadRequest(
    id: $id
  ) {
      id
      role
      queueNumber
      user {
        id
        firstName
        lastName
        mobilePhone
        faculty
        university
        imageUrl
        smallImageUrl
        vkUrl
        birthDate
      }
    }
}`

const UPDATE_SQUAD_MEMBERS = gql`mutation updateSquadMembers($members: SquadMembersBatch) {
  updateSquadMembers(
    batch: $members
  ) {
    id
  }
}`

const DELETE_SQUAD = gql(`mutation deleteSquad($id: Int) {
  deleteSquad(id: $id) { id }
}`)

const UPDATE_LINK_OPTION = gql`mutation updateSquad($id: Int, $linkOption: Boolean) {
  updateSquad(
    id: $id,
    linkInvitationsEnabled: $linkOption
  ) {
    linkInvitationsEnabled
  }
}`

const UPDATE_CLASS_DAY = gql`mutation updateSquad($id: Int, $classDay: Int) {
  updateSquad(
    id: $id,
    classDay: $classDay
  ) {
    classDay
  }
}`

export {
  GET_CURRENT_USER,
  GET_SQUADS,
  SET_SQUAD,
  UPDATE_ADVERTISMENT,
  UPDATE_NUMBER,
  APPROVE_SQUAD_REQUEST,
  DELETE_SQUAD_MEMBER,
  UPDATE_SQUAD_MEMBER,
  DELETE_SQUAD_REQUEST,
  CREATE_SQUAD_REQUEST,
  UPDATE_SQUAD_MEMBERS,
  DELETE_SQUAD,
  UPDATE_LINK_OPTION,
  UPDATE_CLASS_DAY,
}
