import { useState } from "react";
import StepperControl from "./StepperControl";
import BasicInformation from "./BasicInformation";

const ProfileForm = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "Basic Information",
    "Study Subjects",
    "Study Goals",
    "Study Preferences",
    "Learning Style",
    "Current Schedule",
    "Alert",
  ];
  const displayStep = (step: number) => {
    switch (step) {
      case 1:
        return <BasicInformation />;
    }
  };
  const handleClick = (direction: string) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="flex-grow flex flex-col justify-between text-gray-600">
      <div className="container flex-grow horizontal flex items-center">
        {/* <StepperForm steps={steps} currentStep={currentStep} /> */}
        <div className="flex-grow">{displayStep(currentStep)}</div>
      </div>
      <StepperControl
        handleClick={handleClick}
        steps={steps}
        currentStep={currentStep}
      />
    </div>
  );
};

export default ProfileForm;
