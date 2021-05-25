import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
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
 
  useEffect(() => {
      QuestionService.getTestResult(props.testInstanceId).then(res =>{
          const data = res.data.dataPoints;
          setResultText(res.data.resultText);
          setChartData({
            labels:['Correct','Incorrect'],
            datasets:[{
              data: data,
              backgroundColor: ['#36A2EB', '#FF6384']
            }]
          });
      });
    }, []); // acts like an initial on load event handler

    return (
      <Container fluid>
        <Header>
          <HeaderTitle>Results</HeaderTitle>
        </Header>
        <Card>
          <CardHeader>
            <CardTitle tag="h2">Results</CardTitle>
          </CardHeader>
          <CardBody>
            <h6>{resultText}</h6>
            <div className="chart chart-xs">
              <Doughnut data={chartData}
                        height={350}
                        width={350}
                        options={{maintainAspectRatio: false}}/>
            </div>
          </CardBody>
        </Card>
      </Container>
    );
};

export default Result;