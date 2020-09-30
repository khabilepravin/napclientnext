import React, { useState, useEffect } from "react";
import { Progress } from "reactstrap";

const TestProgress = React.memo((props) => {
    return (
    <Progress striped value={props.progressData.percentage} className="mb-3">
        {props.progressData.description}
    </Progress>
    );
});

export default TestProgress;