import { useState } from "react";
import { Container, Stepper, Step, StepLabel, Button } from "@material-ui/core";
import Navbar from "../../components/Layouts/Navbar";
import Footer from "../../components/Layouts/Footer";
import {
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
  StepSix,
} from "../../components/EditTenderNew/steps";

function EditTender() {
  const [step, setStep] = useState(1);

  const ShowForm = () => {
    switch (step) {
      case 1:
        return <StepOne />;

      case 2:
        return <StepTwo />;

      case 3:
        return <StepThree />;

      case 4:
        return <StepFour />;

      case 5:
        return <StepFive />;

      case 6:
        return <StepSix />;
    }
  };
  return (
    <>
      <Navbar />
      <Container>
        <Stepper activeStep={1}>
          <Step>
            <StepLabel>Tender Details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Company Details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Contact Details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Categories</StepLabel>
          </Step>
          <Step>
            <StepLabel>Due Date</StepLabel>
          </Step>
          <Step>
            <StepLabel>Review</StepLabel>
          </Step>
        </Stepper>
      </Container>
      {ShowForm()}
      <Container>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setStep(step > 5 ? 1 : step + 1)}
        >
          Next
        </Button>
      </Container>
      <Footer />
    </>
  );
}

export default EditTender;
