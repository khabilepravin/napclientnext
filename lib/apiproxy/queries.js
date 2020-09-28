import gql from "graphql-tag";

const GET_TEST = gql`query($userTestId: ID!){
  testByUserTestId(userTestId:$userTestId){
    id
    text
    description
    durationMinutes
    questions{
      id
      text
      description
      questionType   
      images{
        fileId
      }
      audio{
        fileId
      }
    }
  }
}`

const GET_USERTEST_RECORD = gql`
  query($userTestId: ID!, $questionId: ID!) {
    userTestRecord(userTestId: $userTestId, questionId: $questionId) {
      questionId
      userTestId
      answerId
      isCorrect
      answerText
    }
  }
`

const GET_TESTS = gql`
  query {
    tests {
      id
      text
      description
      subject
      year
    }
  }
`

const GET_QUESTIONS = gql`
  query questions($testId: ID!) {
    questions(testId: $testId) {
      id
      text
      description
      sequence
      plainText
      questionType
      images{
        fileId
      }
    }
  }
`

const GET_ANSWERS = gql`query($questionId:ID!, $shuffleSeed:Int){
  question(questionId:$questionId){
    id
    text
    description
    plainText
    questionType
    answers(shuffleSeed:$shuffleSeed){
      id
      text
      description
      sequence
      isCorrect
      images{
        fileId
      }
      audio{
        fileId
      }
    }
    images{
      fileId
    }
    audio{
      fileId
    }
  }
}`

const GET_USER_TEST_INSTANCE = gql`query($id: ID!){
  userTestById(id:$id){
    id
    testId
    shuffleSeed
    test{
      text
      description
      subject
      year
      durationMinutes
    }
    questions{
      id
      text
      description
      questionType   
      images{
        fileId
      }
      audio{
        fileId
      }
    }
  }
}`

const GET_TESTS_BY_TYPE_AND_YEAR = `query($testType:String, $year: String){
  testsByTypeAndYear(testType:$testType, year:$year){
    id
    text
    description
    subject
    year
    testType
  }
}`;

export 
{   GET_TEST, 
    GET_USERTEST_RECORD, 
    GET_TESTS,
    GET_QUESTIONS,
    GET_ANSWERS,
    GET_USER_TEST_INSTANCE,
    GET_TESTS_BY_TYPE_AND_YEAR
};