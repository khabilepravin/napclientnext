import gql from "graphql-tag";

const CREATE_TEST = `mutation($userTest: UserTestInput!){
    addUserTest(userTest: $userTest){
      id
      testId
      userId
      mode
    }
}`

const ADD_TEST = gql`
  mutation($test: TestInput!) {
    createTest(test: $test) {
      text
      description
      year
      subject
    }
  }
`

const UPDATE_TEST = gql`
  mutation($test: TestInput!) {
    updateTest(test: $test) {
      id
      text
      description
      year
      subject
    }
  }
`

const ADD_QUESTION = gql`mutation($question:QuestionInput!){
    addQuestion(question: $question){
      testId
      text
      sequence
      questionType
      description    
    }
  }
`

const DELETE_ANSWER = gql`mutation($id:ID!){
    deleteAnswerById(id:$id)
  }
`

const ADD_ANSWER = gql`mutation($answer:AnswerInput!){
    addAnswer(answer: $answer){
      questionId
      text
      description
      isCorrect
    }
  }
`

const ADD_USER_TEST_RECORD = gql`mutation($userTestRecord: UserTestRecordInput!){
  addUserTestRecord(userTestRecord: $userTestRecord){
    userTestId
    questionId
    answerId
    isCorrect
  }
}`  

const DELETE_QUESTION = gql`mutation($id:ID!){
  deleteQuestionById(id:$id)
}`

const ADD_USER = gql`mutation($user:UserInput!){
  addUser(user:$user){
    firstName
    lastName
    email
    userName
    socialLoginId
    socialProfilePicUrl
    id
  }
}`;

const ADD_CHILD_USER = gql`mutation($user:UserInput!){
  addChildUser(user:$user){
    firstName
    userName
    id
  }
}`;

const CHECK_USER_EXISTENCE = `mutation($user:UserInput!){
  checkUserExistence(user:$user){
    firstName
    lastName
    email
    userName
    socialLoginId
    id
    socialProfilePicUrl
  }
}`;

const USER_TEST_UPDATE = gql`mutation($userTest: UserTestInput!){
  updateUserTest(userTest: $userTest){
    id
    timeSpentOnTest
    isComplete 
  }
}`;

const ADD_STUDENT = gql`mutation($user:UserInput!){
  addChildUser(user:$user){
    firstName
    userName
    id
  }
}`;

const UPDATE_STUDENT = gql`mutation($user:UserInput!){
  updateChildUser(user:$user){
    firstName
    userName
    id
  }
}`;

export 
{ 
      CREATE_TEST, 
      ADD_TEST, 
      ADD_QUESTION,
      DELETE_ANSWER,
      ADD_ANSWER,
      ADD_USER_TEST_RECORD,
      DELETE_QUESTION,
      ADD_USER,
      CHECK_USER_EXISTENCE,
      USER_TEST_UPDATE,
      UPDATE_TEST,
      ADD_STUDENT,
      UPDATE_STUDENT
}