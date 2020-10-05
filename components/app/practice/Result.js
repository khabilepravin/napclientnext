import React, { useEffect, useState } from "react";
//import {connect} from "react-redux";
import QuestionService from "../../../lib/apiproxy/questionService";

import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container
} from "reactstrap";

import Header from "../../theme/Header";
import HeaderTitle from "../../theme/HeaderTitle";

const Result = (props) => {
  const [chartData, setChartData] = useState([]);
  const [resultText, setResultText] = useState();
 
  // const options = {
  //   dataLabels: {
  //     enabled: true
  //   },
  //   labels: ['Correct', 'Incorrect'],
  //   colors: [
  //     theme.success,
  //     theme.danger
  //   ]
  // };

 // const { userTestId } = match.params;
    useEffect(() => {
      QuestionService.getTestResult(props.testInstanceId).then(res =>{
          const data = res.data.dataPoints;
          setResultText(res.data.resultText);
          setChartData(data);
      });
    }, []);

    return (
      <Container fluid>
        <Header>
          <HeaderTitle>Results</HeaderTitle>
          {/* <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/dashboard">Dashboard</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Test Results</BreadcrumbItem>
          </Breadcrumb> */}
        </Header>
        <Card>
          <CardHeader>
            <CardTitle tag="h2">Results</CardTitle>
          </CardHeader>
          <CardBody>
            <h6>{resultText}</h6>
            <div className="chart chart-xs">
            {/* <Chart options={options} 
              series={chartData}
              type="donut" 
              height="350" /> */}
            </div>
          </CardBody>
        </Card>
      </Container>
    );
};

export default Result;